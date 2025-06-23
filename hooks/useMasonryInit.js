import { useEffect } from 'react';

// Custom hook to initialize masonry layout
export default function useMasonryInit(enabled, deps = []) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    
    // Function to initialize masonry with jQuery
    const initMasonry = () => {
      if (!window.jQuery) return;
      
      const $ = window.jQuery;
      
      // Initialize the masonry layout
      const $grid = $('.bricks-wrapper');
      if (!$grid.length) return;
      
      // Function to set up masonry
      const setupMasonry = () => {
        $grid.masonry({
          itemSelector: '.brick',
          columnWidth: '.grid-sizer',
          percentPosition: true,
          transitionDuration: 0
        });
      };
      
      // Check if we can use imagesLoaded for better timing
      if (typeof $.fn.imagesLoaded === 'function') {
        $grid.imagesLoaded(setupMasonry);
      } else {
        // Fallback to timeout
        setTimeout(setupMasonry, 500);
      }
    };
    
    // Function to load a script with a promise
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };
    
    // Check if jQuery is available first
    if (!window.jQuery) {
      loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
        .then(() => loadScript('https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js'))
        .then(() => loadScript('https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js'))
        .then(() => {
          // Wait a bit to ensure everything is ready
          setTimeout(initMasonry, 100);
        })
        .catch((error) => console.error('Error loading masonry scripts:', error));
    } else {
      // jQuery exists, just check for other dependencies
      Promise.all([
        !window.jQuery.fn.imagesLoaded ? loadScript('https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js') : Promise.resolve(),
        !window.jQuery.fn.masonry ? loadScript('https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js') : Promise.resolve()
      ])
        .then(() => {
          setTimeout(initMasonry, 100);
        })
        .catch((error) => console.error('Error loading masonry dependencies:', error));
    }
    
    // Cleanup function
    return () => {
      if (window.jQuery && window.jQuery.fn.masonry) {
        try {
          window.jQuery('.bricks-wrapper').masonry('destroy');
        } catch (e) {
          console.warn('Error destroying masonry:', e);
        }
      }
    };
  }, [enabled, ...deps]);
}
