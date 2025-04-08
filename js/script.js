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
    
    // WhatsApp Contact Form Integration with Location Support
    const whatsappBtn = document.getElementById('whatsappSubmitBtn');
    if (whatsappBtn) {
        // Use the WhatsApp phone number you want to receive messages to
        const whatsappNumber = '201157299077'; // WhatsApp number with country code but no + sign
        
        // Location access controls
        let userLocation = null;
        const locationCheckbox = document.getElementById('includeLocation');
        const locationStatusDiv = document.getElementById('locationStatus');
        
        // Initialize location status text
        function updateLocationStatusText(status, isError = false) {
            if (!locationStatusDiv) return;
            
            locationStatusDiv.style.display = 'block';
            locationStatusDiv.textContent = status;
            locationStatusDiv.className = `small mt-1 ${isError ? 'text-danger' : 'text-muted'}`;
        }
        
        // Event listener for location checkbox
        if (locationCheckbox && locationStatusDiv) {
            locationCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Request location when checkbox is checked
                    updateLocationStatusText(currentLang === 'en' ? 'Requesting location access...' : 'جاري طلب الوصول إلى الموقع...');
                    
                    if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(
                            // Success callback
                            (position) => {
                                userLocation = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    accuracy: position.coords.accuracy
                                };
                                updateLocationStatusText(
                                    currentLang === 'en' 
                                        ? 'Location accessed successfully!' 
                                        : 'تم الوصول إلى الموقع بنجاح!'
                                );
                                console.log('Location obtained:', userLocation);
                            },
                            // Error callback
                            (error) => {
                                console.error('Geolocation error:', error);
                                let errorMessage = '';
                                
                                if (currentLang === 'en') {
                                    switch(error.code) {
                                        case error.PERMISSION_DENIED:
                                            errorMessage = 'Location access denied. Please enable location permission in your browser settings.';
                                            break;
                                        case error.POSITION_UNAVAILABLE:
                                            errorMessage = 'Location information is unavailable.';
                                            break;
                                        case error.TIMEOUT:
                                            errorMessage = 'Location request timed out.';
                                            break;
                                        default:
                                            errorMessage = 'Unknown error occurred while getting location.';
                                    }
                                } else {
                                    // Arabic error messages
                                    switch(error.code) {
                                        case error.PERMISSION_DENIED:
                                            errorMessage = 'تم رفض الوصول إلى الموقع. يرجى تمكين إذن الموقع في إعدادات المتصفح.';
                                            break;
                                        case error.POSITION_UNAVAILABLE:
                                            errorMessage = 'معلومات الموقع غير متوفرة.';
                                            break;
                                        case error.TIMEOUT:
                                            errorMessage = 'انتهت مهلة طلب الموقع.';
                                            break;
                                        default:
                                            errorMessage = 'حدث خطأ غير معروف أثناء الحصول على الموقع.';
                                    }
                                }
                                
                                updateLocationStatusText(errorMessage, true);
                                // Uncheck the box if location access fails
                                locationCheckbox.checked = false;
                            },
                            // Options
                            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                        );
                    } else {
                        // Geolocation not supported
                        updateLocationStatusText(
                            currentLang === 'en' 
                                ? 'Geolocation is not supported by your browser.' 
                                : 'تحديد الموقع الجغرافي غير مدعوم من متصفحك.',
                            true
                        );
                        locationCheckbox.checked = false;
                    }
                } else {
                    // Checkbox unchecked - clear saved location
                    userLocation = null;
                    locationStatusDiv.style.display = 'none';
                }
            });
        }
        
        // Main WhatsApp send button event
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('WhatsApp button clicked');
            
            try {
                // Get form values directly
                const name = document.getElementById('contactName').value.trim();
                const email = document.getElementById('contactEmail').value.trim();
                const subject = document.getElementById('contactSubject').value.trim();
                const message = document.getElementById('contactMessage').value.trim();
                const includeLocation = locationCheckbox ? locationCheckbox.checked : false;
                
                // Debug form values
                console.log('Form values:', { name, email, subject, message, includeLocation });
                
                // Validate form
                if (!name || !email || !message) {
                    alert(currentLang === 'en' ? 'Please fill all required fields.' : 'يرجى ملء جميع الحقول المطلوبة.');
                    return;
                }
                
                // Check if location was requested but not available
                if (includeLocation && !userLocation) {
                    // Trying to get location again
                    if ('geolocation' in navigator) {
                        const locationPrompt = currentLang === 'en' 
                            ? 'Getting your location... Please wait.' 
                            : 'جاري الحصول على موقعك... يرجى الانتظار.';
                            
                        alert(locationPrompt);
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                userLocation = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    accuracy: position.coords.accuracy
                                };
                                // Call sendWhatsAppMessage again after getting location
                                sendWhatsAppMessage(name, email, subject, message, userLocation);
                            },
                            (error) => {
                                console.error('Geolocation error on send:', error);
                                const proceed = confirm(currentLang === 'en' 
                                    ? 'Could not access your location. Do you want to proceed without including location?' 
                                    : 'لم نتمكن من الوصول إلى موقعك. هل تريد المتابعة بدون تضمين الموقع؟');
                                
                                if (proceed) {
                                    // User wants to proceed without location
                                    sendWhatsAppMessage(name, email, subject, message, null);
                                }
                            }
                        );
                        return;
                    } else {
                        // Geolocation not supported but user wants to include location
                        const proceed = confirm(currentLang === 'en' 
                            ? 'Your browser does not support geolocation. Do you want to proceed without including location?' 
                            : 'متصفحك لا يدعم تحديد الموقع الجغرافي. هل تريد المتابعة بدون تضمين الموقع؟');
                        
                        if (!proceed) return;
                        // Continue without location if user confirms
                    }
                }
                
                // Send WhatsApp message with optional location
                sendWhatsAppMessage(name, email, subject, message, includeLocation ? userLocation : null);
                
            } catch (error) {
                console.error('Error in WhatsApp sending:', error);
                alert('An error occurred when trying to send via WhatsApp.');
            }
        });
        
        // Function to format and send WhatsApp message
        function sendWhatsAppMessage(name, email, subject, message, locationData) {
            // Format WhatsApp message
            let whatsappMessage = 
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                (subject ? `Subject: ${subject}\n` : '') +
                `Message: ${message}`;
            
            // Add location if available
            if (locationData) {
                const locationUrl = `https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}&z=15`;
                whatsappMessage += `\n\nLocation: ${locationUrl}\n` +
                                   `Coordinates: ${locationData.latitude}, ${locationData.longitude}\n` +
                                   `Accuracy: ~${Math.round(locationData.accuracy)} meters`;
            }
            
            // Create WhatsApp URL with international format
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
            console.log('Opening WhatsApp URL:', whatsappUrl);
            
            // Set up the manual fallback link
            const fallbackDiv = document.getElementById('whatsappFallback');
            const manualLink = document.getElementById('manualWhatsappLink');
            
            if (fallbackDiv && manualLink) {
                manualLink.href = whatsappUrl;
                fallbackDiv.style.display = 'block';
            }
            
            try {
                // Open WhatsApp directly
                window.location.href = whatsappUrl;
                
                // Reset form after a delay to ensure the navigation has started
                setTimeout(() => {
                    const form = document.getElementById('whatsappContactForm');
                    if (form) form.reset();
                    if (locationStatusDiv) locationStatusDiv.style.display = 'none';
                    userLocation = null;
                }, 500);
            } catch (e) {
                console.error('Error redirecting to WhatsApp:', e);
                alert('Please use the manual link below the form to send your message via WhatsApp.');
            }
        }
    } else {
        console.error('WhatsApp submit button not found!');
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
