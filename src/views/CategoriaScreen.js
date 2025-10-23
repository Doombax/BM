import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { db } from '../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import TablaCategorias from '../components/admin/TablaCategoria';
import FloatingActions from '../components/shared/FloatingActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function CategoriaScreen() {
  const [categorias, setCategorias] = useState([]);
  const navigation = useNavigation();

  const cargarCategorias = async () => {
    const snapshot = await getDocs(collection(db, 'categoria'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategorias(data);
  };

  useFocusEffect(
    useCallback(() => {
      cargarCategorias();
    }, [])
  );

  const eliminarCategoria = async (id) => {
    Alert.alert('¿Eliminar categoría?', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await deleteDoc(doc(db, 'categoria', id));
          cargarCategorias();
        },
      },
    ]);
  };

  const editarCategoria = (item) => {
    navigation.navigate('EditarCategoria', { categoria: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de categorías</Text>
      <TablaCategorias
        categorias={categorias}
        eliminarCategoria={eliminarCategoria}
        editarCategoria={editarCategoria}
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