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

`ficha.html?s=<id>` muestra la misma página con la ficha del sitio entre el
título del catálogo y la frase del poeta. Se genera a partir de `index.html`
(no editar `ficha.html` a mano) junto con las tarjetas QR en `qr/`:

```bash
pip install qrcode pillow
python3 herramientas/generar_fichas.py --base https://TU-DOMINIO.vercel.app            # los 38
python3 herramientas/generar_fichas.py --base https://TU-DOMINIO.vercel.app --solo pauji-copete-de-piedra
```

Vuelve a ejecutarlo cada vez que cambie `index.html`.
