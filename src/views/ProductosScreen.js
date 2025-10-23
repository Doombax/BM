import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import TablaProductos from '../components/admin/TablaProductos';
import FloatingActions from '../components/shared/FloatingActions';

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      Alert.alert('Error', 'No se pudieron cargar los productos.');
    }
  };

  const eliminarProducto = async (id) => {
    Alert.alert('¿Eliminar producto?', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await deleteDoc(doc(db, 'productos', id));
          cargarProductos();
        },
      },
    ]);
  };

  const editarProducto = async (item) => {
    const nuevoNombre = prompt('Editar nombre del producto:', item.nombre);
    if (nuevoNombre) {
      await updateDoc(doc(db, 'productos', item.id), { nombre: nuevoNombre });
      cargarProductos();
    }
  };

  // 🔁 Recarga cada vez que volvés a esta pantalla
  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de productos</Text>
      <TablaProductos
        productos={productos}
        editarProducto={editarProducto}
        eliminarProducto={eliminarProducto}
      />
      <FloatingActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});