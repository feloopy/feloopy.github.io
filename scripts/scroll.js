document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.container');
    let currentIndex = 0;
    let startY = 0;
    let isScrolling = false;
    let isZooming = false;

    window.addEventListener('wheel', function (event) {
        if (event.ctrlKey) {
            isZooming = true;
        } else {
            isZooming = false;
        }
    }, { passive: true });

    window.addEventListener('keyup', function (event) {
        if (event.key === 'Control') {
            isZooming = false;
        }
    });

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleScroll, { passive: false });

    window.addEventListener('keydown', function (event) {
        if (isZooming) return;

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === ' ') {
            if (currentIndex < containers.length - 1) {
                containers[currentIndex].classList.remove('active');
                currentIndex++;
                containers[currentIndex].classList.add('active');
            }
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                containers[currentIndex].classList.remove('active');
                currentIndex--;
                containers[currentIndex].classList.add('active');
            }
        }
    });

    function handleTouchStart(event) {
        startY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
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
        if (isZooming || isScrolling) {
            return;
        }

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

        event.preventDefault();
    }

    window.addEventListener('wheel', function (event) {
        if (event.ctrlKey) {
            return;
        }
        event.preventDefault();
    }, { passive: false });

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
                isZooming = true;
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
