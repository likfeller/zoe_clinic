/* ============================================================
   Zoé Clinic — landing page interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header on scroll ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    // dim backdrop behind the slide-in menu
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function openMenu() {
      nav.classList.add('open');
      backdrop.classList.add('open');
      document.body.classList.add('menu-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      nav.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', function () {
      if (nav.classList.contains('open')) closeMenu(); else openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    // if the viewport grows back to desktop, make sure nothing stays locked
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* ---------- Language toggle (SQ / EN) ---------- */
  var STORE_KEY = 'zoe-lang';
  var langToggle = document.getElementById('langToggle');

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-sq][data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val == null) return;
      // Preserve simple inline HTML entities (e.g. &amp;)
      if (/[<&]/.test(val)) el.innerHTML = val;
      else el.textContent = val;
    });
    if (langToggle) {
      langToggle.querySelectorAll('.lang-opt').forEach(function (opt) {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
      });
    }
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  var saved = 'sq';
  try { saved = localStorage.getItem(STORE_KEY) || 'sq'; } catch (e) {}
  applyLang(saved);

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var current = document.documentElement.lang === 'en' ? 'en' : 'sq';
      applyLang(current === 'sq' ? 'en' : 'sq');
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Auto-load media when files are present ----------
     Drop your files into the media/ folder using the filenames shown
     in each placeholder (e.g. media/hero.jpg, media/action-1.mp4).
     If the file exists, it replaces the placeholder automatically.
     Images: .jpg .jpeg .png .webp   |  Videos: .mp4 .webm            */
  document.querySelectorAll('.media-slot[data-media]').forEach(function (slot) {
    var src = slot.getAttribute('data-media');
    if (!src) return;
    var isVideo = /\.(mp4|webm|mov)$/i.test(src);

    if (isVideo) {
      var v = document.createElement('video');
      v.src = src;
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute('preload', 'metadata');
      v.addEventListener('loadeddata', function () { swap(slot, v); });
      v.addEventListener('error', function () {/* keep placeholder */});
    } else {
      var img = new Image();
      img.src = src;
      img.alt = 'Zoé Clinic';
      img.addEventListener('load', function () { swap(slot, img); });
      img.addEventListener('error', function () {/* keep placeholder */});
    }
  });

  function swap(slot, mediaEl) {
    var ph = slot.querySelector('.media-placeholder');
    if (ph) ph.remove();
    slot.appendChild(mediaEl);
    if (mediaEl.tagName === 'VIDEO') {
      var p = mediaEl.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  /* ---------- Contact form (front-end only demo) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (note) note.hidden = false;
      form.reset();
    });
  }
})();
