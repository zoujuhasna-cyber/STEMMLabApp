import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const FlashlightScreen = () => {
  const [isOn, setIsOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const toggleFlashlight = async () => {
    const cameraPermission = permission?.granted ? permission : await requestPermission();
    if (!cameraPermission.granted) {
      Alert.alert('Permission Denied', 'Camera permission is needed for the flashlight.');
      return;
    }
    setIsOn(!isOn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Optical Lab: Torch</Text>
      <Text style={styles.description}>Use the device's LED for light experiments.</Text>

      <CameraView style={styles.hiddenCamera} facing="back" enableTorch={isOn} active={isOn} />

      <TouchableOpacity
        style={[styles.circle, isOn ? styles.on : styles.off]}
        onPress={toggleFlashlight}
      >
        <Ionicons name="flash" size={80} color={isOn ? '#FFD700' : '#BDC3C7'} />
      </TouchableOpacity>

      <Text style={styles.statusText}>{isOn ? 'LIGHT IS ON' : 'LIGHT IS OFF'}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Scientific Use:</Text>
        <Text style={styles.infoText}>Use this as a steady light source for reflection or refraction experiments.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.text, marginBottom: 10 },
  description: { fontSize: 14, color: Colors.textLight, marginBottom: 40 },
  hiddenCamera: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  circle: { width: 180, height: 180, borderRadius: 90, justifyContent: 'center', alignItems: 'center', elevation: 5, backgroundColor: '#FFF', borderWidth: 4 },
  on: { borderColor: '#FFD700' },
  off: { borderColor: '#BDC3C7' },
  statusText: { marginTop: 20, fontSize: 18, fontWeight: '700', color: Colors.text },
  infoBox: { marginTop: 50, padding: 15, backgroundColor: '#FFF9C4', borderRadius: 10 },
  infoTitle: { fontWeight: '700', color: '#FBC02D' },
  infoText: { fontSize: 13, color: '#F9A825' }
});

export default FlashlightScreen;
