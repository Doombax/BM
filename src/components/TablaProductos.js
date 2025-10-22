import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BotonEliminarProducto from './BotonEliminarProducto';

const TablaProductos = ({ productos, eliminarProducto, editarProducto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tabla de Productos</Text>

      <View style={[styles.fila, styles.encabezado]}>
        <Text style={[styles.celda, styles.textoEncabezado]}>Imagen</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Código</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Categoría</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Descripción</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Precio</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Stock</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
      </View>

      <ScrollView>
        {productos.map((item) => (
          <View key={item.id} style={styles.fila}>
            <View style={styles.celda}>
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.imagen} />
              ) : (
                <Text style={styles.sinImagen}>Sin imagen</Text>
              )}
            </View>
            <Text style={styles.celda}>{item.codigo}</Text>
            <Text style={styles.celda}>{item.nombre}</Text>
            <Text style={styles.celda}>{item.categoria}</Text>
            <Text style={styles.celda}>{item.descripcion}</Text>
            <Text style={styles.celda}>{item.precio}</Text>
            <Text style={styles.celda}>{item.stock}</Text>
            <View style={styles.celdaAcciones}>
              <TouchableOpacity
                style={styles.botonActualizar}
                onPress={() => editarProducto(item)}
              >
                <Text>✏️</Text>
              </TouchableOpacity>
              <BotonEliminarProducto
                id={item.id}
                eliminarProducto={eliminarProducto}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch"
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#CCC",
    paddingVertical: 6,
    alignItems: "center"
  },
  encabezado: {
    backgroundColor: "#F0F0F0"
  },
  celda: {
    flex: 1,
    fontSize: 10,
    textAlign: "center"
  },
  celdaAcciones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },
  textoEncabezado: {
    fontWeight: "bold",
    fontSize: 8,
    textAlign: "center"
  },
  botonActualizar: {
    padding: 4,
    backgroundColor: "#f3f3f7",
    borderRadius: 5,
    marginRight: 5
  },
  imagen: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignSelf: "center"
  },
  sinImagen: {
    fontStyle: "italic",
    color: "#999",
    fontSize: 8
  }
});

export default TablaProductos;