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
    
    // Add placeholder images to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const placeholderImages = [
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1570586437263-ab629fcc86cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ];
    
    galleryItems.forEach((item, index) => {
        if (index < placeholderImages.length) {
            item.style.backgroundImage = `url(${placeholderImages[index]})`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
        }
    });
    
    // Additional functionality for About page
    function initAboutPage() {
        // Add active class to current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
        
        // Animation for timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        function checkScroll() {
            timelineItems.forEach(item => {
                const position = item.getBoundingClientRect();
                
                // If item is in viewport
                if(position.top < window.innerHeight - 100 && position.bottom >= 0) {
                    item.style.opacity = 1;
                    item.style.transform = 'translateX(0)';
                }
            });
        }
        
        // Set initial state for animation
        if (timelineItems.length > 0) {
            timelineItems.forEach(item => {
                item.style.opacity = 0;
                if(window.getComputedStyle(item).getPropertyValue('text-align') === 'right') {
                    item.style.transform = 'translateX(-50px)';
                } else {
                    item.style.transform = 'translateX(50px)';
                }
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Check scroll on load and scroll
            window.addEventListener('load', checkScroll);
            window.addEventListener('scroll', checkScroll);
            checkScroll(); // Initial check
        }
    }
    
    // Additional functionality for Services page
    function initServicesPage() {
        // Add active class to current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
        
        // FAQ toggle functionality if on services page
        if (currentPage === 'services.html' || window.location.pathname.endsWith('services.html')) {
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
            
            // Service card animation on scroll
            const serviceCards = document.querySelectorAll('.service-card');
            
            function animateCards() {
                serviceCards.forEach((card, index) => {
                    const position = card.getBoundingClientRect();
                    
                    if (position.top < window.innerHeight - 100) {
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                });
            }
            
            // Set initial state for animation
            if (serviceCards.length > 0) {
                serviceCards.forEach(card => {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(50px)';
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                });
                
                // Check scroll on load and scroll
                window.addEventListener('load', animateCards);
                window.addEventListener('scroll', animateCards);
                animateCards(); // Initial check
            }
        }
    }
    
    // Additional functionality for Gallery page
    function initGalleryPage() {
        // Add active class to current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
        
        // Initialize filter buttons if on gallery page
        if (currentPage === 'gallery.html' || window.location.pathname.endsWith('gallery.html')) {
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
            
            // Modal functionality
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
        }
    }
    
    // Initialize page-specific functionality
    initAboutPage();
    initServicesPage();
    initGalleryPage();
});