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
        // Import Leaflet CSS
        await import('leaflet/dist/leaflet.css');
        
        // Dynamically import Leaflet
        const L = await import('leaflet').then(module => module.default || module);

        // Make sure we only initialize once
        if (mapInstanceRef.current) return;        // Fix Leaflet's icon paths which are known to cause issues with webpack
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

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
        }      } catch (error) {
        console.error("Error loading map:", error);
        
        // Display error message in the map container
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; padding: 20px;">
              <p>We're having trouble loading the map right now.</p>
              <p>Please try again later or contact us directly.</p>
            </div>
          `;
        }
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
  return <div ref={mapRef} style={{ height: '400px', width: '100%', background: '#f0f0f0' }} />;
};

// Export with no SSR
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => <div style={{ height: '400px', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>
});
