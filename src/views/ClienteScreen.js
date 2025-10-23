import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ClienteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Bienvenido, cliente</Text>
      {/* Aquí podés agregar más contenido para el cliente */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});