import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import React, { useEffect } from 'react';
import MAPBOX_API_KEY from '.env';

export default function App() {
  useEffect(() => {
    Mapb.setAccessToken(MAPBOX_API_KEY);
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
