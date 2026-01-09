// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize counters
    initCounters();
    
    // Initialize portfolio filtering
    initPortfolioFilter();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize progress bars
    initProgressBars();
});

// Initialize animations
function initAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        { selector: '.hero-text', animation: 'animate-fade-left' },
        { selector: '.hero-image', animation: 'animate-fade-right' },
        { selector: '.section-title', animation: 'animate-fade-up' },
        { selector: '.skill-card', animation: 'hidden' },
        { selector: '.portfolio-item', animation: 'hidden' },
        { selector: '.contact-info', animation: 'hidden' },
        { selector: '.contact-form', animation: 'hidden' },
        { selector: '.about-text', animation: 'hidden' },
        { selector: '.about-image', animation: 'hidden' }
    ];
    
    animatedElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(el => {
            if (item.animation === 'hidden') {
                el.classList.add('hidden');
            } else {
                el.classList.add(item.animation);
            }
        });
    });
}

// Initialize counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize portfolio filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize contact form - UPDATED FOR FORMSPREE
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            if (formMessage) {
                formMessage.style.display = 'none';
            }
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    if (formMessage) {
                        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        formMessage.style.color = '#155724';
                        formMessage.style.backgroundColor = '#d4edda';
                        formMessage.style.padding = '10px';
                        formMessage.style.borderRadius = '4px';
                        formMessage.style.display = 'block';
                    } else {
                        alert('Thank you! Your message has been sent successfully.');
                    }
                    
                    // Reset form
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                if (formMessage) {
                    formMessage.textContent = 'Oops! There was an error sending your message. Please try again.';
                    formMessage.style.color = '#721c24';
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.padding = '10px';
                    formMessage.style.borderRadius = '4px';
                    formMessage.style.display = 'block';
                } else {
                    alert('Error sending message. Please try again.');
                }
                console.error('Form submission error:', error);
            } finally {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Scroll to message
                if (formMessage && formMessage.style.display === 'block') {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
}

// Initialize mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = this.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Animate progress bars
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const width = progressBar.getAttribute('data-width');
                        setTimeout(() => {
                            progressBar.style.width = `${width}%`;
                            progressBar.classList.add('progress-animate');
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with 'hidden' class
    document.querySelectorAll('.hidden').forEach(el => {
        observer.observe(el);
    });
}

// Initialize progress bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        // Set the final width as a data attribute for animation
        bar.setAttribute('data-final-width', width);
        
        // Set the text
        const progressText = bar.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${width}%`;
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add some interactive effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('hover-grow');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('hover-grow');
    });
});

// Add wave animation to greeting
const greeting = document.querySelector('.greeting');
if (greeting) {
    greeting.innerHTML = greeting.innerHTML.replace('Konnichiwa', '<span class="animate-wave">Konnichiwa</span>');
}
