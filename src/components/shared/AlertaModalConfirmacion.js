import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlertaModalConfirmacion({ visible, titulo, mensaje, onCancelar, onConfirmar }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>
          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onCancelar}>
              <Text style={styles.botonTextoSecundario}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonConfirmar} onPress={onConfirmar}>
              <Text style={styles.botonTexto}>Aceptar</Text>
            </TouchableOpacity>
          </View>
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
  botones: {
    flexDirection: 'row',
    gap: 12,
  },
  botonCancelar: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonConfirmar: {
    backgroundColor: '#D96C9F',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  botonTextoSecundario: {
    color: '#ccc',
    fontSize: 15,
    fontWeight: '500',
  },
});