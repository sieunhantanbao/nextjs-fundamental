import { useEffect } from 'react';

export default function BodyScript() {
  useEffect(() => {
    // Load scripts dynamically after component mounts
    const loadScripts = async () => {
      try {
        // Use jQuery that's already loaded in _document.js
        // Load plugins script
        const pluginsScript = document.createElement('script');
        pluginsScript.src = '/js/plugins.js';
        document.body.appendChild(pluginsScript);

        // Wait for plugins to load, then load main.js
        await new Promise(resolve => {
          pluginsScript.onload = resolve;
        });

        const mainScript = document.createElement('script');
        mainScript.src = '/js/main.js';
        document.body.appendChild(mainScript);
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();
  }, []);

  return null;
}