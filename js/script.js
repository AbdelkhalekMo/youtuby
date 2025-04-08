/**
 * YouTube Services Landing Page
 * Custom JavaScript for enhanced interactivity
 * With multi-language support (English/Arabic)
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize language based on stored preference or default to English
    let currentLang = localStorage.getItem('ytcreator_lang') || 'en';
    
    // Set the initial language on page load
    applyLanguage(currentLang);

    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Toggle navigation menu on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link, .hero-buttons a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            }
        });
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add active class to nav items on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href="#' + sectionId + '"]').classList.add('active');
            } else {
                document.querySelector('.nav-link[href="#' + sectionId + '"]').classList.remove('active');
            }
        });
    });

    // Image handling for portfolio items
    document.querySelectorAll('.img-container img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You would normally send the form data to a server here
            // For this demo, we'll just show a success message
            const formElements = this.elements;
            let isValid = true;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                this.appendChild(successMessage);
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Custom animations for elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Language switcher functionality
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            // Toggle between 'en' and 'ar'
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            
            // Save language preference
            localStorage.setItem('ytcreator_lang', currentLang);
            
            // Apply the language
            applyLanguage(currentLang);
        });
    }
    
    /**
     * Apply language translations to the whole page
     * @param {string} lang - Language code ('en' or 'ar')
     */
    function applyLanguage(lang) {
        // Update language indicator in button
        const langIndicator = document.getElementById('currentLang');
        if (langIndicator) {
            langIndicator.textContent = lang.toUpperCase();
        }
        
        // Apply RTL/LTR direction
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Toggle RTL/LTR specific CSS classes
        document.body.classList.toggle('rtl', lang === 'ar');
        
        // Apply translations to all elements with data-lang-key attribute
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            
            // Check if this is a placeholder translation
            const langType = element.getAttribute('data-lang-type');
            if (langType === 'placeholder') {
                element.placeholder = translations[lang][key] || element.placeholder;
            } else {
                // Regular text content translation
                element.textContent = translations[lang][key] || element.textContent;
            }
        });
        
        // Handle the RTL/LTR specific adjustments
        const adjustRtlSpecifics = () => {
            const navbarNav = document.querySelector('.navbar-nav');
            if (navbarNav) {
                if (lang === 'ar') {
                    navbarNav.classList.remove('ms-auto');
                    navbarNav.classList.add('me-auto');
                } else {
                    navbarNav.classList.remove('me-auto');
                    navbarNav.classList.add('ms-auto');
                }
            }
            
            // Adjust margin classes for RTL/LTR
            document.querySelectorAll('.me-1, .me-2, .me-3, .ms-1, .ms-2, .ms-auto').forEach(el => {
                if (el.classList.contains('me-1') && lang === 'ar') {
                    el.classList.replace('me-1', 'ms-1');
                } else if (el.classList.contains('ms-1') && lang === 'en') {
                    el.classList.replace('ms-1', 'me-1');
                }
                
                if (el.classList.contains('me-2') && lang === 'ar') {
                    el.classList.replace('me-2', 'ms-2');
                } else if (el.classList.contains('ms-2') && lang === 'en') {
                    el.classList.replace('ms-2', 'me-2');
                }
                
                if (el.classList.contains('me-3') && lang === 'ar') {
                    el.classList.replace('me-3', 'ms-3');
                } else if (el.classList.contains('ms-3') && lang === 'en') {
                    el.classList.replace('ms-3', 'me-3');
                }
            });
        };
        
        // Apply RTL/LTR adjustments
        adjustRtlSpecifics();
    }
    
    // YouTube video lazy loading
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const videoIframe = videoContainer.querySelector('iframe');
        
        if (videoIframe) {
            // Only load the video when scrolled into view
            const loadVideo = function() {
                const videoPosition = videoContainer.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (videoPosition < windowHeight - 100) {
                    // Replace src attribute with the one specified in data-src
                    if (videoIframe.hasAttribute('data-src')) {
                        videoIframe.src = videoIframe.getAttribute('data-src');
                        window.removeEventListener('scroll', loadVideo);
                    }
                }
            };
            
            window.addEventListener('scroll', loadVideo);
            loadVideo(); // Run once on load
        }
    }
});
