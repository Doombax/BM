import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import FormularioProductos from "../components/admin/FormularioProductos";

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


    useEffect(() => {
        cargarDatos();
    }, []);

    return (
  <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      {/* Selector Superior */}
      <View style={styles.tabWrapper}>
        <TouchableOpacity
          style={[styles.tabButton, vista === "list" ? styles.tabActive : null]}
          onPress={() => {
            setVista("list");
            setModEdicion(false);
            setNuevoProducto({
              codigo: "",
              nombre: "",
              categoria: "",
              descripcion: "",
              precio: "",
              stock: "",
            });
          }}
        >
          <Text style={[styles.tabText, vista === "list" && styles.tabTextActive]}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, vista === "add" ? styles.tabActive : null]}
          onPress={() => {
            setVista("add");
            setModEdicion(false);
          }}
        >
          <Text style={[styles.tabText, vista === "add" && styles.tabTextActive]}>Agregar Productos</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {vista === "list" ? (
          <TablaProductos
            productos={productos}
            eliminarProducto={eliminarProducto}
            editarProducto={editarProducto}
          />
        ) : (
          <FormularioProductos
            nuevoProducto={nuevoProducto}
            manejoCambio={manejoCambio}
            guardarProducto={guardarProducto}
            actualizarProducto={actualizarProducto}
            modEdicion={modEdicion}
          />
        )}
      </View>
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#1A1018" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 18 },
  tabWrapper: {
    flexDirection: "row",
    backgroundColor: "#161617",
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
  },
  tabButton: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  tabActive: { backgroundColor: "#7B2CBF" },
  tabText: { color: "#9aa0a6", fontWeight: "600", fontSize: 15 },
  tabTextActive: { color: "#FFFFFF" },
  content: { flex: 1 },
});

export default Productos;