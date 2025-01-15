import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    MapboxGL.setAccessToken('pk.eyJ1IjoiaW1hbmtub2oiLCJhIjoiY201eTU5N3gwMDBocTJrbzdqMnF3dDZvMiJ9.GsLjpk8qzI_CSvWWhzEI_w');
  },[]); 

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={8}
          centerCoordinate={[-81.2330, 42.9819]} // Western University Coordinates
        />
      </MapboxGL.MapView>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
