import { useRef, useEffect } from 'react'
import mapboxgl, { Map } from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'

function App() {

  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFoYXJzaGlpcDEzIiwiYSI6ImNtOTA3c2JyZDBrM2EybXEwN3JzZmtrNG8ifQ.kRBs0be6XnRCPNSBeEwFVA'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // Ensure this is not null
      style: 'mapbox://styles/mapbox/streets-v11', // Add a default style
      center: [0, 0], // Default center coordinates
      zoom: 2, // Default zoom level
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    }
  }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}/>
    </>
  )
}

export default App