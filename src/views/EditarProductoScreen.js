import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';
import FormularioProducto from '../components/admin/FormularioProductos';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function EditarProductoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { producto } = route.params;

  const [datosProducto, setDatosProducto] = useState(producto);
  const [listaCategorias, setListaCategorias] = useState([]);

  const cargarCategorias = async () => {
    const snapshot = await getDocs(collection(db, 'categoria'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setListaCategorias(data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejoCambio = (nombre, valor) => {
    setDatosProducto((prev) => ({ ...prev, [nombre]: valor }));
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos.');
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
      codigo, nombre, categoria,
      precio, stock, foto, talla, marca, color
    } = datosProducto;

    if (!codigo || !nombre || !categoria || !precio || !stock || !foto) {
      Alert.alert('Campos incompletos', 'Por favor, completá todos los campos obligatorios.');
      return;
    }

    if (!producto?.id) {
      Alert.alert('Error', 'No se encontró el ID del producto.');
      return;
    }

    try {
      await updateDoc(doc(db, 'productos', producto.id), {
        codigo,
        nombre,
        categoria,
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
      Alert.alert('Error', 'No se pudo actualizar el producto.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <FormularioProducto
          nuevoProducto={datosProducto}
          manejoCambio={manejoCambio}
          guardarProducto={actualizarProducto}
          seleccionarImagen={seleccionarImagen}
          modEdicion={true}
          listaCategorias={listaCategorias}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
});