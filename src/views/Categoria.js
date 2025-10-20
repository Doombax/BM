import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Button } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import FormularioCategorias from "../components/FormularioCategoria.js";
import TablaCategorias from "../components/TablaCategoria.js";


const Categoria = ({}) => {
    const [nuevaCategoria, setNuevaCategoria] = useState({
        categoria:"",
    });
    const [categoria, setCategoria] = useState([]);
    const [modEdicion, setModEdicion] = useState(false);
    const [categoriaId, setCategoriaId] = useState(null);

    const manejoCambio = (nombre, valor) => {
        setNuevaCategoria((prev) => ({
            ...prev,
            [nombre]: valor,
        }));
    };

    const guardarCategoria = async () => {
        try {
            if (nuevaCategoria.categoria ) {
                await addDoc(collection(db, "categoria"), {
                    categoria:nuevaCategoria.categoria,
                });
                setNuevaCategoria({categoria: "", }); // Limpiar formulario
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al registrar producto:", error);
        }
    };

    const actualizarCategoria = async () => {
        try {
            if (nuevaCategoria.categoria) {
                await updateDoc(doc(db, "categoria", categoriaId), {
                    categoria:nuevaCategoria.categoria,
                });
                setNuevaCategoria({categoria: "", });
                setModEdicion(false);
                setCategoriaId(null);
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            await deleteDoc(doc(db, "categoria", id));
            cargarDatos(); // Recargar la lista
        } catch (error) {
            console.error("Error al eliminar;", error);
        }
    };

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "categoria"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategoria(data);
        } catch (error) {
            console.error("Error al obtener documentos: ", error);
        }
    };

    const editarCategoria = (item) => {
        setNuevaCategoria({
            categoria: item.categoria,
        });
        setCategoriaId(item.id);
        setModEdicion(true);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioCategorias
                nuevaCategoria={nuevaCategoria}
                manejoCambio={manejoCambio}
                guardarCategoria={guardarCategoria}
                actualizarCategoria={actualizarCategoria}
                modEdicion={modEdicion}
            />
            <TablaCategorias
                categorias={categoria}
                eliminarCategoria={eliminarCategoria}
                editarCategoria={editarCategoria}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Categoria;