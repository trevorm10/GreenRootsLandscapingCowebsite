// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Sticky header functionality
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.padding = '0.5rem 0';
            } else {
                header.style.boxShadow = 'none';
                header.style.padding = '1rem 0';
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = 0;
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Modal functionality for gallery
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        
        let currentImageIndex = 0;
        const images = Array.from(galleryItems);
        
        // Function to open modal with specific image
        function openModal(index) {
            currentImageIndex = index;
            const imageSrc = images[index].querySelector('img').src;
            const imageAlt = images[index].querySelector('img').alt;
            const imageTitle = images[index].querySelector('h3').textContent;
            const imageDesc = images[index].querySelector('p').textContent;
            
            modalImage.src = imageSrc;
            modalImage.alt = imageAlt;
            modalCaption.innerHTML = `<h3>${imageTitle}</h3><p>${imageDesc}</p>`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        
        // Add click event to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openModal(index);
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Navigate to previous image
        modalPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            openModal(currentImageIndex);
        });
        
        // Navigate to next image
        modalNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            openModal(currentImageIndex);
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    openModal(currentImageIndex);
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    openModal(currentImageIndex);
                }
            }
        });
    }
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Animation for elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .value-card, .team-member, .timeline-item');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if (position.top < window.innerHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .value-card, .team-member, .timeline-item');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check scroll on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});
// ===== PART 3 ADDITIONS - INTERACTIVE FEATURES =====
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Add mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const nav = document.querySelector('nav');
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            nav.appendChild(mobileBtn);
            
            mobileBtn.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.toggle('active');
                this.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            });
        }

        // Initialize Part 3 features
        initAccordions();
        initModals();
        initLightbox();
        initFormValidation();
        initSearch();
        initMap();
        initAnimations();
    });

    // Accordion Functionality
    function initAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isActive = content.classList.contains('active');
                
                // Close all accordions
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open current one if it wasn't active
                if (!isActive) {
                    content.classList.add('active');
                }
            });
        });
    }

    // Modal Functionality
    function initModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const closeButtons = document.querySelectorAll('.close-modal');
        
        // Open modal
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }

    // Lightbox Gallery
    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.querySelector('.lightbox');
        
        if (!lightbox) return;
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Form Validation
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-form]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm(this)) {
                    submitForm(this);
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });
        });
    }

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
        
        clearError(field);
        return true;
    }

    function showError(field, message) {
        clearError(field);
        field.style.borderColor = '#ff4444';
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function submitForm(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        const formType = form.getAttribute('data-form');
        
        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage(form, formType);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }

    function showSuccessMessage(form, formType) {
        let message = 'Thank you for your message! We will get back to you soon.';
        
        if (formType === 'enquiry') {
            message = 'Thank you for your enquiry! We will provide you with cost details and availability within 24 hours.';
        }
        
        let successElement = form.querySelector('.success-message');
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'success-message';
            form.insertBefore(successElement, form.firstChild);
        }
        
        successElement.textContent = message;
        successElement.style.display = 'block';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    }

    // Search Functionality
    function initSearch() {
        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;
        
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.service-card, .project-item');
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Map Functionality (Leaflet.js)
   function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Cape Town coordinates - Green Street, Gardens
    const capeTownCoords = [-33.9280, 18.4125];
    const map = L.map('map').setView(capeTownCoords, 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add custom icon
    const greenIcon = L.divIcon({
        html: '<i class="fas fa-map-marker-alt" style="color: #2e8b57; font-size: 30px;"></i>',
        iconSize: [30, 30],
        className: 'green-marker'
    });
    
    // Add marker with popup and directions link
    const marker = L.marker(capeTownCoords, {icon: greenIcon}).addTo(map);
    marker.bindPopup(`
        <div style="text-align: center;">
            <h4>GreenRoots Landscaping</h4>
            <p>123 Green Street, Gardens<br>Cape Town, 8001</p>
            <a href="https://www.google.com/maps/dir//123+Green+Street+Gardens+Cape+Town+8001" 
               target="_blank" 
               style="background: #2e8b57; color: white; padding: 8px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
               Get Directions
            </a>
        </div>
    `).openPopup();
    
    // Add click event to marker
    marker.on('click', function() {
        window.open('https://www.google.com/maps/dir//123+Green+Street+Gardens+Cape+Town+8001', '_blank');
    });
}


    // Scroll Animations
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

})();