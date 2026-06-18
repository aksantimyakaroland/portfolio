/* ====================================================
   SCRIPT.JS — Portfolio Roland A. Myaka
   Modules :
   1. Loader de page
   2. Toggle Jour / Nuit (avec localStorage)
   3. Navbar : scroll + active link + hamburger
   4. Typing effect Hero
   5. Animations au scroll (Intersection Observer)
   6. Barres de compétences animées
   7. Curseur personnalisé
   8. Bouton retour en haut
   9. Année courante footer
   10. Formulaire contact (feedback visuel)
==================================================== */

/* ====================================================
   1. LOADER DE PAGE
==================================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Cache le loader après 1.6s (durée animation barre)
  setTimeout(() => {
    loader.classList.add('hidden');
    // Lance les animations hero après loader
    initHeroAnimations();
  }, 1600);
});

function initHeroAnimations() {
  // Les animations CSS sont déjà gérées via keyframes + animation-delay
  // On déclenche simplement la visibilité du scroll-hint
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) scrollHint.style.opacity = '1';
}


/* ====================================================
   2. TOGGLE JOUR / NUIT
   - Mémorisé dans localStorage
   - Transition fluide via CSS
==================================================== */
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

// Applique le thème sauvegardé au chargement
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}


/* ====================================================
   3. NAVBAR — Scroll + liens actifs + menu mobile
==================================================== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu= document.getElementById('mobileMenu');
const navLinks  = document.querySelectorAll('.nav-link');
const mobLinks  = document.querySelectorAll('.mob-link');

// Effet scroll : fond + ombre sur la navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Met à jour le lien actif
  updateActiveNavLink();
  // Affiche/cache le bouton retour en haut
  toggleBackToTop();
}, { passive: true });

// Détection de la section visible pour le lien actif
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Menu hamburger (mobile)
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Ferme le menu au clic sur un lien mobile
  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// Smooth scroll pour tous les liens ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // hauteur navbar
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ====================================================
   4. TYPING EFFECT — Hero
   Alterne entre les mots définis ci-dessous
==================================================== */
const typingEl = document.getElementById('typingWord');

// ── Modifiez ce tableau pour changer les mots ──
const words = [
  'Développeur Web',
  'Expert en IA',
  'Polyglotte',
  'Tuteur d\'anglais',
  'Freelance',
];

let wordIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer = null;

const TYPING_SPEED   = 90;   // ms par caractère (écriture)
const DELETING_SPEED = 50;   // ms par caractère (suppression)
const PAUSE_AFTER    = 1800; // pause après mot complet
const PAUSE_BEFORE   = 400;  // pause avant nouveau mot

function typeEffect() {
  if (!typingEl) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    // Suppression
    typingEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      typingTimer = setTimeout(typeEffect, PAUSE_BEFORE);
      return;
    }
    typingTimer = setTimeout(typeEffect, DELETING_SPEED);

  } else {
    // Écriture
    typingEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting  = true;
      typingTimer = setTimeout(typeEffect, PAUSE_AFTER);
      return;
    }
    typingTimer = setTimeout(typeEffect, TYPING_SPEED);
  }
}

// Démarre après le loader
setTimeout(typeEffect, 2000);


/* ====================================================
   5. ANIMATIONS AU SCROLL — Intersection Observer
   Les éléments avec .reveal apparaissent au scroll
==================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Léger délai staggeré par ordre d'apparition
        entry.target.style.transitionDelay = `${i * 0.06}s`;
        entry.target.classList.add('visible');
        // On désobserve après animation pour les barres
        if (!entry.target.classList.contains('skill-cat')) {
          revealObserver.unobserve(entry.target);
        }
      }
    });
  },
  {
    threshold: 0.12,  // déclenche à 12% de visibilité
    rootMargin: '0px 0px -60px 0px'
  }
);

// Observer tous les éléments .reveal
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ====================================================
   6. BARRES DE COMPÉTENCES ANIMÉES
   Les barres se remplissent quand elles deviennent visibles
==================================================== */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trouve toutes les barres dans cet élément
        entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
          const targetWidth = bar.getAttribute('data-w') + '%';
          // Délai staggeré pour chaque barre
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, i * 150);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-cat').forEach(cat => {
  barObserver.observe(cat);
});


/* ====================================================
   7. CURSEUR PERSONNALISÉ
   Suit la souris avec un léger lag sur le trail
==================================================== */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

// Position cible et actuelle du trail
let mouseX = 0, mouseY = 0;
let trailX  = 0, trailY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

// Animation fluide du trail via RAF
function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;

  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Effet "hovered" sur les éléments interactifs
const interactiveEls = document.querySelectorAll(
  'a, button, .proj-card, .logo-item, .skill-cat, input, textarea, select'
);
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('hovered');
    cursorTrail?.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('hovered');
    cursorTrail?.classList.remove('hovered');
  });
});


/* ====================================================
   8. BOUTON RETOUR EN HAUT
==================================================== */
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ====================================================
   9. ANNÉE COURANTE — Footer
==================================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ====================================================
   10. FORMULAIRE CONTACT — Feedback visuel
   Netlify gère l'envoi réel en production.
   Ce script ajoute un retour visuel et validation.
==================================================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    // On laisse Netlify gérer l'envoi (action="/merci.html")
    // Ce code s'exécute juste pour le feedback visuel

    // Désactive le bouton pour éviter le double envoi
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector('.submit-text').textContent = 'Envoi en cours…';
    }

    // Note : si vous voulez tester localement sans Netlify,
    // décommentez les lignes ci-dessous pour simuler l'envoi AJAX :
    
    e.preventDefault();
    setTimeout(() => {
      contactForm.reset();
      if (formSuccess) formSuccess.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector('.submit-text').textContent = 'Envoyer le message';
      }
      setTimeout(() => {
        if (formSuccess) formSuccess.style.display = 'none';
      }, 6000);
    }, 1200);
    
  });
}


/* ====================================================
   BONUS — Effet parallax léger sur la section Hero
   Le fond bouge légèrement au scroll pour de la profondeur
==================================================== */
const heroBgGrid = document.querySelector('.hero-bg-grid');
const heroBgGlow = document.querySelector('.hero-bg-glow');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    const factor = scrolled * 0.3;
    if (heroBgGrid) heroBgGrid.style.transform = `translateY(${factor}px)`;
    if (heroBgGlow) heroBgGlow.style.transform = `translateY(calc(-50% + ${factor * 0.5}px))`;
  }
}, { passive: true });
