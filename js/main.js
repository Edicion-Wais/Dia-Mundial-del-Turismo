(function () {
  var CATS = window.CATEGORIAS;
  var SITIOS = window.SITIOS;
  var catById = {};
  CATS.forEach(function (c) { catById[c.id] = c; });

  function foto(id) { return "img/" + id + ".jpg"; }

  /* ---------- Hero: carrusel de destinos ---------- */
  var slides = document.querySelectorAll('.hero__slide');
  var indexBtns = document.querySelectorAll('.hero__index button');
  var progress = document.getElementById('heroProgress');
  var current = 0, timer;

  function showSlide(i) {
    current = i;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    indexBtns.forEach(function (b, n) { b.classList.toggle('is-active', n === i); });
    progress.style.left = (i * 37) + '%';
  }
  function autoplay() {
    clearInterval(timer);
    timer = setInterval(function () { showSlide((current + 1) % slides.length); }, 6500);
  }
  indexBtns.forEach(function (b) {
    b.addEventListener('click', function () { showSlide(+b.dataset.slide); autoplay(); });
  });
  autoplay();

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
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.goto === cat);
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

  /* ---------- Detalle (modal) ---------- */
  var modal = document.getElementById('modal');
  var mMedia = document.getElementById('modalMedia');

  function abrir(id) {
    var s = SITIOS.filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    mMedia.className = 'modal__media media media--' + s.cat;
    mMedia.innerHTML = '<span class="media__photo" style="background-image:url(\'' + foto(s.id) + '\')"></span>';
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
