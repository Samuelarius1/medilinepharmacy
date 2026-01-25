/* ============================================
   MEDILINE PHARMACY - MAIN JAVASCRIPT
   Mobile Navigation & 3D Hero Effects
   ============================================ */

// ============================================
// MOBILE NAVIGATION
// ============================================

const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// ============================================
// 3D HERO IMAGE PARALLAX EFFECT
// ============================================

const heroImage = document.getElementById("heroImage")
const heroImagePlaceholder = document.querySelector(".hero-image-placeholder")

if (window.innerWidth > 768) {
  heroImage.addEventListener("mousemove", (e) => {
    const rect = heroImage.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    const rotateY = ((x - rect.width / 2) / rect.width) * 15
    const rotateX = -((y - rect.height / 2) / rect.height) * 15

    heroImagePlaceholder.style.setProperty("--rotateX", `${rotateX}deg`)
    heroImagePlaceholder.style.setProperty("--rotateY", `${rotateY}deg`)
    heroImagePlaceholder.classList.add("tilted")
  })

  heroImage.addEventListener("mouseleave", () => {
    heroImagePlaceholder.style.setProperty("--rotateX", "0deg")
    heroImagePlaceholder.style.setProperty("--rotateY", "0deg")
    heroImagePlaceholder.classList.remove("tilted")
  })
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ============================================
// SCROLL ANIMATIONS - FADE IN ON VIEWPORT
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe service cards and trust cards on initial load
document.querySelectorAll(".service-card, .trust-card, .branch-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  observer.observe(card)
})

// ============================================
// HEADER STICKY SHADOW ON SCROLL
// ============================================

const header = document.querySelector(".header")
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)"
  } else {
    header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)"
  }
})

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for smooth events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimize resize listener
window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }, 250),
)
