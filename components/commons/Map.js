import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically load Leaflet with no SSR
const MapComponent = ({ center = [14.549072, 121.046958], zoom = 15 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Import Leaflet dynamically on client side
    const loadMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet').then(module => module.default || module);

        // Make sure we only initialize once
        if (mapInstanceRef.current) return;

        // Create the map instance
        mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        // Add marker
        L.marker(center).addTo(mapInstanceRef.current)
          .bindPopup('Our Location')
          .openPopup();

        // Add zoom controls
        const zoomInButton = document.getElementById('map-zoom-in');
        const zoomOutButton = document.getElementById('map-zoom-out');

        if (zoomInButton) {
          zoomInButton.onclick = () => {
            mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1);
          };
        }

        if (zoomOutButton) {
          zoomOutButton.onclick = () => {
            mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1);
          };
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    loadMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

// Export with no SSR
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false
});
