// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const faqItems = document.querySelectorAll('.faq-item');

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    // Get all links that point to sections on the page (starting with #)
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');
    
    allInternalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Skip empty hrefs or just #
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault(); // Prevent URL change
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Tab Functionality
function initTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// FAQ Accordion
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-card, .screenshot-card, .security-card, .pricing-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter Animation for Statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
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
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Form Validation and Submission
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'activity', 'city'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Validate checkboxes
            const consent1 = document.getElementById('consent1');
            const consent2 = document.getElementById('consent2');
            
            if (!consent1.checked || !consent2.checked) {
                isValid = false;
                alert('Lütfen tüm onay kutularını işaretleyin.');
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Gönderiliyor...';
                submitBtn.disabled = true;
                
                // Send email using EmailJS
                if (window.MailService && window.MailService.checkEmailJSStatus()) {
                    window.MailService.sendContactForm(data)
                        .then(result => {
                            if (result.success) {
                                showSuccessMessage();
                                contactForm.reset();
                            } else {
                                showErrorMessage(result.message);
                            }
                        })
                        .catch(error => {
                            console.error('Form gönderim hatası:', error);
                            showErrorMessage('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
                        })
                        .finally(() => {
                            // Reset button state
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        });
                } else {
                    // Fallback: show success message without sending email
                    console.warn('EmailJS yüklenmedi, sadece başarı mesajı gösteriliyor');
                    showSuccessMessage();
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            } else {
                alert('Lütfen tüm gerekli alanları doldurun.');
            }
        });
    }
}

// Show error message
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Hata!</h3>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    errorMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const errorContent = errorMessage.querySelector('.error-content');
    errorContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
        border-left: 4px solid #e74c3c;
    `;
    
    errorContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: #e74c3c;
        margin-bottom: 1rem;
    `;
    
    errorContent.querySelector('h3').style.cssText = `
        color: #1F2937;
        margin-bottom: 1rem;
    `;
    
    errorContent.querySelector('p').style.cssText = `
        color: #4B5563;
        margin-bottom: 0;
    `;
    
    document.body.appendChild(errorMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (document.body.contains(errorMessage)) {
            document.body.removeChild(errorMessage);
        }
    }, 5000);
    
    // Close on click
    errorMessage.addEventListener('click', () => {
        if (document.body.contains(errorMessage)) {
            document.body.removeChild(errorMessage);
        }
    });
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Teşekkürler!</h3>
            <p>Bilgileriniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.</p>
        </div>
    `;
    
    // Add styles
    successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
    `;
    
    successContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: #2E7D32;
        margin-bottom: 1rem;
    `;
    
    successContent.querySelector('h3').style.cssText = `
        color: #1F2937;
        margin-bottom: 1rem;
    `;
    
    successContent.querySelector('p').style.cssText = `
        color: #4B5563;
        margin-bottom: 0;
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 3000);
    
    // Close on click
    successMessage.addEventListener('click', () => {
        document.body.removeChild(successMessage);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Back to Top Button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Video Modal Functionality
function initVideoModal() {
    const demoBtn = document.getElementById('demoBtn');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const demoVideo = document.getElementById('demoVideo');
    const demoIframe = document.getElementById('demoIframe');

    // Normalize any YouTube URL (youtu.be / watch?v=) to embeddable form
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        try {
            // youtu.be/<id>
            const shortIdx = url.indexOf('youtu.be/');
            if (shortIdx !== -1) {
                const id = url.substring(shortIdx + 'youtu.be/'.length).split(/[?&#]/)[0];
                return id ? `https://www.youtube.com/embed/${id}` : url;
            }
            // youtube.com/watch?v=<id>
            const watchIdx = url.indexOf('/watch');
            if (watchIdx !== -1) {
                const query = url.split('?')[1] || '';
                const params = new URLSearchParams(query);
                const id = params.get('v');
                return id ? `https://www.youtube.com/embed/${id}` : url;
            }
            // Already embed or something else
            return url;
        } catch {
            return url;
        }
    };

    // Determine and enforce base src (support lazy loading with data-src)
    let iframeBaseSrc = '';
    if (demoIframe) {
        const srcAttr = demoIframe.getAttribute('data-src') || demoIframe.getAttribute('src');
        iframeBaseSrc = getYouTubeEmbedUrl(srcAttr);
    }

    if (demoBtn && videoModal) {
        // Open modal
        demoBtn.addEventListener('click', () => {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            // Autoplay YouTube iframe if present
            if (demoIframe && iframeBaseSrc) {
                const separator = iframeBaseSrc.includes('?') ? '&' : '?';
                demoIframe.src = `${iframeBaseSrc}${separator}autoplay=1`;
            }
        });

        // Close modal functions
        const closeModal = () => {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
            if (demoVideo) {
                demoVideo.pause(); // Pause local video if present
            }
            if (demoIframe && iframeBaseSrc) {
                // Reset iframe src to stop playback
                demoIframe.src = iframeBaseSrc;
            }
        };

        // Close on X button
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close on overlay click
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

// Initialize all functions when DOM is loaded
function initializeApp() {
    initSmoothScroll();
    initNavbarScroll();
    initMobileMenu();
    initTabs();
    initFAQ();
    initScrollAnimations();
    initCounterAnimation();
    initParallax();
    initFormValidation();
    initLazyLoading();
    initBackToTop();
    initVideoModal();
    // initTypingAnimation(); // Uncomment if you want typing animation
}

// Handle both defer and normal script loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM already loaded (defer scripts)
    initializeApp();
}

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    .back-to-top:hover {
        background-color: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
