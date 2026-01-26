// ===== HAMBURGER MENU FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===== SERVICE BUTTON HANDLERS =====
function handleService(serviceType) {
    const services = {
        prescription: {
            title: 'Prescription Verification',
            message: 'Please submit your prescription image or document via WhatsApp for our pharmacists to review.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        },
        consultancy: {
            title: 'Pharmacist Consultancy',
            message: 'Schedule a consultation with our pharmacists. Click to message us your details.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        },
        inquiry: {
            title: 'Drug Inquiries',
            message: 'Ask any questions about medications. Our team will respond quickly.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        },
        refill: {
            title: 'Medication Refills',
            message: 'Request your medication refills. Contact us with your prescription details.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        },
        otc: {
            title: 'OTC Products',
            message: 'Browse our over-the-counter products and get recommendations.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        },
        wellness: {
            title: 'Health & Wellness',
            message: 'Get personalized health and wellness guidance from our experts.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        },
        contact: {
            title: 'Contact Us',
            message: 'Call us or WhatsApp for immediate assistance.',
            action: () => window.open('https://wa.me/256701404970', '_blank')
        }
    };

    const service = services[serviceType];
    if (service) {
        alert(`${service.title}\n\n${service.message}`);
        service.action();
    }
}

// ===== FLOATING ICONS ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===== FEATURE ICONS HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'bounce 0.6s ease';
            }, 10);
        });
    });
});

// ===== SERVICE CARD MOUSE TRACKING =====
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== KEYBOARD NAVIGATION =====
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

// ===== BUTTON CLICK ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.btn-service, .btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!btn.classList.contains('no-animation')) {
                const originalContent = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                this.disabled = true;

                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = false;
                }, 1500);
            }
        });
    });
});

// ===== ADD RIPPLE CSS IF NOT ALREADY PRESENT =====
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

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            25% {
                transform: translateY(-8px);
            }
            50% {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
