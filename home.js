/**
 * Mahankal English Medium School - Home Page Scripts
 * Handles numerical counter animations, testimonials slider, and gallery filtering
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. STATS COUNTER ANIMATION (RUNS WHEN VISIBLE)
    const statsGrid = document.querySelector('.stats-grid');
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statsGrid && statNumbers.length > 0) {
        let animated = false;

        const countUp = (element) => {
            const target = parseInt(element.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Ease out quad formula for natural deceleration
                const easeProgress = progress * (2 - progress);
                
                const currentValue = Math.floor(easeProgress * target);
                element.textContent = currentValue + (target === 25 ? '' : '+'); // Add + except for Years of Excellence

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = target + '+';
                }
            };

            requestAnimationFrame(updateCount);
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    statNumbers.forEach(num => countUp(num));
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsGrid);
    }

    // 2. TESTIMONIALS SLIDER CAROUSEL
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (carouselTrack && slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let autoplayInterval;

        // Create Indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = document.querySelectorAll('.carousel-indicator');

        const updateIndicators = () => {
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === currentIndex);
            });
        };

        const goToSlide = (index) => {
            // Apply bounds
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            // Translate track
            const offset = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;
            updateIndicators();
        };

        const nextSlide = () => {
            goToSlide(currentIndex + 1);
        };

        const prevSlide = () => {
            goToSlide(currentIndex - 1);
        };

        // Click Events
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }

        // Autoplay
        const startAutoplay = () => {
            autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
        };

        const resetAutoplay = () => {
            clearInterval(autoplayInterval);
            startAutoplay();
        };

        // Start autoplay initially
        startAutoplay();

        // Pause autoplay on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            carouselContainer.addEventListener('mouseleave', startAutoplay);
        }
    }

    // 3. GALLERY FILTERING
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    // Filter animation transition
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400); // Wait for the transition to finish
                    }
                });
            });
        });
    }
});
 Pry
