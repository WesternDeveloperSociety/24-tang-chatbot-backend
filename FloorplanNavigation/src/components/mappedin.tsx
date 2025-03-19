import React from 'react';
import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { Space } from '@mappedin/react-sdk/mappedin-js/src';


function Map() {
  const { mapData } = useMap();

  return mapData.getByType('space').map((space) => (
    <Label key={space.id} target={space.center} text={space.name} />
  ));
}

export default Map;