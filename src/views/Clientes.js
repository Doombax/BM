import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import ListaClientes from "../components/ListaClientes.js";
import FormularioClientes from "../components/FormularioClientes.js";
import TablaClientes from "../components/TablaCliente.js";

const Clientes = () => {
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        telefono: "",
        cedula: "",
    });
    const [clientes, setClientes] = useState([]);
    const [modEdicion, setModEdicion] = useState(false);
    const [clienteId, setClienteId] = useState(null);

    const manejoCambio = (nombre, valor) => {
        setNuevoCliente((prev) => ({
            ...prev,
            [nombre]: valor,
        }));
    };

    const guardarCliente = async () => {
        try {
            if (nuevoCliente.nombre && nuevoCliente.apellido && nuevoCliente.edad && nuevoCliente.telefono && nuevoCliente.cedula) {
                await addDoc(collection(db, "clientes"), {
                    nombre: nuevoCliente.nombre,
                    apellido: nuevoCliente.apellido,
                    edad: parseFloat(nuevoCliente.edad),
                    telefono: parseFloat(nuevoCliente.telefono),
                    cedula: nuevoCliente.cedula,
                });
                setNuevoCliente({ nombre: "", apellido: "", edad: "", telefono: "", cedula: "" }); // Limpiar formulario
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al registrar cliente:", error);
        }
    };

    const actualizarCliente = async () => {
        try {
            if (nuevoCliente.nombre && nuevoCliente.apellido && nuevoCliente.edad && nuevoCliente.telefono && nuevoCliente.cedula) {
                await updateDoc(doc(db, "clientes", clienteId), {
                    nombre: nuevoCliente.nombre,
                    apellido: nuevoCliente.apellido,
                    edad: parseFloat(nuevoCliente.edad),
                    telefono: parseFloat(nuevoCliente.telefono),
                    cedula: nuevoCliente.cedula,
                });
                setNuevoCliente({ nombre: "", apellido: "", edad: "", telefono: "", cedula: "" });
                setModEdicion(false);
                setClienteId(null);
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
        }
    };

    const eliminarCliente = async (id) => {
        try {
            await deleteDoc(doc(db, "clientes", id));
            cargarDatos(); // Recargar la lista
        } catch (error) {
            console.error("Error al eliminar;", error);
        }
    };

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "clientes"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClientes(data);
        } catch (error) {
            console.error("Error al obtener documentos: ", error);
        }
    };

    const editarCliente = (item) => {
        setNuevoCliente({
            nombre: item.nombre,
            apellido: item.apellido,
            edad: item.edad.toString(),
            telefono: item.telefono.toString(),
            cedula: item.cedula,
        });
        setClienteId(item.id);
        setModEdicion(true);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioClientes
                nuevoCliente={nuevoCliente}
                manejoCambio={manejoCambio}
                guardarCliente={guardarCliente}
                actualizarCliente={actualizarCliente}
                modEdicion={modEdicion}
            />
            <TablaClientes
                clientes={clientes}
                eliminarCliente={eliminarCliente}
                editarCliente={editarCliente}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Clientes;