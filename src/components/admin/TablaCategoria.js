import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TablaCategorias({ categorias = [], editarCategoria, eliminarCategoria }) {
  const renderItem = ({ item }) => (
    <View style={styles.fila}>
      <Text style={styles.texto}>{item.categoria}</Text>
      <View style={styles.acciones}>
        <TouchableOpacity onPress={() => editarCategoria(item)}>
          <Ionicons name="create-outline" size={22} color="#6CA8FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarCategoria(item.id)}>
          <Ionicons name="trash-outline" size={22} color="#D96C9F" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={Array.isArray(categorias) ? categorias : []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.vacio}>No hay categorías registradas.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  acciones: {
    flexDirection: 'row',
    gap: 12,
  },
  vacio: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#AAAAAA',
    fontSize: 14,
  },
});