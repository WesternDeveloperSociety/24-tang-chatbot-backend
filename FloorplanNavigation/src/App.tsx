import React from 'react';
import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { Space } from '@mappedin/react-sdk/mappedin-js/src';

function MyCustomComponent() {
  const { mapData } = useMap();

  return mapData.getByType('space').map((space) => (
    <Label key={space.id} target={space.center} text={space.name} />
  ));
}

export default function App() {

  // api schtuff
  const { isLoading, error, mapData } = useMapData({
    key: import.meta.env.VITE_KEY,
    secret: import.meta.env.VITE_SECRET,
    mapId: import.meta.env.VITE_MAPID,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <MapView mapData={mapData}>
      <MyCustomComponent />
    </MapView>
  ) : null;
}
