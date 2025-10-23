import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlertaModal({ visible, titulo, mensaje, onCerrar }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>
          <TouchableOpacity style={styles.boton} onPress={onCerrar}>
            <Text style={styles.botonTexto}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contenido: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  mensaje: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#D96C9F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});