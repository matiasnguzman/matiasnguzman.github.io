// ================================
// TRANSLATIONS
// ================================
const translations = {
  es: {
    'meta-desc':        'Portfolio de Matías Guzmán — Editor de Video y Realizador Audiovisual en Buenos Aires.',
    'nav-about':        'Sobre mí',
    'nav-film':         'Cine',
    'nav-work':         'Laboral',
    'nav-projects':     'Proyectos',
    'nav-photo':        'Fotografía',
    'nav-contact':      'Contacto',
    'about-eyebrow':    'Editor de Video · Realizador Audiovisual',
    'about-bio':        'Editor audiovisual y realizador con base en Buenos Aires. Especializado en montaje de cine documental, edición para redes sociales y producción audiovisual institucional. Trabajé en proyectos seleccionados en el BAFICI y colaboro con organizaciones culturales, editoriales y organismos del Estado.',
    'about-img-alt':    'Matías Guzmán — Editor y Realizador Audiovisual',
    'skill-photo':      'Fotografía',
    'skill-sound':      'Sonido',
    'btn-cv':           'Descargar CV',
    'section-film':     'Proyectos Cinematográficos',
    'section-work':     'Experiencia Laboral',
    'section-projects': 'Otros Proyectos',
    'section-photo':    'Fotografía',
    'card-cambio-sub':  'Co-dirección · Montaje · BAFICI 2021',
    'card-manos-sub':   'Realización Integral · 2020',
    'card-ludico-sub':  'Dirección, producción y montaje · 2020',
    'card-eldorado-sub':'Realización Integral · 2019',
    'card-tp-sub':      'Creador de Contenidos · 2024–Actualidad',
    'card-indec-sub':   'Diseñador Audiovisual · 2021–Actualidad',
    'card-rayo-sub':    'Editor · Fotógrafo · 2022–2025',
    'card-foto-sub':    'Registro fotográfico de encuentros',
    'contact-eyebrow':  'Hablemos',
    'contact-heading':  '¿Tenés un proyecto?',
    'contact-sub':      'Estoy disponible para colaboraciones, trabajos freelance y posiciones de tiempo completo.',
    'footer':           '© 2026 Matías Guzmán · Buenos Aires',
  },
  en: {
    'meta-desc':        'Portfolio of Matías Guzmán — Video Editor & Filmmaker based in Buenos Aires.',
    'nav-about':        'About',
    'nav-film':         'Film',
    'nav-work':         'Work',
    'nav-projects':     'Projects',
    'nav-photo':        'Photography',
    'nav-contact':      'Contact',
    'about-eyebrow':    'Video Editor · Filmmaker',
    'about-bio':        'Audiovisual editor and filmmaker based in Buenos Aires. Specialized in documentary film editing, social media content, and institutional audiovisual production. My work has been selected at BAFICI, and I collaborate with cultural organizations, publishers, and government agencies.',
    'about-img-alt':    'Matías Guzmán — Video Editor & Filmmaker',
    'skill-photo':      'Photography',
    'skill-sound':      'Sound',
    'btn-cv':           'Download CV',
    'section-film':     'Film Projects',
    'section-work':     'Work Experience',
    'section-projects': 'Other Projects',
    'section-photo':    'Photography',
    'card-cambio-sub':  'Co-direction · Editing · BAFICI 2021',
    'card-manos-sub':   'Full Production · 2020',
    'card-ludico-sub':  'Direction, production & editing · 2020',
    'card-eldorado-sub':'Full Production · 2019',
    'card-tp-sub':      'Content Creator · 2024–Present',
    'card-indec-sub':   'Audiovisual Designer · 2021–Present',
    'card-rayo-sub':    'Editor · Photographer · 2022–2025',
    'card-foto-sub':    'Event photography',
    'contact-eyebrow':  "Let's talk",
    'contact-heading':  'Got a project?',
    'contact-sub':      'Available for collaborations, freelance work, and full-time positions.',
    'footer':           '© 2026 Matías Guzmán · Buenos Aires',
  }
};

// ================================
// HELPERS
// ================================
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// ================================
// THEME — init immediately (before DOMContentLoaded) to avoid flash
// ================================
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');
})();

// ================================
// MAIN
// ================================
document.addEventListener('DOMContentLoaded', () => {

  // --- Theme toggle ---
  const themeToggle = $('#theme-toggle');
  if (themeToggle) {
    function updateThemeIcon() {
      const isLight = document.body.classList.contains('light');
      themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
      updateThemeIcon();
    });
  }

  // --- Language ---
  const langToggle = $('#lang-toggle');
  let currentLang = localStorage.getItem('lang') || 'es';

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    if (langToggle) {
      langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
      langToggle.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
    }

    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const t = translations[lang];
      if (!t || t[key] === undefined) return;
      const attr = el.getAttribute('data-i18n-attr');
      if (attr) el.setAttribute(attr, t[key]);
      else el.textContent = t[key];
    });
  }

  applyLanguage(currentLang);
  if (langToggle) langToggle.addEventListener('click', () => applyLanguage(currentLang === 'es' ? 'en' : 'es'));

  // --- Scroll fade-in ---
  const fadeObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  $$('.fade-up').forEach(el => fadeObserver.observe(el));

  // --- Active nav on scroll ---
  const sections = $$('section[id]');
  const navLinks = $$('nav a');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => navObserver.observe(s));
  }

  // --- Lightbox ---
  const lightbox = $('#lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

});

// Exposed globally for inline onclick
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.style.display = 'none';
  document.body.style.overflow = '';
}

// ================================
// SLIDESHOW
// ================================
let slideIndex = 1;

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');
  
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
  showSlide(slideIndex);
}, { once: true });
