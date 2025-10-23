import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const FormularioCategorias = ({
  nuevaCategoria,
  manejoCambio,
  guardarCategoria,
  actualizarCategoria,
  modEdicion,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {modEdicion ? 'Actualizar categoría' : 'Registro de categoría'}
      </Text>

      <View style={styles.grupo}>
        <Text style={styles.etiqueta}>Nombre de la categoría</Text>
        <TextInput
          style={styles.input}
          placeholder="Categoria"
          placeholderTextColor="#888"
          value={nuevaCategoria.categoria}
          onChangeText={(categoria) => manejoCambio('categoria', categoria)}
        />
      </View>

      <TouchableOpacity
        style={styles.botonGuardar}
        onPress={modEdicion ? actualizarCategoria : guardarCategoria}
      >
        <Text style={styles.botonTexto}>
          {modEdicion ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 12,
    gap: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  grupo: {
    gap: 6,
  },
  etiqueta: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 15,
  },
  botonGuardar: {
    backgroundColor: '#D96C9F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FormularioCategorias;