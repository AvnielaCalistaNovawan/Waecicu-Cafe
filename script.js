/* ============================================================
   WAE CICU BAKE — Interactive JavaScript
   ============================================================ */

'use strict';

// ===================================
// CUSTOM CURSOR
// ===================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let rafId = null;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  rafId = requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover states
const hoverTargets = 'a, button, .menu-item, .gallery-card, .testimonial-card, .menu-tab';
document.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverTargets)) {
    cursorRing.classList.add('hovered');
    cursorDot.style.transform = 'translate(-50%,-50%) scale(1.5)';
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest(hoverTargets)) {
    cursorRing.classList.remove('hovered');
    cursorDot.style.transform = 'translate(-50%,-50%) scale(1)';
  }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity = '1';
  cursorRing.style.opacity = '1';
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleNavScroll, { passive: true });

// ===================================
// HAMBURGER MENU
// ===================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===================================
// PARALLAX EFFECTS
// ===================================
const parallaxBgs = document.querySelectorAll('.parallax-bg');

const handleParallax = () => {
  const scrollY = window.scrollY;
  parallaxBgs.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
};
window.addEventListener('scroll', handleParallax, { passive: true });

// ===================================
// SCROLL REVEAL (Intersection Observer)
// ===================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger children if it's a group
      const delay = entry.target.style.animationDelay || '0s';
      entry.target.style.transitionDelay = delay !== '0s' ? delay : '0s';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.scroll-reveal').forEach((el, i) => {
  // Auto-stagger siblings
  const parent = el.parentElement;
  const siblings = parent.querySelectorAll('.scroll-reveal');
  const idx = Array.from(siblings).indexOf(el);
  if (!el.style.animationDelay && idx > 0) {
    el.style.transitionDelay = (idx * 0.1) + 's';
  }
  revealObserver.observe(el);
});

// ===================================
// MENU TABS
// ===================================
const menuTabs = document.querySelectorAll('.menu-tab');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update tabs
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Hide all lists with fade
    document.querySelectorAll('.menu-list').forEach(list => {
      list.style.opacity = '0';
      list.style.transform = 'translateY(10px)';
      setTimeout(() => {
        list.classList.add('hidden');
        list.style.opacity = '';
        list.style.transform = '';
      }, 250);
    });

    // Show target list
    setTimeout(() => {
      const targetList = document.getElementById('tab-' + target);
      if (targetList) {
        targetList.classList.remove('hidden');
        targetList.style.opacity = '0';
        targetList.style.transform = 'translateY(10px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            targetList.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            targetList.style.opacity = '1';
            targetList.style.transform = 'translateY(0)';
          });
        });

        // Re-observe new items
        targetList.querySelectorAll('.menu-item').forEach((item, i) => {
          item.classList.remove('visible');
          item.style.transitionDelay = (i * 0.08) + 's';
          setTimeout(() => {
            item.classList.add('visible');
          }, 50 + i * 80);
        });
      }
    }, 280);
  });
});

// ===================================
// BADGE ROTATION PAUSE ON HOVER
// ===================================
const badge = document.querySelector('.hero-badge');
if (badge) {
  badge.addEventListener('mouseenter', () => {
    badge.style.animationPlayState = 'paused';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.animationPlayState = 'running';
  });
}

// ===================================
// WHATSAPP FUNCTION
// ===================================
function openWhatsApp() {
  const phone = '6281200000000'; // Replace with actual number
  const message = encodeURIComponent('Halo Wae Cicu Bake! Saya ingin melakukan reservasi / memesan kue. 🎂');
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
}
window.openWhatsApp = openWhatsApp;

// ===================================
// SMOOTH SECTION TRANSITIONS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===================================
// GALLERY CARD PARALLAX ON HOVER
// ===================================
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const inner = card.querySelector('.gallery-card-inner');
    if (inner) {
      inner.style.transform = `scale(1.04) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.gallery-card-inner');
    if (inner) {
      inner.style.transform = '';
      inner.style.transition = 'transform 0.6s ease';
    }
  });
  card.addEventListener('mouseenter', () => {
    const inner = card.querySelector('.gallery-card-inner');
    if (inner) inner.style.transition = 'transform 0.15s ease';
  });
});

// ===================================
// MENU ITEM FLOATING IMAGE ON HOVER (enhanced)
// ===================================
document.querySelectorAll('.menu-item').forEach(item => {
  const img = item.querySelector('.menu-hover-img');
  if (!img) return;

  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const centerOffset = y - rect.height / 2;
    img.style.transform = `translateY(calc(-50% + ${centerOffset * 0.15}px)) scale(1)`;
  });

  item.addEventListener('mouseleave', () => {
    img.style.transform = 'translateY(-50%) scale(0.85)';
  });
});

// ===================================
// MARQUEE PAUSE ON HOVER
// ===================================
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.parentElement.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.parentElement.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ===================================
// SCROLL-BASED VINE ANIMATION
// ===================================
const vines = document.querySelectorAll('.vine');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  const progress = Math.min(scrollY / heroHeight, 1);
  vines.forEach(vine => {
    vine.style.opacity = 0.4 - progress * 0.35;
    vine.style.transform = vine.classList.contains('vine-right')
      ? `scaleX(-1) translateY(${scrollY * 0.06}px)`
      : `translateY(${scrollY * 0.06}px)`;
  });
}, { passive: true });

// ===================================
// NUMBER COUNTER ANIMATION
// ===================================
const animateCounter = (el, target, suffix = '') => {
  let current = 0;
  const step = target / 60;
  const isDecimal = target % 1 !== 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (isDecimal ? current.toFixed(0) : Math.floor(current)) + suffix;
  }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent;
        const match = text.match(/(\d+)/);
        const suffix = text.replace(/\d+/, '');
        if (match) {
          animateCounter(num, parseInt(match[1]), suffix);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);

// ===================================
// GALLERY CLICK-TO-REVEAL (3D Flip)
// ===================================
document.querySelectorAll('.gallery-card').forEach(card => {
  const inner = card.querySelector('.gallery-flip-inner');
  if (!inner) return;

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!card.contains(e.target)) {
      card.classList.remove('flipped');
    }
  });
});

// ===================================
// PRELOADER + GSAP HERO ENTRANCE
// ===================================
gsap.registerPlugin(ScrollTrigger);

function initHeroGSAP() {
  // Hero elements entrance after preloader
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-bg-img', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 })
    .fromTo('.gsap-hero-eyebrow', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=1')
    .fromTo('.gsap-hero-line', { opacity: 0, y: 60, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.15 }, '-=0.4')
    .fromTo('.hero-title-deco', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
    .fromTo('.gsap-hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
    .fromTo('.gsap-hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .fromTo('.hero-corner', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.08 }, '-=0.6')
    .fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
}

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloaderBar');
  const pct = document.getElementById('preloaderPct');
  const paths = document.querySelectorAll('.draw-path');

  // Animate SVG line-drawing
  paths.forEach((path, i) => {
    const len = path.getTotalLength ? path.getTotalLength() : 100;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      delay: 0.3 + i * 0.15,
      ease: 'power2.out'
    });
  });

  // Loading bar progress
  gsap.to(bar, {
    width: '100%',
    duration: 1.8,
    ease: 'power1.inOut',
    onUpdate: function() {
      const val = Math.round(this.progress() * 100);
      if (pct) pct.textContent = val + '%';
    }
  });

  // Brand name entrance
  gsap.fromTo('.preloader-brand', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
  gsap.fromTo('.preloader-tagline', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.9 });

  // Fade out preloader after ~2.2s
  setTimeout(() => {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        initHeroGSAP();
      }
    });
  }, 2200);
});

// Cleanup on unload
window.addEventListener('beforeunload', () => {
  if (rafId) cancelAnimationFrame(rafId);
});
