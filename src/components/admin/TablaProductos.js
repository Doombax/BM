import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CatalogoProductos({ productos = [], editarProducto, eliminarProducto }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto }} style={styles.imagen} />
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>${item.precio}</Text>
      <Text style={styles.detalle}>Categoría: {item.categoria}</Text>
      <Text style={styles.detalle}>Talla: {item.talla}</Text>
      <Text style={styles.detalle}>Marca: {item.marca}</Text>
      <Text style={styles.detalle}>Color: {item.color}</Text>
      <View style={styles.acciones}>
        <TouchableOpacity onPress={() => editarProducto(item)}>
          <Ionicons name="create-outline" size={22} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
          <Ionicons name="trash-outline" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={productos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.fila}
      contentContainerStyle={styles.catalogo}
    />
  );
}

const styles = StyleSheet.create({
  catalogo: {
    padding: 10,
    gap: 10,
  },
  fila: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    elevation: 2,
  },
  imagen: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  precio: {
    fontSize: 13,
    color: '#007AFF',
  },
  detalle: {
    fontSize: 12,
    color: '#555',
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});