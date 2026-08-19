/* Estudio Bonta — comportamiento del sitio */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  /* el sistema puede tener las animaciones apagadas (Windows: Efectos de animación).
     Las de este sitio son suaves, así que se muestran igual; solo la marquesina
     de marcas respeta esa preferencia, vía CSS. */

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

  /* cifras: tambor que gira y frena, se repite al volver a entrar en pantalla */
  var drums = [];
  $$('[data-roll]').forEach(function (el, idx) {
    var txt = el.getAttribute('data-roll');
    el.textContent = '';
    el.style.display = 'inline-flex';
    var strips = [];
    txt.split('').forEach(function (ch, i) {
      var win = document.createElement('span');
      win.style.cssText = 'display:inline-block;height:1em;line-height:1;overflow:hidden';
      var strip = document.createElement('span');
      strip.style.cssText = 'display:block;will-change:transform';
      var loops = 2 + i + (idx % 2), l, d, s;
      for (l = 0; l < loops; l++) for (d = 0; d < 10; d++) {
        s = document.createElement('span');
        s.style.cssText = 'display:block;height:1em;line-height:1';
        s.textContent = String(d);
        strip.appendChild(s);
      }
      var fin = document.createElement('span');
      fin.style.cssText = 'display:block;height:1em;line-height:1';
      fin.textContent = ch;
      strip.appendChild(fin);
      win.appendChild(strip);
      el.appendChild(win);
      strips.push({ strip: strip, travel: loops * 10, i: i });
    });
    drums.push({ el: el, strips: strips });
  });
  var spinDrum = function (d) {
    d.strips.forEach(function (o) {
      o.strip.style.transition = 'none';
      o.strip.style.transform = 'translateY(0)';
      void o.strip.offsetHeight;
      requestAnimationFrame(function () {
        o.strip.style.transition = 'transform ' + (2.6 + o.i * 0.45) + 's cubic-bezier(.08,.72,.13,1)';
        o.strip.style.transform = 'translateY(-' + o.travel + 'em)';
      });
    });
  };
  var restDrum = function (d) {
    d.strips.forEach(function (o) {
      o.strip.style.transition = 'none';
      o.strip.style.transform = 'translateY(-' + o.travel + 'em)';
    });
  };
  if (!('IntersectionObserver' in window)) {
    drums.forEach(restDrum);
  } else {
    var drumIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var d = drums.filter(function (x) { return x.el === e.target; })[0];
        if (!d) return;
        if (e.isIntersecting) spinDrum(d); else restDrum(d);
      });
    }, { threshold: 0.6 });
    drums.forEach(function (d) { drumIO.observe(d.el); });
  }

  /* apariciones al scrollear */
  var nodes = $$('[data-rv]');
  var show = function (el) { el.setAttribute('data-shown', '1'); };
  if (!('IntersectionObserver' in window)) {
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
