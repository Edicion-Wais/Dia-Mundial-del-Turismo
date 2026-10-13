"""PDF de impresión en CMYK: tarjetas 120×200 mm + 3 mm de sangrado, alternando
catálogo / sitio. Uso: python3 herramientas/pdf_cmyk.py"""
import io, json, os, subprocess
import numpy as np, img2pdf, pikepdf
from PIL import Image, ImageCms

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(RAIZ, 'tarjetas-qr')
SALIDA = os.path.join(DIR, 'QR-Catalogo-Turistico-Tachira-CMYK.pdf')
PERFIL = os.path.join(RAIZ, 'herramientas', 'perfil-cmyk-swop.icc')
ANCHO_MM, ALTO_MM, SANGRADO_MM = 120, 200, 3

rgb_a_cmyk = ImageCms.buildTransform(ImageCms.createProfile('sRGB'), ImageCms.getOpenProfile(PERFIL),
                                     'RGB', 'CMYK', renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC)
cache = {}

def cmyk(png):
    if png in cache:
        return cache[png]
    im = Image.open(png).convert('RGB')
    s = round(im.width / ANCHO_MM * SANGRADO_MM)         # sangrado: se extiende el borde
    im = Image.fromarray(np.pad(np.asarray(im), ((s, s), (s, s), (0, 0)), mode='edge'))
    c = ImageCms.applyTransform(im, rgb_a_cmyk)
    buf = io.BytesIO(); c.save(buf, 'TIFF', compression='tiff_adobe_deflate', dpi=(300, 300))
    cache[png] = buf.getvalue()
    return cache[png]

def main():
    js = 'global.window={};require(%s);console.log(JSON.stringify(window.SITIOS.map(s=>s.id)))' % json.dumps(os.path.join(RAIZ, 'js', 'data.js'))
    ids = json.loads(subprocess.check_output(['node', '-e', js]))
    paginas = []
    for i in ids:
        paginas += [cmyk(os.path.join(DIR, 'catalogo.png')), cmyk(os.path.join(DIR, i + '.png'))]
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
