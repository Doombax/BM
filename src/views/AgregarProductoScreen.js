import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';
import FormularioProducto from '../components/admin/FormularioProductos';
import AlertaModal from '../components/shared/AlertaModal';

export default function AgregarProductoScreen() {
  const navigation = useNavigation();

  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    talla: '',
    marca: '',
    color: '',
    foto: '',
  });

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

  const manejoCambio = (campo, valor) => {
    setNuevoProducto((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarProducto = async () => {
    const { codigo, nombre, categoria, precio, stock, foto } = nuevoProducto;

    if (!codigo || !nombre || !categoria || !precio || !stock || !foto) {
      setAlertaTitulo('Campos incompletos');
      setAlertaMensaje('Por favor, completá todos los campos obligatorios.');
      setAlertaVisible(true);
      return;
    }

    try {
      await addDoc(collection(db, 'productos'), {
        ...nuevoProducto,
        precio: parseFloat(precio),
        stock: parseFloat(stock),
      });

      setAlertaTitulo('Producto guardado');
      setAlertaMensaje('El producto se agregó correctamente.');
      setAlertaVisible(true);
    } catch (error) {
      setAlertaTitulo('Error');
      setAlertaMensaje('No se pudo guardar el producto.');
      setAlertaVisible(true);
    }
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      setAlertaTitulo('Permiso denegado');
      setAlertaMensaje('Se necesita acceso a la galería.');
      setAlertaVisible(true);
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets?.length > 0) {
      const uri = resultado.assets[0].uri;
      setNuevoProducto((prev) => ({ ...prev, foto: uri }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FormularioProducto
          nuevoProducto={nuevoProducto}
          manejoCambio={manejoCambio}
          guardarProducto={guardarProducto}
          seleccionarImagen={seleccionarImagen}
          modEdicion={false}
          listaCategorias={listaCategorias}
        />
        <AlertaModal
          visible={alertaVisible}
          titulo={alertaTitulo}
          mensaje={alertaMensaje}
          onCerrar={() => {
            setAlertaVisible(false);
            if (alertaTitulo === 'Producto guardado') navigation.goBack();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}