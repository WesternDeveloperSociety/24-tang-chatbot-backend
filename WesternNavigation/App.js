import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Mapbox, { MapView } from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGFuZ2NoYXRib3QiLCJhIjoiY202OGIyeDA4MDIwcjJqbjNpNDhudXV6OSJ9.s7BDnOLzQFEcI3Qxbmj2LA"
);

export default class App extends Component {
  // Disable telemetry
  componentDidMount() {
    Mapbox.setTelemetryEnabled(false);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
