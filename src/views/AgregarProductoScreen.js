import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../database/firebaseConfig';
import FormularioProductos from '../components/admin/FormularioProductos';

export default function AgregarProductoScreen({ navigation }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: '',
    stock: '',
    foto: '',
  });

  const manejoCambio = (nombre, valor) => {
    setNuevoProducto((prev) => ({ ...prev, [nombre]: valor }));
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para seleccionar una imagen.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      const base64 = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setNuevoProducto((prev) => ({ ...prev, foto: base64 }));
    }
  };

  const guardarProducto = async () => {
    const { codigo, nombre, categoria, descripcion, precio, stock, foto } = nuevoProducto;

    if (!codigo || !nombre || !categoria || !descripcion || !precio || !stock || !foto) {
      Alert.alert('Campos incompletos', 'Por favor, completá todos los campos antes de guardar.');
      return;
    }

    try {
      await addDoc(collection(db, 'productos'), {
        codigo,
        nombre,
        categoria,
        descripcion,
        precio: parseFloat(precio),
        stock: parseFloat(stock),
        foto,
      });

      Alert.alert('Producto agregado', 'El producto se guardó correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      Alert.alert('Error', 'No se pudo guardar el producto. Intenta nuevamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormularioProductos
        nuevoProducto={nuevoProducto}
        manejoCambio={manejoCambio}
        guardarProducto={guardarProducto}
        modEdicion={false}
        seleccionarImagen={seleccionarImagen}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
});