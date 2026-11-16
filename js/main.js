/* Boutique site: fills the page from site-config.js, then runs the scroll animations. */
(function () {
  'use strict';
  var S = window.SITE;
  if (!S) { console.error('site-config.js is missing'); return; }

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, S);
  }
  function wa(text) {
    return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(text);
  }
  var defaultMsg = "Hi " + S.name + ", I'd like to book an appointment.";

  /* ---------- theme, photo, page title ---------- */
  var root = document.documentElement;
  if (S.theme && S.theme !== 'pale-gold') root.setAttribute('data-theme', S.theme);
  if (S.images && S.images.hero) root.style.setProperty('--photo', 'url("' + new URL(S.images.hero, location.href).href + '")');
  document.title = S.name + ' | ' + S.tagline.replace(/\.$/, '');
  var md = $('meta[name="description"]');
  if (md) md.setAttribute('content', S.tagline + ' Prices listed, WhatsApp booking. ' + S.address);

  /* ---------- plain text bindings ---------- */
  $$('[data-bind]').forEach(function (el) {
    var v = get(el.getAttribute('data-bind'));
    if (v != null) el.textContent = v;
  });

  /* ---------- list renderers ---------- */
  var mark = '<svg><use href="#mark"/></svg>';
  var R = {
    facts: function () {
      return S.facts.map(function (f) { return '<div><b>' + esc(f.title) + '</b>' + esc(f.text) + '</div>'; }).join('');
    },
    band: function () {
      var one = S.band.map(function (w) { return '<span>' + esc(w) + '</span>' + mark; }).join('');
      return one + one;
    },
    steps: function () {
      return S.signature.steps.map(function (s) {
        return '<li><span>' + esc(s.name) + '</span><span>' + esc(s.time) + '</span></li>';
      }).join('');
    },
    packages: function () {
      return S.bridal.packages.map(function (p, i) {
        return '<div data-r="up"' + (i ? ' style="--d:' + (i * 0.12) + 's"' : '') + '><h3>' + esc(p.name) + '</h3><div class="pr">' +
          esc(p.price) + (p.unit ? '<i>' + esc(p.unit) + '</i>' : '') + '</div><p>' + esc(p.text) + '</p></div>';
      }).join('');
    },
    stats: function () {
      return S.stats.map(function (s, i) {
        var shown = s.decimals ? s.value.toFixed(s.decimals) : Number(s.value).toLocaleString('en-IN');
        return '<div class="stat" data-r="up"' + (i ? ' style="--d:' + (i * 0.12) + 's"' : '') + '><b><span data-count="' + s.value +
          '" data-dec="' + (s.decimals || 0) + '">' + shown + '</span>' + esc(s.suffix || '') + '</b><span>' + esc(s.label) + '</span></div>';
      }).join('');
    },
    gallery: function () {
      return S.gallery.items.slice(0, 6).map(function (it, i) {
        var img = it.image
          ? '<div class="img" style="background-image:url(\'' + esc(it.image) + '\');background-position:' + esc(it.position || 'center') + '"></div>'
          : '<div class="img"></div>';
        return '<figure class="tile g' + (i + 1) + '" data-r="clip"' + (i ? ' style="--d:' + (i * 0.1) + 's"' : '') + '>' + img +
          '<figcaption>' + esc(it.caption) + '</figcaption></figure>';
      }).join('');
    },
    reviews: function () {
      return S.reviews.map(function (r, i) {
        return '<blockquote data-r="up"' + (i ? ' style="--d:' + (i * 0.12) + 's"' : '') + '>' + esc(r.text) + '<cite>' + esc(r.name) + '</cite></blockquote>';
      }).join('');
    },
    hours: function () {
      return S.hours.map(function (h) { return '<li><span>' + esc(h.day) + '</span><b>' + esc(h.time) + '</b></li>'; }).join('');
    },
    footServices: function () {
      return Object.keys(S.services).map(function (k) { return '<li>' + esc(S.services[k].label) + '</li>'; }).join('');
    },
    social: function () {
      return S.social.map(function (s) { return '<li><a href="' + esc(s.url) + '" rel="noopener">' + esc(s.label) + '</a></li>'; }).join('');
    }
  };
  $$('[data-render]').forEach(function (el) {
    var fn = R[el.getAttribute('data-render')];
    if (fn) el.innerHTML = fn();
  });

  /* free slots card */
  var glass = $('.glass');
  if (!S.slots || !S.slots.length) { glass.hidden = true; }
  else {
    $('[data-slot-list]', glass).innerHTML = S.slots.map(function (t) {
      return '<a href="' + wa("Hi " + S.name + ", I'd like to book an appointment today at " + t + ".") + '" target="_blank" rel="noopener">' + esc(t) + '</a>';
    }).join('');
  }

  /* services: tabs and price menus */
  var keys = Object.keys(S.services);
  $('#cats').innerHTML = keys.map(function (k, i) {
    var n = S.services[k].items.length;
    return '<button role="tab" data-cat="' + k + '"' + (i === 0 ? ' class="on"' : '') + ' aria-selected="' + (i === 0) + '">' +
      esc(S.services[k].label) + ' <small>' + n + (n === 1 ? ' service' : ' services') + '</small></button>';
  }).join('');
  $('#panels').innerHTML = keys.map(function (k, i) {
    var c = S.services[k];
    var pic = c.image
      ? '<div class="pimg"><div class="ph" style="background-image:url(\'' + esc(c.image) + '\')"></div><div class="chip"><b>' + esc(c.label) + '</b>' + esc(c.blurb || '') + '</div></div>'
      : '';
    return '<div class="panel' + (i === 0 ? ' on' : '') + '" id="p-' + k + '" role="tabpanel">' + pic + '<ul class="menu">' +
      c.items.map(function (it, n) {
        var href = wa('Hi ' + S.name + ", I'd like to book " + it.name + '.');
        return '<li style="--i:' + n + '"><a class="row" href="' + href + '" target="_blank" rel="noopener"><span class="n">' + esc(it.name) +
          '</span><span class="dots"></span><span class="p">' + esc(it.price) + (it.unit ? '<i>' + esc(it.unit) + '</i>' : '') + '</span>' +
          (it.note ? '<span class="d">' + esc(it.note) + '</span>' : '') + '</a></li>';
      }).join('') + '</ul></div>';
  }).join('');

  /* signature photo */
  var sigImg = $('.arch .img');
  if (S.signature.image) sigImg.style.background = 'url("' + new URL(S.signature.image, location.href).href + '") 50% 30% / cover no-repeat';

  /* demo notes and footer line */
  $$('[data-demo]').forEach(function (el) { if (!S.demo) el.remove(); });
  $('#legal').textContent = S.demo
    ? 'Demo website. Salon name, prices, reviews and numbers are sample content.'
    : '© ' + new Date().getFullYear() + ' ' + S.name + '. All rights reserved.';

  /* map */
  if (S.mapEmbed) {
    var map = $('#map');
    map.classList.add('has-embed');
    map.insertAdjacentHTML('beforeend', '<iframe src="' + esc(S.mapEmbed) + '" loading="lazy" title="Map to ' + esc(S.name) + '" referrerpolicy="no-referrer-when-downgrade"></iframe>');
  }

  /* links */
  $$('[data-wa]').forEach(function (a) {
    var from = a.getAttribute('data-wa-text-from');
    a.href = wa(from ? get(from) : defaultMsg);
    a.target = '_blank'; a.rel = 'noopener';
  });
  $('#callBtn').href = 'tel:' + S.phoneLink;
  var dir = $('#dirBtn'); dir.href = S.directionsUrl; dir.target = '_blank'; dir.rel = 'noopener';
  var ig = S.social.filter(function (s) { return /instagram/i.test(s.label); })[0];
  $('#galBtn').href = ig ? ig.url : '#';

  /* wedding date check */
  var wd = $('#wedDate'), db = $('#dateBtn');
  function updDate() {
    var v = wd.value, txt;
    if (v) {
      var d = new Date(v + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      txt = 'Hi ' + S.name + ', is ' + d + ' free for a bridal booking?';
    } else {
      txt = 'Hi ' + S.name + ", I'd like to check a date for a bridal booking.";
    }
    db.href = wa(txt); db.target = '_blank'; db.rel = 'noopener';
  }
  wd.addEventListener('change', updDate); updDate();
  $('#dateForm').addEventListener('submit', function (e) { e.preventDefault(); });

  /* search engine data */
  var ld = {
    '@context': 'https://schema.org', '@type': 'BeautySalon', name: S.name, url: S.url, telephone: S.phoneLink,
    description: S.tagline, image: new URL(S.images.hero, location.href).href,
    address: { '@type': 'PostalAddress', streetAddress: S.street, addressLocality: S.city, postalCode: S.postcode, addressCountry: 'IN' }
  };
  if (!S.demo && S.rating) ld.aggregateRating = { '@type': 'AggregateRating', ratingValue: S.rating.score, reviewCount: S.rating.count };
  var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(ld);
  document.head.appendChild(sc);

  /* ---------- tabs ---------- */
  var tabs = $$('.cats button'), panels = $$('.panel');
  function show(cat) {
    tabs.forEach(function (b) { var on = b.dataset.cat === cat; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
    panels.forEach(function (p) { p.classList.toggle('on', p.id === 'p-' + cat); });
  }
  tabs.forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.cat); });
    b.addEventListener('mouseenter', function () { if (window.matchMedia('(hover:hover)').matches) show(b.dataset.cat); });
  });

  /* ---------- mobile menu ---------- */
  (function () {
    var btn = $('#menuBtn'), panel = $('#mnav'), closeBtn = $('#menuClose');
    function setOpen(o) {
      panel.classList.toggle('open', o);
      document.documentElement.classList.toggle('menu-open', o);
      btn.setAttribute('aria-expanded', o ? 'true' : 'false');
      btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      panel.setAttribute('aria-hidden', o ? 'false' : 'true');
      if (o) closeBtn.focus(); else if (panel.contains(document.activeElement)) btn.focus();
    }
    btn.addEventListener('click', function () { setOpen(!panel.classList.contains('open')); });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    $$('a', panel).forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = document.querySelector(a.getAttribute('href'));
        e.preventDefault();
        setOpen(false);
        if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900 && panel.classList.contains('open')) setOpen(false); });
  })();

  /* ---------- scroll effects ---------- */
  var top = $('#top'), prog = $('#progress'), heroPhoto = $('#heroPhoto'), track = $('#track');
  var par = $$('[data-par]'), stmt = $('#statement');
  stmt.innerHTML = stmt.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + esc(w) + '</span>'; }).join(' ');
  var words = $$('.w', stmt), ticking = false;

  function frame() {
    ticking = false;
    var y = window.pageYOffset, vh = window.innerHeight, max = document.documentElement.scrollHeight - vh;
    top.classList.toggle('scrolled', y > 24);
    prog.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (reduce) { words.forEach(function (w) { w.classList.add('on'); }); return; }
    if (y < vh * 1.2) heroPhoto.style.transform = 'translate3d(0,' + (y * 0.16) + 'px,0)';
    var r = stmt.getBoundingClientRect();
    var p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.22), 0, 1);
    var n = Math.round(p * words.length * 1.02);
    words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
    var half = track.scrollWidth / 2;
    track.style.transform = 'translate3d(' + (-((y * 0.35) % half)) + 'px,0,0)';
    var sv = $('.services');
    if (sv) { var sr = sv.getBoundingClientRect(); if (sr.bottom > 0 && sr.top < vh) sv.style.setProperty('--gy', (sr.top * -0.14) + 'px'); }
    par.forEach(function (el) {
      var b = el.parentNode.getBoundingClientRect();
      if (b.bottom < 0 || b.top > vh) return;
      el.style.transform = 'translate3d(0,' + (((b.top + b.height / 2) - vh / 2) * parseFloat(el.dataset.par)) + 'px,0)';
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  frame();

  /* ---------- reveal on scroll and count-up ---------- */
  function count(root) {
    $$('[data-count]', root).forEach(function (el) {
      var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || 0, 10), t0 = null, dur = 1700;
      if (reduce) return;
      function step(t) {
        if (!t0) t0 = t;
        var k = clamp((t - t0) / dur, 0, 1), v = to * (1 - Math.pow(1 - k, 3));
        el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN');
        if (k < 1) requestAnimationFrame(step);
      }
      el.textContent = dec ? (0).toFixed(dec) : '0';
      requestAnimationFrame(step);
    });
  }
  function replay() {
    var act = $('.panel.on'); if (!act) return;
    act.classList.remove('on'); void act.offsetWidth; act.classList.add('on');
  }
  var rev = $$('[data-r]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in'); io.unobserve(e.target);
        if (e.target.querySelector('[data-count]')) count(e.target);
        if (e.target.id === 'panels') replay();
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add('in'); });
  }
})();
