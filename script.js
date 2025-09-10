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
            
            
            if(position.top < window.innerHeight - 100 && position.bottom >= 0) {
                item.style.opacity = 1;
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    
    if (currentPage === 'aboutus.html' || window.location.pathname.endsWith('aboutus.html')) {
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


document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});
function initGalleryPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    if (currentPage === 'gallery.html' || window.location.pathname.endsWith('gallery.html')) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (filterButtons.length > 0 && galleryItems.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
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
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initGalleryPage();
});