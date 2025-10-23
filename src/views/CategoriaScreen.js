import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { db } from '../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import TablaCategorias from '../components/admin/TablaCategoria';
import FloatingActions from '../components/shared/FloatingActions';

export default function CategoriaScreen() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    const snapshot = await getDocs(collection(db, 'categoria'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategorias(data);
  };

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

  const editarCategoria = async (item) => {
    const nuevoNombre = prompt('Editar categoría:', item.categoria);
    if (nuevoNombre) {
      await updateDoc(doc(db, 'categoria', item.id), { categoria: nuevoNombre });
      cargarCategorias();
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de categorías</Text>
      <TablaCategorias
        categorias={categorias}
        eliminarCategoria={eliminarCategoria}
        editarCategoria={editarCategoria}
      />
      <FloatingActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});