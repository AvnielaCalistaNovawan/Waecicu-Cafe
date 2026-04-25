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
const isMobile = window.matchMedia('(max-width: 768px)').matches;

const handleParallax = () => {
  if (isMobile) return;
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
// GALLERY CARD HOVER EFFECT (subtle scale via CSS)
// ===================================

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
if (!isMobile) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroEl = document.querySelector('.hero');
    const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
    const progress = Math.min(scrollY / heroHeight, 1);
    vines.forEach(vine => {
      vine.style.opacity = 0.4 - progress * 0.35;
      vine.style.transform = vine.classList.contains('vine-right')
        ? `scaleX(-1) translateY(${scrollY * 0.06}px)`
        : `translateY(${scrollY * 0.06}px)`;
    });
  }, { passive: true });
}

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
// GALLERY CLICK (handled by modal below)
// ===================================

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
// ===================================
// GALLERY MODAL POPUP
// ===================================
(function() {
  const overlay = document.getElementById('galleryModal');
  const closeBtn = document.getElementById('modalClose');
  if (!overlay) return;

  const modalImg   = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc  = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const modalDets  = document.getElementById('modalDetails');

  function openGalleryModal(card) {
    const title   = card.dataset.title   || '';
    const price   = card.dataset.price   || '';
    const img     = card.dataset.img     || '';
    const desc    = card.dataset.desc    || '';
    const details = card.dataset.details ? JSON.parse(card.dataset.details) : [];

    modalImg.src         = img;
    modalImg.alt         = title;
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;
    modalPrice.textContent = price;

    // Build detail tags
    modalDets.innerHTML = details.map(d => `
      <div class="modal-detail-tag">
        <span class="modal-detail-tag-label">${d.label}</span>
        <span class="modal-detail-tag-value">${d.value}</span>
      </div>
    `).join('');

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Clear img src after transition so there's no flash next open
    setTimeout(() => { modalImg.src = ''; }, 450);
  }

  // Attach to all gallery cards
  document.querySelectorAll('.gallery-card[data-title]').forEach(card => {
    card.addEventListener('click', () => openGalleryModal(card));
  });

  closeBtn.addEventListener('click', closeGalleryModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGalleryModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGalleryModal();
  });
})();

// ===================================
// MENU DETAIL MODAL POPUP
// ===================================
(function() {
  const overlay   = document.getElementById('menuModal');
  const closeBtn  = document.getElementById('menuModalClose');
  if (!overlay) return;

  const modalEmoji    = document.getElementById('menuModalEmoji');
  const modalTitle    = document.getElementById('menuModalTitle');
  const modalPrice    = document.getElementById('menuModalPrice');
  const modalDesc     = document.getElementById('menuModalDesc');
  const modalSections = document.getElementById('menuModalSections');

  function openMenuModal(item) {
    const title    = item.dataset.menuTitle    || '';
    const price    = item.dataset.menuPrice    || '';
    const emoji    = item.dataset.emoji        || '🎂';
    const desc     = item.dataset.menuDesc     || '';
    const sections = item.dataset.menuSections ? JSON.parse(item.dataset.menuSections) : [];

    modalEmoji.textContent  = emoji;
    modalTitle.textContent  = title;
    modalPrice.textContent  = price;
    modalDesc.textContent   = desc;

    // Build sections HTML
    modalSections.innerHTML = sections.map(s => `
      <div class="menu-modal-section">
        <div class="menu-modal-section-header">
          <span class="menu-modal-section-icon">${s.icon}</span>
          <span class="menu-modal-section-label">${s.label}</span>
        </div>
        <ul class="menu-modal-section-items">
          ${s.items.map(it => `<li>${it}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Stagger-animate each section into view
    const sectionEls = modalSections.querySelectorAll('.menu-modal-section');
    sectionEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('section-visible'), 80 + i * 90);
    });
  }

  function closeMenuModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Click on the whole menu-item row → open modal (desktop + mobile)
  document.querySelectorAll('.menu-item[data-menu-title]').forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't trigger if clicking the WhatsApp btn inside a modal
      openMenuModal(item);
    });
  });

  closeBtn.addEventListener('click', closeMenuModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenuModal();
  });
  document.addEventListener('keydown', (e) => {
    // Only close the topmost active modal
    if (e.key === 'Escape') {
      if (overlay.classList.contains('active')) closeMenuModal();
    }
  });
})();
