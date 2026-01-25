/** @format */

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";

            fetch("contact.php", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        errorMessage.style.display = "none";
                        successMessage.style.display = "block";
                        contactForm.reset();

                        setTimeout(() => {
                            successMessage.style.display = "none";
                        }, 5000);
                    } else {
                        successMessage.style.display = "none";
                        errorMessage.style.display = "block";
                        errorMessage.querySelector("p").textContent = data.message || "Please try again or contact us directly";

                        setTimeout(() => {
                            errorMessage.style.display = "none";
                        }, 5000);
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                    successMessage.style.display = "none";
                    errorMessage.style.display = "block";

                    setTimeout(() => {
                        errorMessage.style.display = "none";
                    }, 5000);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                });
        });
    }

    const directionsBtn = document.getElementById("directionsBtn");
    if (directionsBtn) {
        directionsBtn.addEventListener("click", function () {
            window.open(
                "https://www.google.com/maps/search/Pension+Mall+Kyaliwajjala+Trading+Centre+Wakiso",
                "_blank",
            );
        });
    }
});         this.style.transform = 'translateY(-4px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });

    // Feature items hover effects
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'iconBounce 0.6s ease';
            }, 10);
        });
    });

    // Floating icons animation enhancement
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        });

        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 600);
        });
    });

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading spinner animation to check actions
    const actionButtons = document.querySelectorAll('.btn-service, .cta-buttons .btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-service, .cta-buttons .btn')) return;

            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = originalContent;
                this.disabled = false;
            }, 1500);
        });
    });
});

// Ripple effect function
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation for stats (if needed)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrollY = window.scrollY;
        heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// Add ripple CSS if not already in stylesheet
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll-triggered counter animations
const scrollTrigger = (element, callback) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(element);
};

// Mouse tracking effect for cards (subtle glow follow)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(6, 182, 212, 0.05) 0%, white 100%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'white';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});
