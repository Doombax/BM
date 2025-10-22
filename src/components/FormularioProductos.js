import React from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const FormularioProductos = ({
  nuevoProducto,
  manejoCambio,
  guardarProducto,
  actualizarProducto,
  modEdicion,
  seleccionarImagen,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {modEdicion ? "Actualizar Producto" : "Registro de Producto"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Código del producto"
        value={nuevoProducto.codigo}
        onChangeText={(codigo) => manejoCambio("codigo", codigo)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nuevoProducto.nombre}
        onChangeText={(nombre) => manejoCambio("nombre", nombre)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría del producto"
        value={nuevoProducto.categoria}
        onChangeText={(categoria) => manejoCambio("categoria", categoria)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={nuevoProducto.descripcion}
        onChangeText={(descripcion) => manejoCambio("descripcion", descripcion)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={nuevoProducto.precio}
        onChangeText={(precio) => manejoCambio("precio", precio)}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        value={nuevoProducto.stock}
        onChangeText={(stock) => manejoCambio("stock", stock)}
      />

      <TouchableOpacity style={styles.botonImagen} onPress={seleccionarImagen}>
        <Text style={styles.textoBoton}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {nuevoProducto.foto ? (
        <Image source={{ uri: nuevoProducto.foto }} style={styles.preview} />
      ) : (
        <Text style={styles.mensajePreview}>Sin imagen seleccionada</Text>
      )}

      <Button
        title={modEdicion ? "Actualizar" : "Guardar"}
        onPress={modEdicion ? actualizarProducto : guardarProducto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
  botonImagen: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoBoton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  mensajePreview: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#999",
    marginBottom: 10,
  },
});

export default FormularioProductos;