import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { Colors } from '../constants/Colors';

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('GPS Permission Denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation(loc);
    })();
  }, []);

  if (errorMsg) return <View style={styles.center}><Text>{errorMsg}</Text></View>;
  if (!location) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  const lat = Number(location.coords.latitude);
  const lon = Number(location.coords.longitude);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: Number(0.005),
          longitudeDelta: Number(0.005),
        }}
        showsUserLocation={true}
        mapType="none" // Hides the blank Google layer
      >
        {/*
          PROFESSIONAL FALLBACK:
          Using OpenStreetMap tiles ensures the map works even if
          the Google API Key has billing or restriction issues.
        */}
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={Number(19)}
          shouldReplaceMapContent={true}
        />

        <Marker
          coordinate={{ latitude: lat, longitude: lon }}
          title="Field Lab Station"
          description="Live scientific data collection point"
        />
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Android Satellite Feed</Text>
        <View style={styles.coordRow}>
           <Text style={styles.coordText}>LAT: {lat.toFixed(5)}</Text>
           <Text style={styles.coordText}>LON: {lon.toFixed(5)}</Text>
        </View>
        <Text style={styles.subText}>Hybrid Map Engine: Active ✅</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { width: Dimensions.get('window').width, flex: 1 },
  infoBox: {
    padding: 15,
    backgroundColor: Colors.card,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EEEEEE'
  },
  infoTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  coordRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  coordText: { fontSize: 15, color: Colors.primary, fontWeight: '700' },
  subText: { fontSize: 10, color: Colors.success, marginTop: 4, fontWeight: '700' }
});

export default MapScreen;
