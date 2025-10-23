import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';
import FormularioProductos from '../components/admin/FormularioProducto';
import * as ImagePicker from 'expo-image-picker';

export default function EditarProductoScreen({ route, navigation }) {
  const { producto } = route.params;
  const [datosProducto, setDatosProducto] = useState(producto);

  const manejoCambio = (nombre, valor) => {
    setDatosProducto((prev) => ({ ...prev, [nombre]: valor }));
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
      setDatosProducto((prev) => ({ ...prev, foto: base64 }));
    }
  };

  const actualizarProducto = async () => {
    const {
      codigo, nombre, categoria, descripcion,
      precio, stock, foto, talla, marca, color
    } = datosProducto;

    if (!codigo || !nombre || !categoria || !descripcion || !precio || !stock || !foto) {
      Alert.alert('Campos incompletos', 'Por favor, completá todos los campos antes de actualizar.');
      return;
    }

    try {
      await updateDoc(doc(db, 'productos', producto.id), {
        codigo,
        nombre,
        categoria,
        descripcion,
        precio: parseFloat(precio),
        stock: parseFloat(stock),
        foto,
        talla,
        marca,
        color,
      });

      Alert.alert('Producto actualizado', 'Los cambios se guardaron correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormularioProductos
        nuevoProducto={datosProducto}
        manejoCambio={manejoCambio}
        guardarProducto={actualizarProducto}
        seleccionarImagen={seleccionarImagen}
        modEdicion={true}
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