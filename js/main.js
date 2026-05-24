/**
 * Mahankal English Medium School - Global Script
 * Handles custom cursor, theme toggling, scroll progress, scroll animations, mobile menu, and loader
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. LOADING SCREEN
    const preloader = document.querySelector('.loader-overlay');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 600); // Slight delay for smoother loading impression
        });

        // Backup loader removal if load event doesn't fire
        setTimeout(() => {
            if (!preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
            }
        }, 3000);
    }



    // 3. THEME TOGGLE (DARK / LIGHT MODE)
    const themeToggleBtn = document.getElementById('themeToggle');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggle');
    const rootHtml = document.documentElement;

    // Load initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        rootHtml.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        rootHtml.setAttribute('data-theme', 'dark');
    } else {
        rootHtml.setAttribute('data-theme', 'light');
    }

    function toggleTheme() {
        const currentTheme = rootHtml.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        rootHtml.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }

    // 4. STICKY NAVBAR & SCROLL PROGRESS INDICATOR
    const header = document.querySelector('.header');
    const progressBar = document.querySelector('.scroll-progress-bar');
    const toTopBtn = document.querySelector('.btn-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky Header class
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scroll Progress Bar width
        if (progressBar && docHeight > 0) {
            const scrollPercentage = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        }

        // Back to Top button visibility
        if (toTopBtn) {
            if (scrollTop > 400) {
                toTopBtn.classList.add('visible');
            } else {
                toTopBtn.classList.remove('visible');
            }
        }
    });

    // Scroll to Top action
    if (toTopBtn) {
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. MOBILE MENU SIDEBAR NAVIGATION
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');

    if (burgerMenu && mobileNav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('open');
            // Prevent scrolling behind mobile menu when open
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 6. REVEAL-ON-SCROLL ANIMATION ENGINE
    const revealElements = document.querySelectorAll('.reveal-hidden');
    
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null, // Viewport
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is fully in view
            threshold: 0.15 // 15% element visibility
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
