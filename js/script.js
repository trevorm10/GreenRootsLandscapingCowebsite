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

    // Mobile Menu Toggle
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

    // ... rest of the functions (initModals, initLightbox, etc.) ...

})();