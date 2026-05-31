import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (errorMsg) return <View style={styles.center}><Text>{errorMsg}</Text></View>;
  if (!location) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: Number(location.coords.latitude),
          longitude: Number(location.coords.longitude),
          latitudeDelta: Number(0.005), // Zoomed in more for better detail
          longitudeDelta: Number(0.005),
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker
          coordinate={{
            latitude: Number(location.coords.latitude),
            longitude: Number(location.coords.longitude)
          }}
          title="Field Lab Station"
          description="Live scientific data collection point"
        />
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Android Native GPS Feed</Text>
        <View style={styles.coordRow}>
           <Text style={styles.coordText}>LAT: {Number(location.coords.latitude).toFixed(5)}</Text>
           <Text style={styles.coordText}>LON: {Number(location.coords.longitude).toFixed(5)}</Text>
        </View>
        <Text style={styles.subText}>Google Maps Engine Active ✅</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: Number(1), backgroundColor: Colors.background },
  center: { flex: Number(1), justifyContent: 'center', alignItems: 'center' },
  map: { width: Dimensions.get('window').width, flex: Number(1) },
  infoBox: {
    padding: Number(15),
    backgroundColor: Colors.card,
    alignItems: 'center',
    borderTopWidth: Number(1),
    borderColor: '#EEEEEE'
  },
  infoTitle: { fontSize: Number(14), fontWeight: '700', color: Colors.text, marginBottom: Number(4) },
  coordRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: Number(4) },
  coordText: { fontSize: Number(15), color: Colors.primary, fontWeight: '700' },
  subText: { fontSize: Number(10), color: Colors.success, marginTop: Number(4), fontWeight: '700' }
});

export default MapScreen;
