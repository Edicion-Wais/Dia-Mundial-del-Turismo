#!/usr/bin/env python3
"""Genera la extensión de fichas individuales y sus códigos QR.

1. Crea una carpeta por sitio (<id>/index.html) a partir de index.html:
   la misma página con la ficha del sitio entre el título del catálogo y la
   frase del poeta. Así cada ficha tiene su propia dirección:
   <BASE>/<id>/   (p. ej. https://dominio.com/pauji-copete-de-piedra/)
   index.html no se modifica.
2. Crea una tarjeta QR imprimible por sitio en qr/<id>.png con esa dirección.

Uso (desde la raíz del repositorio):
    python3 herramientas/generar_fichas.py --base https://tu-dominio.vercel.app
    python3 herramientas/generar_fichas.py --base https://... --solo pauji-copete-de-piedra

Requiere: pip install qrcode pillow
"""
import argparse, html, json, os, re, subprocess, sys
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(RAIZ, 'herramientas', 'fuentes')
NAVY, LIME, ORANGE = (11, 19, 80), (132, 194, 37), (242, 106, 33)

FICHA_HTML = '''<!-- ===== FICHA DEL SITIO (solo en ficha.html) ===== -->
<section class="ficha" id="ficha" aria-label="Ficha del sitio">
  <a class="ficha__logo" href="../" aria-label="Cámara de Turismo Táchira · ir al catálogo"><img src="../img/logo-camara-turismo.png" alt="Cámara de Turismo Táchira" width="1224" height="340"></a>
  <div class="ficha__intro f-rev"><p>Conoce su historia</p></div>
  <div class="ficha__grid">
    <div class="ficha__marco f-rev">
      <div class="ficha__media media"><span class="media__photo ficha__foto"></span></div>
    </div>
    <div class="ficha__info">
      <p class="ficha__catalogo f-rev">Catálogo Turístico Táchira</p>
      <p class="ficha__cat f-rev"></p>
      <h2 class="ficha__titulo f-rev" style="--d:.1s"></h2>
      <p class="ficha__lugar f-rev" style="--d:.2s"></p>
      <p class="ficha__corto f-rev" style="--d:.3s"></p>
      <div class="ficha__texto f-rev" style="--d:.4s"></div>
      <p class="ficha__credito f-rev" style="--d:.45s"></p>
      <a class="ficha__cta f-rev" style="--d:.5s" href="../">Ver más del catálogo</a>
    </div>
  </div>
</section>

'''

WAIS_HTML = '''
    <a class="outro__wais" href="https://www.instagram.com/waisdigital/" target="_blank" rel="noopener">
      <span>Developed by</span><img src="../img/logo-wais.png" alt="WAIS" width="600" height="168">
    </a>'''

def generar_pagina(sitio):
    """Devuelve el HTML de la ficha de un sitio (vive en <id>/index.html)."""
    s = open(os.path.join(RAIZ, 'index.html'), encoding='utf-8').read()
    titulo = '%s · Catálogo Turístico del Estado Táchira' % sitio['nombre']
    reemplazos = [
        ('<link rel="stylesheet" href="css/style.css">',
         '<link rel="stylesheet" href="css/style.css">\n<link rel="stylesheet" href="css/ficha.css">'),
        ('<!-- ===== EXPLORA ===== -->', FICHA_HTML + '<!-- ===== EXPLORA ===== -->'),
        ('<script src="js/data.js"></script>',
         '<script>window.RAIZ = "../"; window.FICHA_ID = %s;</script>\n<script src="js/data.js"></script>' % json.dumps(sitio['id'])),
        ('<script src="js/main.js"></script>', '<script src="js/main.js"></script>\n<script src="js/ficha.js"></script>'),
        ('<span class="outro__tag">', WAIS_HTML.strip('\n') + '\n    <span class="outro__tag">'),
    ]
    for a, b in reemplazos:
        if a not in s:
            sys.exit('No se encontró en index.html: ' + a)
        s = s.replace(a, b, 1)
    # rutas relativas: la ficha está una carpeta más abajo
    s = re.sub(r'(href|src|content)="(css|js|img)/', r'\1="../\2/', s)
    s = re.sub(r'<title>.*?</title>', '<title>%s</title>' % html.escape(titulo), s, count=1)
    s = re.sub(r'(<meta property="og:title" content=")[^"]*', r'\g<1>' + html.escape(sitio['nombre']), s, count=1)
    s = re.sub(r'(<meta name="description" content=")[^"]*', r'\g<1>' + html.escape(sitio['corto']), s, count=1)
    s = re.sub(r'(<meta property="og:description" content=")[^"]*', r'\g<1>' + html.escape(sitio['corto']), s, count=1)
    s = s.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- Archivo generado por herramientas/generar_fichas.py a partir de index.html. No editar a mano. -->', 1)
    return s

def leer_sitios():
    js = 'global.window={};require(%s);console.log(JSON.stringify({c:window.CATEGORIAS,s:window.SITIOS}))' % json.dumps(os.path.join(RAIZ, 'js', 'data.js'))
    d = json.loads(subprocess.check_output(['node', '-e', js]))
    cats = {c['id']: c for c in d['c']}
    return d['s'], cats

def fuente(peso, tam):
    return ImageFont.truetype(os.path.join(FUENTES, 'Poppins-%s.ttf' % peso), tam)

def texto_centrado(dr, y, txt, f, color, ancho):
    lineas, actual = [], ''
    for pal in txt.split():
        prueba = (actual + ' ' + pal).strip()
        if dr.textlength(prueba, font=f) <= ancho - 160 or not actual:
            actual = prueba
        else:
            lineas.append(actual); actual = pal
    lineas.append(actual)
    for l in lineas:
        w = dr.textlength(l, font=f)
        dr.text(((ancho - w) / 2, y), l, font=f, fill=color)
        y += int(f.size * 1.18)
    return y

def tarjeta(sitio, cat, url, destino):
    W, H = 1200, 1700
    im = Image.new('RGB', (W, H), NAVY)
    dr = ImageDraw.Draw(im)
    # logo
    logo = Image.open(os.path.join(RAIZ, 'img', 'logo-camara-turismo.png')).convert('RGBA')
    logo.thumbnail((560, 200))
    im.paste(logo, ((W - logo.width) // 2, 90), logo)
    # QR
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=20, border=2)
    q.add_data(url); q.make(fit=True)
    qr = q.make_image(fill_color=NAVY, back_color='white').convert('RGB')
    qr = qr.resize((720, 720), Image.NEAREST)
    caja = Image.new('RGB', (800, 800), 'white')
    caja.paste(qr, (40, 40))
    mascara = Image.new('L', caja.size, 0)
    ImageDraw.Draw(mascara).rounded_rectangle((0, 0, 799, 799), 48, fill=255)
    im.paste(caja, ((W - 800) // 2, 340), mascara)
    # categoría
    fc = fuente('Medium', 34)
    t = cat['titulo']
    tw = dr.textlength(t, font=fc)
    x0 = (W - tw) / 2 - 34
    dr.rounded_rectangle((x0, 1185, x0 + tw + 68, 1245), 30, fill=ORANGE)
    dr.text((x0 + 34, 1191), t, font=fc, fill='white')
    # nombre
    y = texto_centrado(dr, 1275, sitio['nombre'], fuente('ExtraBold', 72), 'white', W)
    texto_centrado(dr, y + 16, 'Escanea y descubre su historia', fuente('Bold', 36), LIME, W)
    # patrón
    patron = Image.open(os.path.join(RAIZ, 'img', 'patron.png')).convert('RGBA')
    alto = 120
    patron = patron.resize((int(patron.width * alto / patron.height), alto))
    x = 0
    while x < W:
        im.paste(patron, (x, H - alto), patron); x += patron.width
    im.save(destino, optimize=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', required=True, help='Dirección pública de la web, p. ej. https://dia-mundial-del-turismo.vercel.app')
    ap.add_argument('--solo', nargs='*', help='IDs de los sitios cuyo QR se genera (por defecto, todos)')
    a = ap.parse_args()
    sitios, cats = leer_sitios()
    for s in sitios:  # páginas de todas las fichas
        carpeta = os.path.join(RAIZ, s['id'])
        os.makedirs(carpeta, exist_ok=True)
        open(os.path.join(carpeta, 'index.html'), 'w', encoding='utf-8').write(generar_pagina(s))
    print('%d fichas generadas (<id>/index.html)' % len(sitios))
    ids = set(a.solo) if a.solo else None
    os.makedirs(os.path.join(RAIZ, 'qr'), exist_ok=True)
    n = 0
    for s in sitios:
        if ids and s['id'] not in ids:
            continue
        url = '%s/%s/' % (a.base.rstrip('/'), s['id'])
        tarjeta(s, cats[s['cat']], url, os.path.join(RAIZ, 'qr', s['id'] + '.png'))
        print(url); n += 1
    print('%d QR generados en qr/' % n)

if __name__ == '__main__':
    main()
