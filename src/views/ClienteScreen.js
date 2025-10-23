import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../database/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function ClienteScreen() {
  const navigation = useNavigation();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Bienvenido, cliente</Text>

      {/* Aquí van tus componentes de cliente, si tenés más */}

      <Button title="Cerrar sesión" onPress={cerrarSesion} color="#FF3B30" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});