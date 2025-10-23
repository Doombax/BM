import React from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function FormularioProducto({
  nuevoProducto,
  manejoCambio,
  guardarProducto,
  seleccionarImagen,
  modEdicion,
}) {
  return (
    <View style={styles.formulario}>
      <TextInput
        placeholder="Código"
        value={nuevoProducto.codigo}
        onChangeText={(text) => manejoCambio('codigo', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre"
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
      {nuevoProducto.foto ? (
        <Image source={{ uri: nuevoProducto.foto }} style={styles.preview} />
      ) : null}
      <Button
        title={modEdicion ? 'Actualizar producto' : 'Guardar producto'}
        onPress={guardarProducto}
        color="#007AFF"
      />
      <Button
        title="Seleccionar imagen"
        onPress={seleccionarImagen}
        color="#888"
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
  preview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});