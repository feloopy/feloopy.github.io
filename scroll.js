document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container');
    let currentIndex = 0;

    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    let startY = 0;

    function handleTouchStart(event) {
        startY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        const deltaY = event.touches[0].clientY - startY;
        if (Math.abs(deltaY) > 50) {
            handleScroll({ deltaY: -deltaY }); 
        }
    }

    function handleScroll(event) {
        event.preventDefault();

        if (event.deltaY > 0 && currentIndex < containers.length - 1) {
            containers[currentIndex].classList.remove('active');
            currentIndex++;
            containers[currentIndex].classList.add('active');
        } else if (event.deltaY < 0 && currentIndex > 0) {
            containers[currentIndex].classList.remove('active');
            currentIndex--;
            containers[currentIndex].classList.add('active');
        }
    }
});