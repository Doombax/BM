import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { db } from '../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import CatalogoProductos from '../components/admin/TablaProductos';
import FloatingActions from '../components/shared/FloatingActions';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();

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
          try {
            await deleteDoc(doc(db, 'productos', id));
            await cargarProductos();
          } catch (error) {
            console.error('Error al eliminar producto:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto.');
          }
        },
      },
    ]);
  };

  const editarProducto = (item) => {
    navigation.navigate('EditarProducto', { producto: item });
  };

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de productos</Text>
      <CatalogoProductos
        productos={productos}
        editarProducto={editarProducto}
        eliminarProducto={eliminarProducto}
      />
      <FloatingActions />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});