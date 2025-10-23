import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../database/firebaseConfig';

export default function Settings() {
  const navigation = useNavigation();
  const auth = getAuth();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      Alert.alert('Sesión cerrada', 'Has salido correctamente.');
      navigation.replace('Login'); // Redirige al login
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión.');
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Cerrar sesión" onPress={cerrarSesion} color="#e63946" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});