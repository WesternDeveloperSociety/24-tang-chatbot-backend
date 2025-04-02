import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import './Map.css';
import { Space } from '@mappedin/react-sdk/mappedin-js/src';

function MyCustomComponent() {
  const { mapData, mapView } = useMap();
  const [selectedSpaces, setSelectedSpaces] = useState<{ firstSpace?: Space; secondSpace?: Space }>({});
  const [searchParams] = useSearchParams();

  const startRoom = searchParams.get('startRoom');
  const endRoom = searchParams.get('endRoom');

  useEffect(() => {
    if (startRoom && endRoom) {
      const firstSpace = mapData.getByType('space').find((s) => s.name === startRoom);
      const secondSpace = mapData.getByType('space').find((s) => s.name === endRoom);

      if (firstSpace && secondSpace) {
        setSelectedSpaces({ firstSpace, secondSpace });

        // Draw directions between the two spaces
        const directions = mapData.getDirections(firstSpace, secondSpace);
        if (directions) {
          mapView.Navigation.draw(directions);
        } else {
          console.error('Could not generate directions between the spaces.');
        }
      } else {
        console.error('One or both rooms could not be found.');
      }
    }
  }, [startRoom, endRoom, mapData, mapView]);

  // Make all spaces interactive
  useEffect(() => {
    mapData.getByType('space').forEach((space) => {
      mapView.updateState(space, {
        interactive: true,
        hoverColor: 'orange',
      });
    });
  }, [mapData, mapView]);

  return mapData.getByType('space').map((space) => (
    <Label key={space.id} target={space.center} text={space.name} />
  ));
}

export default function Map() {
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
