import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import FormularioProducto from '../../components/admin/FormularioProductos';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import AlertaModal from '../../components/shared/AlertaModal';

export default function EditarProductoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { producto } = route.params;

  const [datosProducto, setDatosProducto] = useState(producto);
  const [listaCategorias, setListaCategorias] = useState([]);

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState('');
  const [alertaMensaje, setAlertaMensaje] = useState('');

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'categoria'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          categoria: doc.data().categoria,
        }));
        setListaCategorias(data);
      } catch (error) {
        setAlertaTitulo('Error');
        setAlertaMensaje('No se pudieron cargar las categorías.');
        setAlertaVisible(true);
      }
    };

    cargarCategorias();
  }, []);

  const manejoCambio = (nombre, valor) => {
    setDatosProducto((prev) => ({ ...prev, [nombre]: valor }));
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      setAlertaTitulo('Permiso denegado');
      setAlertaMensaje('Necesitamos acceso a tus fotos.');
      setAlertaVisible(true);
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
      setAlertaTitulo('Campos incompletos');
      setAlertaMensaje('Por favor, completá todos los campos obligatorios.');
      setAlertaVisible(true);
      return;
    }

    if (!producto?.id) {
      setAlertaTitulo('Error');
      setAlertaMensaje('No se encontró el ID del producto.');
      setAlertaVisible(true);
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

      setAlertaTitulo('Producto actualizado');
      setAlertaMensaje('Los cambios se guardaron correctamente.');
      setAlertaVisible(true);
    } catch (error) {
      setAlertaTitulo('Error');
      setAlertaMensaje('No se pudo actualizar el producto.');
      setAlertaVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FormularioProducto
          nuevoProducto={datosProducto}
          manejoCambio={manejoCambio}
          guardarProducto={actualizarProducto}
          seleccionarImagen={seleccionarImagen}
          modEdicion={true}
          listaCategorias={listaCategorias}
        />
        <AlertaModal
          visible={alertaVisible}
          titulo={alertaTitulo}
          mensaje={alertaMensaje}
          onCerrar={() => {
            setAlertaVisible(false);
            if (alertaTitulo === 'Producto actualizado') navigation.goBack();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});