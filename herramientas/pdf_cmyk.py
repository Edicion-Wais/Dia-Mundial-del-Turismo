"""PDF de impresión en CMYK: tarjetas 60×100 mm + 3 mm de sangrado, con el
catálogo (1.ª página) y luego los 38 sitios. Uso: python3 herramientas/pdf_cmyk.py [--sin-sangrado]"""
import io, json, os, subprocess, sys
import numpy as np, img2pdf, pikepdf
from PIL import Image, ImageCms

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(RAIZ, 'tarjetas-qr')
SALIDA = os.path.join(DIR, 'QR-Catalogo-Turistico-Tachira-CMYK.pdf')
PERFIL = os.path.join(RAIZ, 'herramientas', 'perfil-cmyk-swop.icc')
ANCHO_MM, ALTO_MM, SANGRADO_MM = 60, 100, 3
if '--sin-sangrado' in sys.argv:                         # 6×10 cm exactos, sin sangrado
    SANGRADO_MM = 0
    SALIDA = SALIDA.replace('.pdf', '-sin-sangrado.pdf')

# Tintas fijas (C, M, Y, K en %) para los colores planos: verde #87c410 y
# azul marino #181e49 (C100 M94 Y41 K41).
TINTAS = {
    (26, 30, 60):   (100, 94, 41, 41),     # azul marino
    (2, 14, 67):    (100, 94, 41, 41),     # azul del patrón
    (130, 187, 37): (54, 0, 100, 0),       # verde lima
    (236, 102, 29): (0, 75, 100, 0),       # naranja
    (128, 193, 28): (54, 0, 100, 0),       # verde del patrón
    (252, 100, 10): (0, 75, 100, 0),       # naranja del patrón
}
TOLERANCIA = 14

rgb_a_cmyk = ImageCms.buildTransform(ImageCms.createProfile('sRGB'), ImageCms.getOpenProfile(PERFIL),
                                     'RGB', 'CMYK', renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC)
# Orden de la lista de centros de mesa (ICONOS_CENTROS_DE_MESA.xlsx)
ORDEN = ['pauji-copete-de-piedra', 'tucusito', 'pato-de-torrentes', 'toche', 'guacharaca',
         'querrequerre', 'oso-frontino', 'venado-de-montana', 'vuelta-al-tachira',
         'estatua-ecuestre-bolivar', 'glamping-de-montana', 'leones-de-capacho',
         'orquidea-angel-de-la-montana', 'virgen-de-la-consolacion', 'piedra-del-mapa',
         'pina-hato-de-la-virgen', 'basilica-san-cristobal', 'peribeca', 'santo-cristo-de-la-grita',
         'chorro-el-indio', 'pozos-de-lobatera', 'puente-simon-bolivar', 'ucat', 'deportivo-tachira',
         'obelisco-de-los-italianos', 'toro-de-la-feria', 'pan-andino', 'reloj-de-lobatera',
         'corona-del-reinado', 'taza-de-peltre', 'ruana-andina', 'cesta-de-palmira', 'muneca-de-trapo',
         'sombrero-andino', 'cafeto-tachirense', 'ceramica-lomas-bajas', 'bandolin-andino',
         'farol-colonial']

cache = {}

def cmyk(png):
    if png in cache:
        return cache[png]
    im = Image.open(png).convert('RGB')
    s = round(im.width / ANCHO_MM * SANGRADO_MM)         # sangrado: se refleja el borde
    b = 3                                                # se descartan los bordes suavizados
    a = np.asarray(im)[b:-b, b:-b]
    im = Image.fromarray(np.pad(a, ((s + b, s + b), (s + b, s + b), (0, 0)), mode='symmetric'))
    c = np.array(ImageCms.applyTransform(im, rgb_a_cmyk))
    rgb = np.asarray(im)
    for col, tinta in TINTAS.items():
        c[(np.abs(rgb.astype(int) - col).max(axis=2) <= TOLERANCIA)] = [round(v * 2.55) for v in tinta]
    c = Image.fromarray(c, 'CMYK')
    buf = io.BytesIO(); c.save(buf, 'TIFF', compression='tiff_adobe_deflate', dpi=(300, 300))
    cache[png] = buf.getvalue()
    return cache[png]

def main():
    js = 'global.window={};require(%s);console.log(JSON.stringify(window.SITIOS.map(s=>s.id)))' % json.dumps(os.path.join(RAIZ, 'js', 'data.js'))
    ids = json.loads(subprocess.check_output(['node', '-e', js]))
    assert sorted(ids) == sorted(ORDEN) and len(ORDEN) == 38, 'ORDEN no coincide con data.js'
    ids = ORDEN
    paginas = [cmyk(os.path.join(DIR, 'catalogo.png'))]          # el hablador azul solo una vez, al inicio
    paginas += [cmyk(os.path.join(DIR, i + '.png')) for i in ids]
    pt = img2pdf.mm_to_pt
    lay = img2pdf.get_layout_fun((pt(ANCHO_MM + 2 * SANGRADO_MM), pt(ALTO_MM + 2 * SANGRADO_MM)))
    tmp = SALIDA + '.tmp'
    with open(tmp, 'wb') as f:
        f.write(img2pdf.convert(paginas, layout_fun=lay))
    pdf = pikepdf.open(tmp)
    s = pt(SANGRADO_MM)
    for p in pdf.pages:
        mb = [float(v) for v in p.MediaBox]
        p.BleedBox = pikepdf.Array(mb)
        p.TrimBox = pikepdf.Array([mb[0] + s, mb[1] + s, mb[2] - s, mb[3] - s])
    with open(PERFIL, 'rb') as f:
        icc = pikepdf.Stream(pdf, f.read()); icc.N = 4
    pdf.Root.OutputIntents = pikepdf.Array([pikepdf.Dictionary(
        Type=pikepdf.Name.OutputIntent, S=pikepdf.Name.GTS_PDFX,
        OutputConditionIdentifier='CMYK SWOP (Coated)', DestOutputProfile=icc)])
    pdf.save(SALIDA); os.remove(tmp)
    print(SALIDA, len(pdf.pages), 'páginas')

if __name__ == '__main__':
    main()
