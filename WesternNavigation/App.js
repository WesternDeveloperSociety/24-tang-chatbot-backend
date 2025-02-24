import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps"; // ✅ Correct Import

// ✅ Correct Token Setup
MapboxGL.setAccessToken("pk.eyJ1IjoidGFuZ2NoYXRib3QiLCJhIjoiY202OGIyeDA4MDIwcjJqbjNpNDhudXV6OSJ9.s7BDnOLzQFEcI3Qxbmj2LA");
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setWellKnownTileServer("Mapbox");

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* ✅ Correct MapboxGL Component */}
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/mapbox/streets-v12"
          zoomEnabled={true}
          rotateEnabled={true}
        >
          {/* ✅ Correct Camera Usage */}
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[-81.2748, 43.0060]} // ✅ Longitude first
            pitch={60}
            animationMode={"flyTo"}
            animationDuration={6000}
          />

          {/* ✅ Correct PointAnnotation Usage */}
          <MapboxGL.PointAnnotation id="marker" coordinate={[-81.2748, 43.0060]}>
            <View style={styles.marker} />
          </MapboxGL.PointAnnotation>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
