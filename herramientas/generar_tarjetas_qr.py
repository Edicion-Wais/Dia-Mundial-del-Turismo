#!/usr/bin/env python3
"""Tarjetas QR con la estética definitiva (paneles verticales 1418 × 2364 px).

- Panel azul (uno solo, igual para todos): «Catálogo Turístico DEL ESTADO
  TÁCHIRA» + QR de la página principal en blanco + logo de la Cámara.
- Panel verde (uno por sitio): nombre del sitio + «CONÓCEME» + QR de su
  ficha en azul + logo de la Cámara en azul.

Uso (desde la raíz del repositorio):
    python3 herramientas/generar_tarjetas_qr.py                  # panel azul + 38 verdes
    python3 herramientas/generar_tarjetas_qr.py --solo tucusito
Salida: tarjetas-qr/catalogo.png y tarjetas-qr/<id>.png
Requiere: pip install qrcode pillow
"""
import argparse, json, os, subprocess
import qrcode
from qrcode.constants import ERROR_CORRECT_M
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(RAIZ, 'herramientas', 'fuentes')
BASE = 'https://catalogoturisticotachira.waisdigital.com'
NAVY, LIME, ORANGE, WHITE = (26, 30, 60), (130, 187, 37), (236, 102, 29), (255, 255, 255)
W, H = 1418, 2364
QR_LADO, QR_Y = 900, 820
INTER = 1.16                               # interlineado del nombre (evita choque g/ñ)
NO_SEPARAR = ['de La Grita']

def fuente(peso, tam):
    return ImageFont.truetype(os.path.join(FUENTES, 'Poppins-%s.ttf' % peso), tam)

def lineas(dr, txt, f, ancho):
    out, actual = [], ''
    for pal in txt.split(' '):
        prueba = (actual + ' ' + pal).strip()
        if dr.textlength(prueba, font=f) <= ancho or not actual:
            actual = prueba
        else:
            out.append(actual); actual = pal
    return out + [actual]

def texto(dr, y, ls, f, color, inter=1.0):
    for l in ls:
        l = l.replace('\u00a0', ' ')
        dr.text(((W - dr.textlength(l, font=f)) / 2, y), l, font=f, fill=color)
        y += int(f.size * inter)
    return y

def qr(im, url, color, y=QR_Y, lado=QR_LADO):
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_M, box_size=1, border=0)
    q.add_data(url); q.make(fit=True)
    m = q.get_matrix(); n = len(m)
    paso = lado / n
    dr = ImageDraw.Draw(im); x0 = (W - lado) / 2
    for r in range(n):
        for c in range(n):
            if m[r][c]:
                dr.rectangle((round(x0 + c * paso), round(y + r * paso),
                              round(x0 + (c + 1) * paso) - 1, round(y + (r + 1) * paso) - 1), fill=color)

def logo(im, color, y=1850, ancho=820):
    lg = Image.open(os.path.join(RAIZ, 'img', 'logo-camara-turismo.png')).convert('RGBA')
    lg = lg.resize((ancho, int(lg.height * ancho / lg.width)), Image.LANCZOS)
    capa = Image.new('RGBA', lg.size, color + (255,)); capa.putalpha(lg.split()[3])
    im.paste(capa, ((W - ancho) // 2, y), capa)

def patron(im):
    alto = 170
    p = Image.open(os.path.join(RAIZ, 'img', 'patron.png')).convert('RGBA')
    p = p.crop((0, 0, p.width, p.height - 2))   # las 2 últimas filas son casi transparentes (dejaban una línea)
    p = p.resize((int(p.width * alto / p.height), alto), Image.LANCZOS)
    x = -60
    while x < W:
        im.paste(p, (x, H - alto), p); x += p.width

def panel_catalogo(destino):
    im = Image.new('RGB', (W, H), NAVY); dr = ImageDraw.Draw(im)
    y = texto(dr, 120, ['Catálogo', 'Turístico'], fuente('ExtraBold', 190), WHITE, .98)
    dr.rectangle((336, 600, 1082, 612), fill=LIME)
    texto(dr, 660, ['DEL ESTADO TÁCHIRA'], fuente('ExtraBold', 74), ORANGE)
    qr(im, BASE + '/', WHITE, y=850, lado=890)
    logo(im, WHITE)
    patron(im)
    im.save(destino, optimize=True)

def panel_sitio(sitio, destino):
    im = Image.new('RGB', (W, H), LIME); dr = ImageDraw.Draw(im)
    nombre = sitio['nombre']
    for grupo in NO_SEPARAR:               # grupos que deben quedar en una sola línea
        nombre = nombre.replace(grupo, grupo.replace(' ', '\u00a0'))
    tam = 128
    while True:
        f = fuente('ExtraBold', tam)
        ls = lineas(dr, nombre, f, W - 200)
        if len(ls) <= 2 or tam <= 90:
            break
        tam -= 6
    alto_txt = int(tam * INTER) * len(ls)
    y0 = 380 - alto_txt                    # el bloque del nombre termina sobre la pastilla
    texto(dr, max(y0, 90), ls, f, NAVY, INTER)
    dr.rounded_rectangle((246, 540, 1172, 696), 78, fill=ORANGE)
    fc = fuente('ExtraBold', 92)
    t = 'CONÓCEME'
    dr.text(((W - dr.textlength(t, font=fc)) / 2, 556), t, font=fc, fill=WHITE)
    qr(im, '%s/%s/' % (BASE, sitio['id']), NAVY)
    logo(im, NAVY)
    patron(im)
    im.save(destino, optimize=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--solo', nargs='*')
    a = ap.parse_args()
    js = 'global.window={};require(%s);console.log(JSON.stringify(window.SITIOS))' % json.dumps(os.path.join(RAIZ, 'js', 'data.js'))
    sitios = json.loads(subprocess.check_output(['node', '-e', js]))
    out = os.path.join(RAIZ, 'tarjetas-qr'); os.makedirs(out, exist_ok=True)
    panel_catalogo(os.path.join(out, 'catalogo.png'))
    n = 0
    for s in sitios:
        if a.solo and s['id'] not in a.solo:
            continue
        panel_sitio(s, os.path.join(out, s['id'] + '.png')); n += 1
    print('catalogo.png + %d tarjetas en tarjetas-qr/' % n)

if __name__ == '__main__':
    main()
