import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TablaCategorias({ categorias = [], editarCategoria, eliminarCategoria }) {
  const renderItem = ({ item }) => (
    <View style={styles.fila}>
      <Text style={styles.texto}>{item.categoria}</Text>
      <View style={styles.acciones}>
        <TouchableOpacity onPress={() => editarCategoria(item)}>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarCategoria(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={Array.isArray(categorias) ? categorias : []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={styles.vacio}>No hay categorías registradas.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  acciones: {
    flexDirection: 'row',
    gap: 10,
  },
  vacio: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
  },
});