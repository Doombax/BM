import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../database/firebaseConfig';

export default function ClienteScreen() {
  const navigation = useNavigation();

  const cerrarSesion = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bienvenido, cliente 👋</Text>
      <Button title="Cerrar sesión" onPress={cerrarSesion} color="#e63946" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});