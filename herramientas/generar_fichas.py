#!/usr/bin/env python3
"""Genera la extensión de fichas individuales y sus códigos QR.

1. Crea ficha.html a partir de index.html (misma página, con la ficha del
   sitio entre el título del catálogo y la frase del poeta). index.html no
   se modifica.
2. Crea una tarjeta QR imprimible por sitio en qr/<id>.png que abre
   <BASE>/ficha.html?s=<id>.

Uso (desde la raíz del repositorio):
    python3 herramientas/generar_fichas.py --base https://tu-dominio.vercel.app
    python3 herramientas/generar_fichas.py --base https://... --solo pauji-copete-de-piedra

Requiere: pip install qrcode pillow
"""
import argparse, json, os, re, subprocess, sys
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(RAIZ, 'herramientas', 'fuentes')
NAVY, LIME, ORANGE = (11, 19, 80), (132, 194, 37), (242, 106, 33)

FICHA_HTML = '''<!-- ===== FICHA DEL SITIO (solo en ficha.html) ===== -->
<section class="ficha" id="ficha" aria-label="Ficha del sitio">
  <div class="ficha__intro f-rev"><p>Conoce su historia</p></div>
  <div class="ficha__grid">
    <div class="ficha__marco f-rev">
      <div class="ficha__media media"><span class="media__photo ficha__foto"></span></div>
    </div>
    <div class="ficha__info">
      <p class="ficha__cat f-rev"></p>
      <h2 class="ficha__titulo f-rev" style="--d:.1s"></h2>
      <p class="ficha__lugar f-rev" style="--d:.2s"></p>
      <p class="ficha__corto f-rev" style="--d:.3s"></p>
      <div class="ficha__texto f-rev" style="--d:.4s"></div>
      <p class="ficha__credito f-rev" style="--d:.45s"></p>
      <a class="ficha__cta f-rev" style="--d:.5s" href="#recomendaciones">Descubre más del Táchira</a>
    </div>
  </div>
</section>

'''

def generar_html():
    s = open(os.path.join(RAIZ, 'index.html'), encoding='utf-8').read()
    reemplazos = [
        ('<link rel="stylesheet" href="css/style.css">',
         '<link rel="stylesheet" href="css/style.css">\n<link rel="stylesheet" href="css/ficha.css">'),
        ('<!-- ===== EXPLORA ===== -->', FICHA_HTML + '<!-- ===== EXPLORA ===== -->'),
        ('<script src="js/main.js"></script>', '<script src="js/main.js"></script>\n<script src="js/ficha.js"></script>'),
    ]
    for a, b in reemplazos:
        if a not in s:
            sys.exit('No se encontró en index.html: ' + a)
        s = s.replace(a, b, 1)
    s = s.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- Archivo generado por herramientas/generar_fichas.py a partir de index.html. No editar a mano. -->', 1)
    open(os.path.join(RAIZ, 'ficha.html'), 'w', encoding='utf-8').write(s)

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
    ap.add_argument('--solo', nargs='*', help='IDs de los sitios a generar (por defecto, todos)')
    a = ap.parse_args()
    generar_html()
    sitios, cats = leer_sitios()
    ids = set(a.solo) if a.solo else None
    os.makedirs(os.path.join(RAIZ, 'qr'), exist_ok=True)
    n = 0
    for s in sitios:
        if ids and s['id'] not in ids:
            continue
        url = '%s/ficha.html?s=%s' % (a.base.rstrip('/'), s['id'])
        tarjeta(s, cats[s['cat']], url, os.path.join(RAIZ, 'qr', s['id'] + '.png'))
        print(url); n += 1
    print('%d QR generados en qr/' % n)

if __name__ == '__main__':
    main()
