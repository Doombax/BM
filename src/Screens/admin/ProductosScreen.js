import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import CatalogoProductos from '../../components/admin/TablaProductos';
import FloatingActions from '../../components/shared/FloatingActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertaModalConfirmacion from '../../components/shared/AlertaModalConfirmacion';
import AlertaModal from '../../components/shared/AlertaModal';

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState('');
  const [alertaMensaje, setAlertaMensaje] = useState('');
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
      setAlertaTitulo('Error');
      setAlertaMensaje('No se pudieron cargar los productos.');
      setAlertaVisible(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  const confirmarEliminacion = (id) => {
    setProductoSeleccionado(id);
    setConfirmacionVisible(true);
  };

  const eliminarProducto = async () => {
    if (!productoSeleccionado) return;

    try {
      await deleteDoc(doc(db, 'productos', productoSeleccionado));
      await cargarProductos();
      setConfirmacionVisible(false);
      setProductoSeleccionado(null);
    } catch (error) {
      setConfirmacionVisible(false);
      setProductoSeleccionado(null);
      setAlertaTitulo('Error');
      setAlertaMensaje('No se pudo eliminar el producto.');
      setAlertaVisible(true);
    }
  };

  const editarProducto = (item) => {
    navigation.navigate('EditarProducto', { producto: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de productos</Text>
      <CatalogoProductos
        productos={productos}
        editarProducto={editarProducto}
        eliminarProducto={confirmarEliminacion}
      />
      <FloatingActions />

      <AlertaModalConfirmacion
        visible={confirmacionVisible}
        titulo="¿Eliminar producto?"
        mensaje="Esta acción no se puede deshacer."
        onCancelar={() => {
          setConfirmacionVisible(false);
          setProductoSeleccionado(null);
        }}
        onConfirmar={eliminarProducto}
      />

      <AlertaModal
        visible={alertaVisible}
        titulo={alertaTitulo}
        mensaje={alertaMensaje}
        onCerrar={() => setAlertaVisible(false)}
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