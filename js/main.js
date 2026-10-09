(function () {
  var CATS = window.CATEGORIAS;
  var SITIOS = window.SITIOS;
  var catById = {};
  CATS.forEach(function (c) { catById[c.id] = c; });

  var COMMONS = window.FOTOS_COMMONS || {};
  var PROPIAS = { 'peribeca': 1, 'tucusito': 1, 'basilica-san-cristobal': 1, 'glamping-de-montana': 1 };
  function commonsUrl(archivo, ancho) {
    return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(archivo.replace(/ /g, '_')) + '?width=' + ancho;
  }
  function foto(id, ancho) {
    if (!PROPIAS[id] && COMMONS[id]) return commonsUrl(COMMONS[id], ancho || 900);
    return 'img/' + id + '.jpg';
  }

  /* ---------- Título letra por letra ---------- */
  var n = 0;
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var texto = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', texto);
    texto.split('').forEach(function (ch) {
      var l = document.createElement('span');
      l.className = 'letra';
      l.setAttribute('aria-hidden', 'true');
      l.style.setProperty('--i', n++);
      l.textContent = ch;
      el.appendChild(l);
    });
  });

  /* ---------- Recuento: las fotos del catálogo se van sumando ---------- */
  var montaje = document.querySelector('.montaje');
  var collage = document.getElementById('collage');
  var fondo = document.getElementById('montajeFondo');
  var conFoto = SITIOS.filter(function (s) { return PROPIAS[s.id]; }).concat(SITIOS.filter(function (s) { return !PROPIAS[s.id] && COMMONS[s.id]; }));
  // posiciones repartidas alrededor del título (x %, y %, ancho, giro)
  var POS = [
    [14, 22, 17, -7], [86, 20, 15, 6], [30, 78, 16, 5], [72, 80, 18, -5],
    [8, 58, 14, 4], [92, 56, 16, -6], [50, 14, 15, 3], [50, 88, 14, -3],
    [24, 42, 13, -4], [77, 40, 14, 7], [38, 30, 12, 8], [63, 66, 13, -8],
    [18, 88, 13, 6], [84, 90, 12, -4], [6, 12, 12, -9], [95, 10, 12, 9],
    [40, 60, 12, -6], [60, 28, 12, 5], [70, 12, 12, -3], [28, 10, 11, 4],
    [12, 76, 11, -2], [90, 74, 11, 3], [46, 44, 13, 2], [56, 50, 12, -7]
  ];
  var fotosR = conFoto.slice(0, POS.length).map(function (s, i) {
    var pos = POS[i];
    var el = document.createElement('div');
    el.className = 'foto-r media--' + s.cat;
    el.style.left = pos[0] + '%';
    el.style.top = pos[1] + '%';
    el.style.width = 'clamp(110px, ' + pos[2] + 'vw, 260px)';
    el.style.aspectRatio = i % 3 === 0 ? '3 / 4' : '4 / 3';
    el.style.setProperty('--r', pos[3] + 'deg');
    el.innerHTML = '<span style="background-image:url(\'' + foto(s.id, 500) + '\')"></span>';
    collage.appendChild(el);
    return { el: el, url: foto(s.id, 1200) };
  });
  var ultimoFondo = -1;

  /* ---------- Scroll: entrada, recuento y paso a azul ---------- */
  var intro = document.getElementById('intro');
  function clamp(v) { return Math.min(1, Math.max(0, v)); }
  function alScroll() {
    var vh = window.innerHeight;
    if (intro) intro.style.setProperty('--p', clamp(window.scrollY / (intro.offsetHeight * 0.8)).toFixed(3));
    if (!montaje) return;
    var r = montaje.getBoundingClientRect();
    var total = montaje.offsetHeight - vh;
    var p = clamp(-r.top / total);
    montaje.style.setProperty('--p', p.toFixed(3));
    if (r.top < vh * 0.5) montaje.classList.add('is-on');
    // fotos: aparecen entre el 8% y el 72% del recorrido
    var cuantas = Math.round(clamp((p - 0.08) / 0.64) * fotosR.length);
    fotosR.forEach(function (f, i) { f.el.classList.toggle('is-on', i < cuantas); });
    var idx = Math.min(fotosR.length - 1, Math.max(0, cuantas - 1));
    if (cuantas > 0 && idx !== ultimoFondo) {
      ultimoFondo = idx;
      fondo.style.backgroundImage = "url('" + fotosR[idx].url + "')";
    }
    // todo azul al final
    montaje.style.setProperty('--azul', clamp((p - 0.78) / 0.17).toFixed(3));
  }
  var pendiente = false;
  window.addEventListener('scroll', function () {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { alScroll(); pendiente = false; });
  }, { passive: true });
  window.addEventListener('resize', alScroll);
  alScroll();

  /* ---------- Cierre: mismas fotos en fundido ---------- */
  var outroSlides = document.querySelectorAll('.outro__slide');
  var outroCurrent = 0;
  setInterval(function () {
    outroCurrent = (outroCurrent + 1) % outroSlides.length;
    outroSlides.forEach(function (s, n) { s.classList.toggle('is-active', n === outroCurrent); });
  }, 6500);

  /* ---------- Aparición al hacer scroll ---------- */
  var observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
        });
      }, { threshold: 0.15 })
    : null;
  function revelar(el) {
    if (observer) observer.observe(el); else el.classList.add('is-visible');
  }

  document.querySelectorAll('.reveal').forEach(function (el, n) {
    if (el.parentElement.classList.contains('outro__inner')) el.style.setProperty('--d', (n % 4) * 0.12 + 's');
    revelar(el);
  });

  /* ---------- Pestañas + tarjetas ---------- */
  var tabs = document.getElementById('tabs');
  var track = document.getElementById('track');
  var opciones = [{ id: 'todos', nombre: 'Todos' }].concat(CATS.map(function (c) { return { id: c.id, nombre: c.titulo }; }));

  opciones.forEach(function (o) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.dataset.cat = o.id;
    b.textContent = o.nombre;
    b.addEventListener('click', function () { render(o.id); });
    tabs.appendChild(b);
  });

  function render(cat) {
    tabs.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.cat === cat ? 'true' : 'false');
    });
    var lista = cat === 'todos' ? SITIOS : SITIOS.filter(function (s) { return s.cat === cat; });
    track.innerHTML = '';
    lista.forEach(function (s, n) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'card';
      card.style.setProperty('--d', Math.min(n, 6) * 0.09 + 's');
      card.innerHTML =
        '<div class="media media--' + s.cat + '">' +
          '<span class="media__photo" style="background-image:url(\'' + foto(s.id) + '\')"></span>' +
          '<span class="card__name"></span>' +
        '</div>' +
        '<span class="card__place"></span>' +
        '<span class="card__more">Conoce su historia +</span>';
      card.querySelector('.card__name').textContent = s.nombre;
      card.querySelector('.card__place').textContent = s.lugar;
      card.setAttribute('aria-label', s.nombre + '. ' + s.corto);
      card.addEventListener('click', function () { abrir(s.id); });
      track.appendChild(card);
      revelar(card);
    });
    track.scrollLeft = 0;
  }

  document.getElementById('prev').addEventListener('click', function () {
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  });
  document.getElementById('next').addEventListener('click', function () {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  });

  document.querySelectorAll('[data-goto]').forEach(function (a) {
    a.addEventListener('click', function () { render(a.dataset.goto); });
  });

  render('todos');

  document.querySelectorAll('[data-foto]').forEach(function (el) {
    el.style.backgroundImage = "url('" + foto(el.dataset.foto) + "')";
  });

  /* ---------- Detalle (modal) ---------- */
  var modal = document.getElementById('modal');
  var mMedia = document.getElementById('modalMedia');

  function abrir(id) {
    var s = SITIOS.filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    mMedia.className = 'modal__media media media--' + s.cat;
    mMedia.innerHTML = '<span class="media__photo" style="background-image:url(\'' + foto(s.id, 1400) + '\')"></span>';
    var credito = document.getElementById('modalCredit');
    if (!PROPIAS[s.id] && COMMONS[s.id]) {
      credito.innerHTML = 'Foto: <a target="_blank" rel="noopener" href="https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(COMMONS[s.id].replace(/ /g, '_')) + '">Wikimedia Commons</a>';
      credito.hidden = false;
    } else {
      credito.hidden = true;
    }
    document.getElementById('modalCat').textContent = catById[s.cat].titulo;
    document.getElementById('modalTitle').textContent = s.nombre;
    document.getElementById('modalPlace').textContent = s.lugar;
    var txt = document.getElementById('modalText');
    txt.innerHTML = '';
    s.largo.forEach(function (p) {
      var el = document.createElement('p');
      el.textContent = p;
      txt.appendChild(el);
    });
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }
  function cerrar() {
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
  }
  document.getElementById('modalClose').addEventListener('click', cerrar);
  modal.addEventListener('click', function (e) { if (e.target === modal) cerrar(); });

  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { abrir(b.dataset.open); });
  });
})();
