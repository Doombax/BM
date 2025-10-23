import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import FormularioProductos from "../components/FormularioProductos";
import TablaProductos from "../components/TablaProductos.js";

const Productos = ({}) => {
    const [nuevoProducto, setNuevoProducto] = useState({
        codigo: "",
        nombre: "",
        categoria:"",
        descripcion: "",
        precio: "",
        stock: "",
    });
    const [productos, setProductos] = useState([]);
    const [modEdicion, setModEdicion] = useState(false);
    const [productoId, setProductoId] = useState(null);
    const [vista, setVista] = useState("list");


    const manejoCambio = (nombre, valor) => {
        setNuevoProducto((prev) => ({
            ...prev,
            [nombre]: valor,
        }));
    };

    const guardarProducto = async () => {
        try {
            if (nuevoProducto.codigo && nuevoProducto.nombre && nuevoProducto.categoria && nuevoProducto.descripcion && nuevoProducto.precio && nuevoProducto.stock) {
                await addDoc(collection(db, "productos"), {
                    nombre: nuevoProducto.nombre,
                    codigo:nuevoProducto.codigo,
                    categoria:nuevoProducto.categoria,
                    descripcion: nuevoProducto.descripcion,
                    precio: parseFloat(nuevoProducto.precio),
                    stock: parseFloat(nuevoProducto.stock),
                });
                setNuevoProducto({codigo: "", nombre: "", categoria: "", descripcion: "", precio: "", stock: "",}); // Limpiar formulario
                setVista("list")
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al registrar producto:", error);
        }
    };

    const actualizarProducto = async () => {
        try {
            if (nuevoProducto.codigo && nuevoProducto.nombre && nuevoProducto.categoria && nuevoProducto.descripcion && nuevoProducto.precio && nuevoProducto.stock) {
                await updateDoc(doc(db, "productos", productoId), {
                    nombre: nuevoProducto.nombre,
                    codigo:nuevoProducto.codigo,
                    categoria:nuevoProducto.categoria,
                    descripcion: nuevoProducto.descripcion,
                    precio: parseFloat(nuevoProducto.precio),
                    stock: parseFloat(nuevoProducto.stock),
                });
                setNuevoProducto({ codigo: "", nombre: "", categoria: "", descripcion: "", precio: "", stock: "",});
                setModEdicion(false);
                setProductoId(null);
                setVista("add");
                cargarDatos(); // Recargar lista
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
            cargarDatos(); // Recargar la lista
        } catch (error) {
            console.error("Error al eliminar;", error);
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
        });
        setProductoId(item.id);
        setModEdicion(true);
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