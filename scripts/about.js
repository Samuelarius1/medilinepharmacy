// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.slide-in-left, .slide-in-right, .fade-in-up, .mvv-card, .branch-card, .trust-item'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Add hover effects to cards
  addCardInteractivity();
  
  // Parallax effect for hero section
  addHeroParallax();
});

// Interactive card effects
function addCardInteractivity() {
  const cards = document.querySelectorAll('.mvv-card, .branch-card, .trust-item');
  
  cards.forEach(card => {
    // Mouse enter
    card.addEventListener('mouseenter', function() {
      this.style.transform = this.style.transform || '';
      const rect = this.getBoundingClientRect();
      
      // Add ripple effect
      createRipple(this, event);
    });

    // Mouse move for tilt effect
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Mouse leave
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// Create ripple effect on card click
function createRipple(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.position = 'absolute';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.background = 'rgba(22, 163, 74, 0.6)';
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'ripple 0.6s ease-out';
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Parallax effect for hero
function addHeroParallax() {
  const heroSection = document.querySelector('.about-hero');
  
  if (!heroSection) return;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroOverlay = heroSection.querySelector('.about-hero-overlay');
    
    if (heroOverlay) {
      heroOverlay.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
    
    // Parallax for hero content
    const heroContent = heroSection.querySelector('.about-hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
}

// Count animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll-to-top functionality
function addScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #16a34a, #059669);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
    transition: all 0.3s ease;
    z-index: 999;
  `;
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

// Initialize scroll to top button
addScrollToTop();

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll(
  '.story-content, .story-image, .leadership-card'
);

fadeElements.forEach(el => {
  observer.observe(el);
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripples = this.querySelectorAll('.ripple');
    ripples.forEach(ripple => ripple.remove());
    
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});
