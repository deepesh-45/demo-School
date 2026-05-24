/**
 * Mahankal English Medium School - About & Academics Page Scripts
 * Handles timeline slide directions and faculty card scroll interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMICALLY ASSIGN SLIDE-IN DIRECTIONS TO TIMELINE EVENTS
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    if (timelineEvents.length > 0) {
        timelineEvents.forEach((event, index) => {
            // Apply reveal direction based on odd/even index
            if (index % 2 === 0) {
                // Left-aligned card (slides in from left)
                event.classList.add('reveal-left');
            } else {
                // Right-aligned card (slides in from right)
                event.classList.add('reveal-right');
            }
        });
    }

    // 2. TIMELINE LINE HEIGHT SCROLL-TRACKER (GROW TIMELINE LINE ON SCROLL)
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineLine = document.querySelector('.timeline-line');

    if (timelineContainer && timelineLine) {
        const updateTimelineLine = () => {
            const rect = timelineContainer.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Calculate how much of the timeline is scrolled past the middle of the screen
            const containerTop = rect.top;
            const containerHeight = rect.height;
            
            let scrollProgress = 0;
            
            if (containerTop < viewHeight / 2) {
                const scrolledDistance = (viewHeight / 2) - containerTop;
                scrollProgress = Math.min(scrolledDistance / containerHeight, 1);
            }
            
            // Set the height of the line based on scroll progress (percentage)
            timelineLine.style.background = `linear-gradient(to bottom, var(--accent-blue) 0%, var(--accent-blue) ${scrollProgress * 100}%, var(--border-color) ${scrollProgress * 100}%, var(--border-color) 100%)`;
        };

        window.addEventListener('scroll', updateTimelineLine);
        // Initial call
        updateTimelineLine();
    }
});
