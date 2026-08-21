/* Estudio Bonta — comportamiento del sitio */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* aviso superior */
  var promo = $('[data-promo]'), promoClose = $('[data-promo-close]');
  if (promo && promoClose) promoClose.addEventListener('click', function () { promo.style.display = 'none'; });

  /* WhatsApp flotante */
  var wa = $('[data-wa-float]');
  if (wa) {
    var onScroll = function () {
      var on = window.scrollY > 360;
      wa.style.opacity = on ? '1' : '0';
      wa.style.transform = on ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)';
      wa.style.pointerEvents = on ? 'auto' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* cifras: cuenta real de un valor a otro (ascendente o descendente), se repite al volver a entrar en pantalla */
  var counters = $$('[data-count]');
  var easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
  var runCounters = {};
  var animateCounter = function (el) {
    var from = parseInt(el.getAttribute('data-count-from'), 10);
    var to = parseInt(el.getAttribute('data-count-to'), 10);
    var delay = parseInt(el.getAttribute('data-count-delay'), 10) || 0;
    var duration = 1900;
    clearTimeout(runCounters[el._cid]);
    runCounters[el._cid] = setTimeout(function () {
      var start = null;
      var frame = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        el.textContent = String(Math.round(from + (to - from) * easeOutCubic(p)));
        if (p < 1) requestAnimationFrame(frame); else el.textContent = String(to);
      };
      requestAnimationFrame(frame);
    }, delay);
  };
  var resetCounter = function (el) { el.textContent = el.getAttribute('data-count-from'); };
  counters.forEach(function (el, idx) { el._cid = idx; resetCounter(el); });
  if (reduce || !('IntersectionObserver' in window)) {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count-to'); });
  } else {
    var countIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) animateCounter(e.target); else resetCounter(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  /* apariciones al scrollear */
  var nodes = $$('[data-rv]');
  var show = function (el) { el.setAttribute('data-shown', '1'); };
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach(show);
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    nodes.forEach(function (n) { io.observe(n); });
    setTimeout(function () { nodes.forEach(show); }, 3500);
  }

  /* carrusel del hero */
  var slides = $$('[data-hero-slide]'), dots = $$('[data-hero-dot]'), timer, i = 0;
  var INTERVAL = 7000;
  if (slides.length > 1) {
    var go = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.style.opacity = k === i ? '1' : '0'; });
      dots.forEach(function (d, k) { d.style.opacity = k === i ? '1' : '0.34'; });
      var c = $('[data-hero-count]');
      if (c) c.textContent = '0' + (i + 1) + ' / 0' + slides.length;
    };
    var restart = function () { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, INTERVAL); };
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); restart(); }); });
    restart();
  }

  /* formulario -> mailto */
  var form = $('#form-contacto');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var body = 'Nombre: ' + (f.get('nombre') || '') + '\nEmail: ' + (f.get('email') || '') + '\nTeléfono: ' + (f.get('telefono') || '');
    window.location.href = 'mailto:ploteosbonta@gmail.com?subject=' + encodeURIComponent('Consulta desde la web') + '&body=' + encodeURIComponent(body);
  });
})();
