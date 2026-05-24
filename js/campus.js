/**
 * Mahankal English Medium School - Campus & Contact Page Scripts
 * Handles Virtual Tour sector swapping and contact form animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. VIRTUAL TOUR INTERACTIVE SELECTORS
    const tourButtons = document.querySelectorAll('.tour-btn');
    const previewImg = document.querySelector('.tour-preview-img');
    const captionTitle = document.querySelector('.tour-caption-title');
    const captionDesc = document.querySelector('.tour-caption-desc');

    // Virtual Tour database mapping
    const tourData = {
        entrance: {
            img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
            title: "Campus Main Block",
            desc: "Architectural gateway of Mahankal English Medium School. Situated along the prominent A.B. Road in Siya, Dewas."
        },
        robotics: {
            img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
            title: "Innovation & Robotics Labs",
            desc: "A high-end tech workspace equipped with robotics design tables, micro-controller testing kits, and computer programming rigs."
        },
        library: {
            img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
            title: "Digital Reference Library",
            desc: "Spacious academic library with thousands of physical journals, reference literature volumes, and digital e-readers."
        },
        sports: {
            img: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80",
            title: "Athletics & Sports Ground",
            desc: "State-of-the-art sports complex with turf grounds, running tracks, and training pits supporting outdoor physical drills."
        }
    };

    if (tourButtons.length > 0 && previewImg) {
        tourButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // If already active, do nothing
                if (btn.classList.contains('active')) return;

                // Remove active classes
                tourButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const sectorKey = btn.getAttribute('data-tour');
                const sector = tourData[sectorKey];

                if (sector) {
                    // Smooth cross-fade transition
                    previewImg.style.opacity = '0';
                    previewImg.style.transform = 'scale(1.02)';
                    
                    const captionBox = document.querySelector('.tour-caption-box');
                    if (captionBox) {
                        captionBox.style.opacity = '0';
                        captionBox.style.transform = 'translateY(10px)';
                    }

                    setTimeout(() => {
                        // Swap source & content
                        previewImg.src = sector.img;
                        previewImg.alt = `${sector.title} Preview`;
                        captionTitle.textContent = sector.title;
                        captionDesc.textContent = sector.desc;

                        // Fade back in
                        previewImg.style.opacity = '1';
                        previewImg.style.transform = 'scale(1)';
                        if (captionBox) {
                            captionBox.style.opacity = '1';
                            captionBox.style.transform = 'translateY(0)';
                        }
                    }, 400); // Sync with transition timers
                }
            });
        });
    }

    // 2. CONTACT INQUIRY FORM SUCCESS ACTION
    const inquiryForm = document.getElementById('inquiryForm');
    const formContainer = document.querySelector('.contact-form-container');
    const successResetBtn = document.getElementById('successReset');

    if (inquiryForm && formContainer) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform visual form animation
            formContainer.classList.add('success-active');
            inquiryForm.reset();
        });
    }

    if (successResetBtn && formContainer) {
        successResetBtn.addEventListener('click', () => {
            formContainer.classList.remove('success-active');
        });
    }
});
