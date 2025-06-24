import { useEffect } from 'react';

export default function useBackToTop() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const pxShow = 500;         // height on which the button will show
    const fadeInTime = 400;     // how slow/fast you want the button to show
    const fadeOutTime = 400;    // how slow/fast you want the button to hide
    const scrollSpeed = 300;    // how slow/fast you want the button to scroll to top
    
    const goTopButton = document.getElementById("go-top");
    
    if (!goTopButton) return;

    // Initially hide the button
    goTopButton.style.display = 'none';

    // Show or hide the button based on scroll position
    const handleScroll = () => {
      if (window.scrollY >= pxShow) {
        goTopButton.style.display = 'block';
        goTopButton.style.opacity = '1';
      } else {
        goTopButton.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY < pxShow) {
            goTopButton.style.display = 'none';
          }
        }, fadeOutTime);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
