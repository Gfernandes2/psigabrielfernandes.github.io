// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const childName = formData.get('childName');
    const childAge = formData.get('childAge');
    const message = formData.get('message');
    
    // Create email body
    let emailBody = `Olá Gabriel,\n\n`;
    emailBody += `Recebi uma nova mensagem através do seu site:\n\n`;
    emailBody += `Nome do responsável: ${name}\n`;
    emailBody += `E-mail: ${email}\n`;
    if (phone) emailBody += `Telefone: ${phone}\n`;
    if (childName) emailBody += `Nome da criança: ${childName}\n`;
    if (childAge) emailBody += `Idade da criança: ${childAge} anos\n`;
    emailBody += `\nMensagem:\n${message}\n\n`;
    emailBody += `Atenciosamente,\n${name}`;
    
    // Create mailto link
    const subject = encodeURIComponent('Contato através do site - Psicologia Infantil');
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:gabrielferossi@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Mensagem preparada! Seu cliente de e-mail será aberto para envio.', 'success');
    
    // Reset form
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : type === 'error' ? '#e74c3c' : '#4A90E2'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification-close:hover {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .contact-item, .location-card, .feature');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#E8F4FD';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    return isValid;
}

// Add input event listeners for real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#4A90E2';
            } else {
                this.style.borderColor = '#E8F4FD';
            }
        });
    });
});

// WhatsApp integration
function openWhatsApp(message = '') {
    const phone = '5511985849700';
    const defaultMessage = 'Olá! Gostaria de agendar uma consulta para meu filho(a).';
    const finalMessage = message || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// Add click tracking for analytics (if needed)
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track WhatsApp clicks
    if (target.closest('.whatsapp-btn') || target.closest('.whatsapp-float')) {
        console.log('WhatsApp button clicked');
    }
    
    // Track location buttons
    if (target.closest('.location-btn')) {
        console.log('Location button clicked:', target.textContent);
    }
    
    // Track service cards
    if (target.closest('.service-card')) {
        console.log('Service card clicked:', target.closest('.service-card').querySelector('h3').textContent);
    }
});

// Lazy loading for images
// document.addEventListener(\'DOMContentLoaded\', function() {
//     const images = document.querySelectorAll(\'img\');
    
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 img.style.opacity = \'0\';
//                 img.style.transition = \'opacity 0.3s ease\';
                
//                 img.onload = function() {
//                     img.style.opacity = \'1\';
//                 };
                
//                 observer.unobserve(img);
//             }
//         });
//     });
    
//     images.forEach(img => {
//         imageObserver.observe(img);
//     });
// });

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll event
const debouncedScrollHandler = debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);



// Garantir que a imagem do hero seja sempre exibida
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        // Forçar exibição da imagem
        heroImage.style.display = 'block';
        heroImage.style.visibility = 'visible';
        heroImage.style.opacity = '1';
        
        // Verificar se a imagem carregou após um tempo
        setTimeout(function() {
            if (heroImage.naturalWidth === 0 || heroImage.naturalHeight === 0) {
                // Se a imagem não carregou, aplicar fallback
                heroImage.style.background = 'linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%)';
                heroImage.style.minHeight = '300px';
                heroImage.style.display = 'block';
                heroImage.style.borderRadius = '20px';
                heroImage.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                console.log('Fallback aplicado para a imagem do hero');
            }
        }, 2000);
        
        // Listener para erro de carregamento
        heroImage.addEventListener('error', function() {
            this.style.display = 'block';
            this.style.background = 'linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%)';
            this.style.minHeight = '300px';
            this.style.borderRadius = '20px';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            console.log('Erro ao carregar imagem, fallback aplicado');
        });
        
        // Listener para sucesso no carregamento
        heroImage.addEventListener('load', function() {
            this.style.display = 'block';
            this.style.visibility = 'visible';
            this.style.opacity = '1';
            console.log('Imagem do hero carregada com sucesso');
        });
    }
});

