import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Colors } from '../constants/Colors';

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (errorMsg) return <View style={styles.center}><Text>{errorMsg}</Text></View>;
  if (!location) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Lab Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
          title="Current Lab Station"
          description="You are conducting science here!"
        />
      </MapView>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Lat: {location.coords.latitude.toFixed(4)}</Text>
        <Text style={styles.infoText}>Lon: {location.coords.longitude.toFixed(4)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: Colors.text, padding: 20, textAlign: 'center' },
  map: { width: Dimensions.get('window').width, flex: 1 },
  infoBox: { padding: 20, backgroundColor: Colors.card, alignItems: 'center' },
  infoText: { fontSize: 16, color: Colors.primary, fontWeight: '600' }
});

export default MapScreen;
