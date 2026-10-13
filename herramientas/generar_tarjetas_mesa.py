#!/usr/bin/env python3
"""Tarjetas de mesa (1300 × 2000 px) para doblar por la línea punteada.

Mitad inferior: «CATÁLOGO TURÍSTICO DEL ESTADO TÁCHIRA» + QR de la página principal.
Mitad superior (girada 180° para leerse desde el otro lado de la mesa):
nombre del sitio + QR de su ficha + «ESCANÉAME».

Uso (desde la raíz del repositorio):
    python3 herramientas/generar_tarjetas_mesa.py                       # las 38
    python3 herramientas/generar_tarjetas_mesa.py --solo tucusito toche
Requiere: pip install qrcode pillow
"""
import argparse, json, os, subprocess
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(RAIZ, 'herramientas', 'fuentes')
BASE = 'https://catalogoturisticotachira.waisdigital.com'
NAVY, LIME, ORANGE, WHITE = (11, 19, 80), (132, 194, 37), (242, 106, 33), (255, 255, 255)
W, H = 1300, 2000          # alto fijo; ancho reducido
MITAD = H // 2

def fuente(peso, tam):
    return ImageFont.truetype(os.path.join(FUENTES, 'Poppins-%s.ttf' % peso), tam)

def centrado(dr, y, txt, f, color, ancho=W, margen=140, interlineado=1.12):
    lineas, actual = [], ''
    for pal in txt.split():
        prueba = (actual + ' ' + pal).strip()
        if dr.textlength(prueba, font=f) <= ancho - 2 * margen or not actual:
            actual = prueba
        else:
            lineas.append(actual); actual = pal
    lineas.append(actual)
    for l in lineas:
        dr.text(((ancho - dr.textlength(l, font=f)) / 2, y), l, font=f, fill=color)
        y += int(f.size * interlineado)
    return y

def caja_qr(url, lado):
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=20, border=1)
    q.add_data(url); q.make(fit=True)
    img = q.make_image(fill_color=NAVY, back_color='white').convert('RGB')
    pad = int(lado * .07)
    img = img.resize((lado - 2 * pad, lado - 2 * pad), Image.NEAREST)
    caja = Image.new('RGB', (lado, lado), 'white'); caja.paste(img, (pad, pad))
    mask = Image.new('L', caja.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, lado - 1, lado - 1), int(lado * .07), fill=255)
    return caja, mask

def patron(alto):
    p = Image.open(os.path.join(RAIZ, 'img', 'patron.png')).convert('RGBA')
    p = p.resize((int(p.width * alto / p.height), alto))
    banda = Image.new('RGBA', (W, alto), (0, 0, 0, 0))
    x = 0
    while x < W:
        banda.paste(p, (x, 0), p); x += p.width
    return banda

def logo_abajo_der(im):
    """Logo de la Cámara en la esquina inferior derecha de cada mitad."""
    logo = Image.open(os.path.join(RAIZ, 'img', 'logo-camara-turismo.png')).convert('RGBA')
    logo.thumbnail((330, 110))
    im.paste(logo, (W - 60 - logo.width, MITAD - 70 - 30 - logo.height), logo)

def mitad_catalogo():
    im = Image.new('RGB', (W, MITAD), NAVY); dr = ImageDraw.Draw(im)
    y = centrado(dr, 95, 'CATÁLOGO TURÍSTICO', fuente('ExtraBold', 82), WHITE)
    dr.rounded_rectangle((W / 2 - 170, y + 8, W / 2 + 170, y + 16), 4, fill=LIME)
    centrado(dr, y + 30, 'DEL ESTADO TÁCHIRA', fuente('ExtraBold', 56), ORANGE)
    caja, mask = caja_qr(BASE + '/', 470)
    im.paste(caja, ((W - 470) // 2, 330), mask)
    banda = patron(70); im.paste(banda, (0, MITAD - 70), banda)
    logo_abajo_der(im)
    return im

def mitad_sitio(sitio, cat):
    im = Image.new('RGB', (W, MITAD), NAVY); dr = ImageDraw.Draw(im)
    fc = fuente('Medium', 32); t = cat['titulo']; tw = dr.textlength(t, font=fc)
    x0 = (W - tw) / 2 - 30
    dr.rounded_rectangle((x0, 60, x0 + tw + 60, 112), 26, fill=ORANGE)
    dr.text((x0 + 30, 64), t, font=fc, fill=WHITE)
    tam = 80 if len(sitio['nombre']) <= 20 else 62
    y = centrado(dr, 130, sitio['nombre'], fuente('ExtraBold', tam), WHITE, margen=110)
    lado = 470 if y < 240 else 420
    caja, mask = caja_qr('%s/%s/' % (BASE, sitio['id']), lado)
    yq = max(y + 36, 250)
    im.paste(caja, ((W - lado) // 2, yq), mask)
    fe = fuente('ExtraBold', 54); txt = 'ESCANÉAME'
    tw = dr.textlength(txt, font=fe); yt = yq + lado + 26
    dr.text(((W - tw) / 2, yt), txt, font=fe, fill=LIME)
    banda = patron(70); im.paste(banda, (0, MITAD - 70), banda)
    logo_abajo_der(im)
    return im

def tarjeta(sitio, cat, destino):
    im = Image.new('RGB', (W, H), NAVY)
    im.paste(mitad_sitio(sitio, cat).rotate(180), (0, 0))   # se lee desde el otro lado
    im.paste(mitad_catalogo(), (0, MITAD))
    dr = ImageDraw.Draw(im)
    for x in range(40, W - 40, 44):                          # línea punteada de doblez
        dr.rounded_rectangle((x, MITAD - 3, x + 24, MITAD + 3), 3, fill=WHITE)
    im.save(destino, optimize=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--solo', nargs='*')
    a = ap.parse_args()
    js = 'global.window={};require(%s);console.log(JSON.stringify({c:window.CATEGORIAS,s:window.SITIOS}))' % json.dumps(os.path.join(RAIZ, 'js', 'data.js'))
    d = json.loads(subprocess.check_output(['node', '-e', js]))
    cats = {c['id']: c for c in d['c']}
    os.makedirs(os.path.join(RAIZ, 'mesa'), exist_ok=True)
    n = 0
    for s in d['s']:
        if a.solo and s['id'] not in a.solo:
            continue
        tarjeta(s, cats[s['cat']], os.path.join(RAIZ, 'mesa', s['id'] + '.png')); n += 1
    print('%d tarjetas en mesa/' % n)

if __name__ == '__main__':
    main()
