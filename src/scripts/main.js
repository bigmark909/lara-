// ===== JSConfetti - Confetti Effect =====
// Simple confetti implementation without external library
class ConfettiEffect {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'confetti-canvas';
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(options = {}) {
    const count = options.count || 80;
    const colors = options.colors || ['#2563EB', '#1B2D54', '#DC2626', '#F59E0B', '#10B981', '#ffffff'];
    const x = options.x || this.canvas.width / 2;
    const y = options.y || this.canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 200 + Math.random() * 400;
      const size = 6 + Math.random() * 10;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 200,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    if (!this.animationId) {
      this.animate();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let alive = false;
    for (const p of this.particles) {
      p.x += p.vx * 0.016;
      p.y += p.vy * 0.016;
      p.vy += 500 * 0.016; // gravity
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.005;

      if (p.opacity <= 0) continue;
      alive = true;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.particles = this.particles.filter(p => p.opacity > 0);

    if (alive) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// Initialize confetti
const confetti = new ConfettiEffect();

// ===== Header Scroll Effect =====
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = scrollY;

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    if (scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

// ===== Mobile Hamburger Menu =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
});

animateElements.forEach(el => observer.observe(el));

// ===== Gallery Lightbox =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4')?.textContent || '';
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${img.src}" alt="${img.alt}">
        ${title ? `<p class="lightbox-caption">${title}</p>` : ''}
      </div>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
        overlay.remove();
        document.body.style.overflow = '';
      }
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Trigger confetti on gallery view
    confetti.fire({ count: 30 });

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('active'));
  });
});

// Lightbox styles
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 40px;
  }
  .lightbox.active { opacity: 1; }
  .lightbox-content {
    position: relative;
    max-width: 900px;
    width: 100%;
    max-height: 85vh;
  }
  .lightbox-content img {
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
  }
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    transition: transform 0.2s;
  }
  .lightbox-close:hover { transform: rotate(90deg); }
  .lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 12px;
    font-size: 1.1rem;
    opacity: 0.8;
  }
`;
document.head.appendChild(lightboxStyles);

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value,
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    // Show success state
    const form = e.target;
    const successEl = document.getElementById('form-success');
    form.style.display = 'none';
    successEl.classList.add('show');

    // Fire confetti
    confetti.fire({ count: 100 });

    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData);
  });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Hero Confetti on Load =====
window.addEventListener('load', () => {
  setTimeout(() => {
    confetti.fire({ count: 50, colors: ['#2563EB', '#1B2D54', '#ffffff', '#DC2626'] });
  }, 1000);
});

// ===== Header CTA Confetti =====
document.querySelectorAll('.confetti-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    confetti.fire({
      count: 60,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  });
});

// ===== Initialize =====
console.log('Lara & Sons Differentials & 4x4 - Website loaded');