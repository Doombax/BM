import React, { useState, useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { db } from '../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import TablaCategorias from '../components/admin/TablaCategoria';
import FloatingActions from '../components/shared/FloatingActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AlertaModalConfirmacion from '../components/shared/AlertaModalConfirmacion';

export default function CategoriaScreen() {
  const [categorias, setCategorias] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
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

  const confirmarEliminacion = (id) => {
    setCategoriaSeleccionada(id);
    setAlertaVisible(true);
  };

  const eliminarCategoria = async () => {
    if (!categoriaSeleccionada) return;
    await deleteDoc(doc(db, 'categoria', categoriaSeleccionada));
    setAlertaVisible(false);
    setCategoriaSeleccionada(null);
    cargarCategorias();
  };

  const editarCategoria = (item) => {
    navigation.navigate('EditarCategoria', { categoria: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de categorías</Text>
      <TablaCategorias
        categorias={categorias}
        eliminarCategoria={confirmarEliminacion}
        editarCategoria={editarCategoria}
      />
      <FloatingActions />

      <AlertaModalConfirmacion
        visible={alertaVisible}
        titulo="¿Eliminar categoría?"
        mensaje="Esta acción no se puede deshacer."
        onCancelar={() => {
          setAlertaVisible(false);
          setCategoriaSeleccionada(null);
        }}
        onConfirmar={eliminarCategoria}
      />
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