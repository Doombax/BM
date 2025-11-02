import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import FormularioProductos from "../../components/admin/FormularioProductos";
import CatalogoProductos from "../../components/admin/TablaProductos";

const Productos = () => {
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    foto: "",
    talla: "",
    marca: "",
    color: "",
  });

  const [productos, setProductos] = useState([]);
  const [modEdicion, setModEdicion] = useState(false);
  const [productoId, setProductoId] = useState(null);

  const manejoCambio = (campo, valor) => {
    setNuevoProducto((prev) => ({ ...prev, [campo]: valor }));
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.5 });
    if (!resultado.canceled) {
      const base64 = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setNuevoProducto((prev) => ({ ...prev, foto: base64 }));
    }
  };

  const guardarProducto = async () => {
    try {
      await addDoc(collection(db, "productos"), {
        ...nuevoProducto,
        precio: parseFloat(nuevoProducto.precio),
        stock: parseFloat(nuevoProducto.stock),
      });
      resetFormulario();
      cargarDatos();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el producto.");
    }
  };

  const actualizarProducto = async () => {
    if (!productoId) return;
    try {
      await updateDoc(doc(db, "productos", productoId), {
        ...nuevoProducto,
        precio: parseFloat(nuevoProducto.precio),
        stock: parseFloat(nuevoProducto.stock),
      });
      resetFormulario();
      cargarDatos();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el producto.");
    }
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    cargarDatos();
  };

  const editarProducto = (item) => {
    setNuevoProducto({
      codigo: item.codigo || "",
      nombre: item.nombre || "",
      categoria: item.categoria || "",
      precio: item.precio?.toString() || "",
      stock: item.stock?.toString() || "",
      foto: item.foto || "",
      talla: item.talla || "",
      marca: item.marca || "",
      color: item.color || "",
    });
    setProductoId(item.id);
    setModEdicion(true); // ✅ activa el formulario
  };

  const resetFormulario = () => {
    setNuevoProducto({
      codigo: "",
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      foto: "",
      talla: "",
      marca: "",
      color: "",
    });
    setProductoId(null);
    setModEdicion(false);
  };

  const cargarDatos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProductos(data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormularioProductos
          nuevoProducto={nuevoProducto}
          manejoCambio={manejoCambio}
          guardarProducto={guardarProducto}
          actualizarProducto={actualizarProducto}
          modEdicion={modEdicion}
          seleccionarImagen={seleccionarImagen}
        />
        <CatalogoProductos
          productos={productos}
          editarProducto={editarProducto}
          eliminarProducto={eliminarProducto}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
});

export default Productos;