import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';

export default function FormularioProducto({
  nuevoProducto,
  manejoCambio,
  guardarProducto,
  seleccionarImagen,
  modEdicion = false,
}) {
  return (
    <View style={styles.formulario}>
      <TextInput
        placeholder="Código del producto"
        value={nuevoProducto.codigo}
        onChangeText={(text) => manejoCambio('codigo', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre del producto"
        value={nuevoProducto.nombre}
        onChangeText={(text) => manejoCambio('nombre', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Categoría"
        value={nuevoProducto.categoria}
        onChangeText={(text) => manejoCambio('categoria', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={nuevoProducto.descripcion}
        onChangeText={(text) => manejoCambio('descripcion', text)}
        style={[styles.input, styles.descripcion]}
        multiline
      />
      <TextInput
        placeholder="Precio"
        value={nuevoProducto.precio}
        onChangeText={(text) => manejoCambio('precio', text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Stock"
        value={nuevoProducto.stock}
        onChangeText={(text) => manejoCambio('stock', text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Talla"
        value={nuevoProducto.talla}
        onChangeText={(text) => manejoCambio('talla', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Marca"
        value={nuevoProducto.marca}
        onChangeText={(text) => manejoCambio('marca', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Color"
        value={nuevoProducto.color}
        onChangeText={(text) => manejoCambio('color', text)}
        style={styles.input}
      />

      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} color="#4CAF50" />
      {nuevoProducto.foto ? (
        <Image source={{ uri: nuevoProducto.foto }} style={styles.preview} />
      ) : (
        <Text style={styles.sinImagen}>Sin imagen seleccionada</Text>
      )}
      <Button
        title={modEdicion ? 'Actualizar' : 'Guardar'}
        onPress={guardarProducto}
        color="#007AFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  descripcion: {
    height: 80,
    textAlignVertical: 'top',
  },
  preview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  sinImagen: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginVertical: 10,
  },
});