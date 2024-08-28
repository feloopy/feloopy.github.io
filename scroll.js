document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container');
    let currentIndex = 0;
    let startY = 0;
    let isScrolling = false;

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleScroll, { passive: false });

    function handleTouchStart(event) {
        startY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        const deltaY = event.touches[0].clientY - startY;

        if (isScrolling) return;

        if (Math.abs(deltaY) > 50) {
            handleScroll({ deltaY: -deltaY });
            isScrolling = true;
            setTimeout(() => isScrolling = false, 100); 
        }
    }

    function handleScroll(event) {
        if (isScrolling) return;

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
        setTimeout(() => isScrolling = false, 100); 

        event.preventDefault(); 
    }
});