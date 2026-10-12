#!/usr/bin/env python3
"""Genera la extensión de fichas individuales y sus códigos QR.

1. Crea una carpeta por sitio (<id>/index.html) con la ficha sola del
   sitio (foto, historia, logo, botón «Explorar catálogo» y crédito WAIS).
   Así cada ficha tiene su propia dirección:
   <BASE>/<id>/   (p. ej. https://dominio.com/pauji-copete-de-piedra/)
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

PAGINA = """<!DOCTYPE html>
<!-- Archivo generado por herramientas/generar_fichas.py. No editar a mano. -->
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo}</title>
<meta name="description" content="{corto}">
<meta name="theme-color" content="#0B1350">
<meta property="og:title" content="{nombre}">
<meta property="og:description" content="{corto}">
<meta property="og:type" content="article">
<meta property="og:image" content="{foto}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/ficha.css">
</head>
<body class="solo">
<main class="solo__main">
  <article class="solo__card">
    <div class="solo__media"><div class="media media--{cat}"><span class="media__photo" style="background-image:url('{foto}')"></span></div></div>
    <div class="solo__body">
      <a class="solo__logo" href="../" aria-label="Cámara de Turismo Táchira · ir al catálogo"><i></i></a>
      <p class="solo__catalogo">Catálogo Turístico Táchira</p>
      <p class="solo__cat">{categoria}</p>
      <h1 class="solo__titulo">{nombre}</h1>
      <p class="solo__lugar">{lugar}</p>
      <p class="solo__corto">{corto}</p>
      <div class="solo__texto">
{parrafos}
      </div>
      <a class="solo__wais" href="https://www.instagram.com/waisdigital/" target="_blank" rel="noopener">
        <span>Developed by</span><i role="img" aria-label="WAIS"></i>
      </a>
    </div>
  </article>
</main>
<a class="solo__explorar" href="../">Explorar catálogo</a>
<div class="geo" aria-hidden="true"></div>
</body>
</html>
"""

def url_foto(sitio, propias, commons):
    if sitio['id'] in propias:
        return '../img/%s.webp' % propias[sitio['id']]
    if sitio['id'] in commons:
        from urllib.parse import quote
        return 'https://commons.wikimedia.org/wiki/Special:FilePath/%s?width=1400' % quote(commons[sitio['id']].replace(' ', '_'))
    return '../img/%s.jpg' % sitio['id']

def generar_pagina(sitio, cats, propias, commons):
    """HTML de la ficha sola de un sitio (vive en <id>/index.html)."""
    e = html.escape
    return PAGINA.format(
        titulo=e('%s · Catálogo Turístico del Estado Táchira' % sitio['nombre']),
        nombre=e(sitio['nombre']), corto=e(sitio['corto']), lugar=e(sitio['lugar']),
        categoria=e(cats[sitio['cat']]['titulo']), cat=sitio['cat'],
        foto=e(url_foto(sitio, propias, commons)),
        parrafos='\n'.join('        <p>%s</p>' % e(t) for t in sitio['largo']),
    )

def leer_sitios():
    js = ('global.window={};require(%s);require(%s);'
          'console.log(JSON.stringify({c:window.CATEGORIAS,s:window.SITIOS,p:window.FOTOS_PROPIAS,m:window.FOTOS_COMMONS}))'
          % (json.dumps(os.path.join(RAIZ, 'js', 'data.js')), json.dumps(os.path.join(RAIZ, 'js', 'fotos.js'))))
    d = json.loads(subprocess.check_output(['node', '-e', js]))
    cats = {c['id']: c for c in d['c']}
    return d['s'], cats, d['p'], d['m']

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
    sitios, cats, propias, commons = leer_sitios()
    for s in sitios:  # páginas de todas las fichas
        carpeta = os.path.join(RAIZ, s['id'])
        os.makedirs(carpeta, exist_ok=True)
        open(os.path.join(carpeta, 'index.html'), 'w', encoding='utf-8').write(generar_pagina(s, cats, propias, commons))
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
