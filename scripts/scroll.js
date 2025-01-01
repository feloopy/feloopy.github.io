document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.container');
    let currentIndex = 0;
    let startY = 0;
    let isScrolling = false;

    // Flag to detect zooming
    let isZooming = false;

    // Handle zoom detection using 'wheel' event
    window.addEventListener('wheel', function (event) {
        if (event.ctrlKey) {
            isZooming = true;
        } else {
            isZooming = false;
        }
    }, { passive: true });

    // Handle keyup to reset zoom state
    window.addEventListener('keyup', function (event) {
        if (event.key === 'Control') {
            isZooming = false;
        }
    });

    // Handle touchstart and touchmove for mobile devices
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleScroll, { passive: false });

    function handleTouchStart(event) {
        startY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        // Do not scroll if zooming
        if (isZooming) return;

        const deltaY = event.touches[0].clientY - startY;

        if (isScrolling) return;

        if (Math.abs(deltaY) > 50) {
            handleScroll({ deltaY: -deltaY });
            isScrolling = true;
            setTimeout(() => isScrolling = false, 200);
        }
    }

    function handleScroll(event) {
        // Stop scrolling if zooming is detected
        if (isZooming || isScrolling) {
            return;
        }

        // Perform smooth transitions between containers
        if (event.deltaY > 0 && currentIndex < containers.length - 1) {
            containers[currentIndex].classList.remove('active');
            currentIndex++;
            containers[currentIndex].classList.add('active');
        } else if (event.deltaY < 0 && currentIndex > 0) {
            containers[currentIndex].classList.remove('active');
            currentIndex--;
            containers[currentIndex].classList.add('active');
        }

        isScrolling = true;
        setTimeout(() => isScrolling = false, 200);

        event.preventDefault(); // Prevent default scrolling behavior
    }

    // Allow natural zooming behavior when Ctrl is pressed without blocking it
    window.addEventListener('wheel', function (event) {
        if (event.ctrlKey) {
            // Allow default zoom behavior and exit
            return;
        }
        // Prevent scrolling behavior if not zooming
        event.preventDefault();
    }, { passive: false });

    // Ensure proper handling of touch devices for zooming gestures (pinch-to-zoom)
    let touchStartDistance = 0;
    let isPinching = false;

    document.addEventListener('touchstart', function (event) {
        if (event.touches.length === 2) {
            isPinching = true;
            touchStartDistance = getTouchDistance(event.touches);
        }
    }, { passive: true });

    document.addEventListener('touchmove', function (event) {
        if (isPinching && event.touches.length === 2) {
            const currentDistance = getTouchDistance(event.touches);
            if (Math.abs(currentDistance - touchStartDistance) > 10) {
                isZooming = true; // Detect pinch zoom
            }
        }
    }, { passive: true });

    document.addEventListener('touchend', function () {
        isPinching = false;
        isZooming = false;
    });

    function getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
});
