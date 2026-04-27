import { catalog } from './data.js';

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  grid.innerHTML = catalog.map(item => `
    <div class="catalog-card reveal">
      <img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="overlay"></div>
      <div class="badge">${item.badge}</div>
      <div class="arrow">
        <i data-lucide="arrow-right" class="w-4 h-4 text-white"></i>
      </div>
      <div class="content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');
}

function initAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('.fade-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
  
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}

function initForm() {
  const form = document.getElementById('leadForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const txt = document.getElementById('submitText');
    const original = txt.textContent;
    
    txt.textContent = 'Отправляем...';
    btn.disabled = true;
    
    setTimeout(() => {
      txt.textContent = '✓ Заявка отправлена';
      btn.classList.add('bg-green-600');
      form.reset();
      setTimeout(() => {
        txt.textContent = original;
        btn.classList.remove('bg-green-600');
        btn.disabled = false;
      }, 3000);
    }, 800);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  initAnimations();
  initForm();
  initSmoothScroll();
});
