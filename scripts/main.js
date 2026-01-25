/* ============================================
   MEDILINE PHARMACY - MAIN JAVASCRIPT
   Mobile Navigation & Scroll Animations
   ============================================ */

// ============================================
// MOBILE NAVIGATION
// ============================================

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ============================================
// SCROLL ANIMATIONS - FADE IN ON VIEWPORT
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards on load
document.querySelectorAll(".service-card, .trust-card, .branch-card").forEach((card) => {
  observer.observe(card);
});

// ============================================
// HEADER SHADOW ON SCROLL
// ============================================

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// RESIZE OPTIMIZATION
// ============================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }, 250)
);

// ============================================
// PERFORMANCE OPTIMIZATION - LAZY LOAD IMAGES
// ============================================

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("[v0] Mediline Pharmacy website loaded successfully!");
