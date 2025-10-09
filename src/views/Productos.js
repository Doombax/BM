import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import FormularioProductos from "../components/FormularioProductos";
import TablaProductos from "../components/TablaProductos.js";

const Productos = () => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: ""
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

    const guardarProducto = async () => {
        try {
            if (nuevoProducto.nombre && nuevoProducto.descripcion && nuevoProducto.precio && nuevoProducto.stock) {
                await addDoc(collection(db, "productos"), {
                    nombre: nuevoProducto.nombre,
                    descripcion: nuevoProducto.descripcion,
                    precio: parseFloat(nuevoProducto.precio),
                    stock: parseFloat(nuevoProducto.stock),
                });
                setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "" }); // Limpiar formulario
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
            if (nuevoProducto.nombre && nuevoProducto.descripcion && nuevoProducto.precio && nuevoProducto.stock) {
                await updateDoc(doc(db, "productos", productoId), {
                    nombre: nuevoProducto.nombre,
                    descripcion: nuevoProducto.descripcion,
                    precio: parseFloat(nuevoProducto.precio),
                    stock: parseFloat(nuevoProducto.stock),
                });
                setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "" });
                setModEdicion(false);
                setProductoId(null);
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
            nombre: item.nombre,
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
        <View style={styles.container}>
            <FormularioProductos
                nuevoProducto={nuevoProducto}
                manejoCambio={manejoCambio}
                guardarProducto={guardarProducto}
                actualizarProducto={actualizarProducto}
                modEdicion={modEdicion}
            />
            <TablaProductos
                productos={productos}
                eliminarProducto={eliminarProducto}
                editarProducto={editarProducto}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Productos;