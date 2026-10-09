/* Ficha individual (ficha.html?s=<id>): se muestra después del título
   del catálogo y antes de la frase del poeta. Usa los mismos datos y
   fotos que la página principal. */
(function () {
  var seccion = document.getElementById('ficha');
  if (!seccion || !window.TACHIRA) return;

  var id = new URLSearchParams(location.search).get('s');
  var sitio = window.SITIOS.filter(function (x) { return x.id === id; })[0];
  if (!sitio) { seccion.remove(); return; }

  var T = window.TACHIRA;
  var cat = T.categoria(sitio.cat);
  document.title = sitio.nombre + ' · Catálogo Turístico del Estado Táchira';

  seccion.querySelector('.ficha__media').className = 'ficha__media media media--' + sitio.cat;
  seccion.querySelector('.ficha__foto').style.backgroundImage = "url('" + T.foto(sitio.id, 1400) + "')";
  seccion.querySelector('.ficha__cat').textContent = cat.titulo;
  seccion.querySelector('.ficha__titulo').textContent = sitio.nombre;
  seccion.querySelector('.ficha__lugar').textContent = sitio.lugar;
  seccion.querySelector('.ficha__corto').textContent = sitio.corto;
  var cuerpo = seccion.querySelector('.ficha__texto');
  sitio.largo.forEach(function (p) {
    var el = document.createElement('p');
    el.textContent = p;
    cuerpo.appendChild(el);
  });
  var credito = seccion.querySelector('.ficha__credito');
  if (!T.esPropia(sitio.id) && T.commons[sitio.id]) {
    credito.innerHTML = 'Foto: <a target="_blank" rel="noopener" href="https://commons.wikimedia.org/wiki/File:' +
      encodeURIComponent(T.commons[sitio.id].replace(/ /g, '_')) + '">Wikimedia Commons</a>';
  } else {
    credito.remove();
  }

  // Aparición al hacer scroll
  var obs = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 }) : null;
  seccion.querySelectorAll('.f-rev').forEach(function (el) {
    if (obs) obs.observe(el); else el.classList.add('is-visible');
  });
})();
