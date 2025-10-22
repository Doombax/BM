import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import FormularioProductos from "../components/FormularioProductos";
import TablaProductos from "../components/TablaProductos.js";

const Productos = () => {
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    foto: "",
  });

  const [productos, setProductos] = useState([]);
  const [modEdicion, setModEdicion] = useState(false);
  const [productoId, setProductoId] = useState(null);

  const manejoCambio = (nombre, valor) => {
    setNuevoProducto((prev) => ({
      ...prev,
      [nombre]: valor,
    }));
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5,
    });

    if (!resultado.canceled) {
      const base64 = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setNuevoProducto((prev) => ({ ...prev, foto: base64 }));
    }
  };

  const guardarProducto = async () => {
    try {
      const { codigo, nombre, categoria, descripcion, precio, stock, foto } = nuevoProducto;
      if (codigo && nombre && categoria && descripcion && precio && stock && foto) {
        await addDoc(collection(db, "productos"), {
          codigo,
          nombre,
          categoria,
          descripcion,
          precio: parseFloat(precio),
          stock: parseFloat(stock),
          foto,
        });
        setNuevoProducto({ codigo: "", nombre: "", categoria: "", descripcion: "", precio: "", stock: "", foto: "" });
        cargarDatos();
      } else {
        Alert.alert("Por favor, complete todos los campos.");
      }
    } catch (error) {
      console.error("Error al registrar producto:", error);
    }
  };

  const actualizarProducto = async () => {
    try {
      const { codigo, nombre, categoria, descripcion, precio, stock, foto } = nuevoProducto;
      if (codigo && nombre && categoria && descripcion && precio && stock && foto) {
        await updateDoc(doc(db, "productos", productoId), {
          codigo,
          nombre,
          categoria,
          descripcion,
          precio: parseFloat(precio),
          stock: parseFloat(stock),
          foto,
        });
        setNuevoProducto({ codigo: "", nombre: "", categoria: "", descripcion: "", precio: "", stock: "", foto: "" });
        setModEdicion(false);
        setProductoId(null);
        cargarDatos();
      } else {
        Alert.alert("Por favor, complete todos los campos.");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
    }
  };

  const editarProducto = (item) => {
    setNuevoProducto({
      codigo: item.codigo,
      nombre: item.nombre,
      categoria: item.categoria,
      descripcion: item.descripcion,
      precio: item.precio.toString(),
      stock: item.stock.toString(),
      foto: item.foto || "",
    });
    setProductoId(item.id);
    setModEdicion(true);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FormularioProductos
        nuevoProducto={nuevoProducto}
        manejoCambio={manejoCambio}
        guardarProducto={guardarProducto}
        actualizarProducto={actualizarProducto}
        modEdicion={modEdicion}
        seleccionarImagen={seleccionarImagen}
      />
      <TablaProductos
        productos={productos}
        eliminarProducto={eliminarProducto}
        editarProducto={editarProducto}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
});

export default Productos;