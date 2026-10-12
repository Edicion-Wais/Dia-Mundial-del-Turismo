# Catálogo Turístico del Estado Táchira · Día Mundial del Turismo

Web de una sola página (HTML/CSS/JS estático, sin build) con 38 sitios e
íconos del estado Táchira y su historia.

- `index.html` — estructura de la página
- `css/style.css` — estilos
- `js/data.js` — textos de cada sitio (editar aquí)
- `js/main.js` — interactividad (carrusel, pestañas, fichas)
- `img/` — fotos; ver `img/LEEME.md` para los nombres de archivo

## Publicar en Vercel
Importa este repositorio en https://vercel.com/new con Framework Preset
**Other** y sin comando de build.

## Fichas individuales y códigos QR

Cada sitio tiene su propia página con **la ficha sola** en `<id>/index.html`,
con dirección `https://TU-DOMINIO/<id>/` (por ejemplo `/pauji-copete-de-piedra/`):
foto, historia, logo de la Cámara, botón flotante «Explorar catálogo» (lleva
al inicio de la web) y «Developed by WAIS». Es la página que abren los QR y
la que se comparte al abrir una ficha desde el catálogo.

Las fichas y las tarjetas QR (`qr/`) se generan con:

```bash
pip install qrcode pillow
python3 herramientas/generar_fichas.py --base https://TU-DOMINIO            # QR de los 38
python3 herramientas/generar_fichas.py --base https://TU-DOMINIO --solo pauji-copete-de-piedra
```

Vuelve a ejecutarlo si cambian los textos (`js/data.js`) o las fotos (`js/fotos.js`).
