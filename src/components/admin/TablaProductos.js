import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
          <Ionicons name="create-outline" size={22} color="#6CA8FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
          <Ionicons name="trash-outline" size={22} color="#D96C9F" />
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
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    elevation: 3,
  },
  imagen: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  precio: {
    fontSize: 13,
    color: '#D96C9F',
    marginBottom: 6,
  },
  detalle: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});