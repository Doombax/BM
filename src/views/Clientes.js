import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import ListaClientes from "../components/ListaClientes.js";
import FormularioClientes from "../components/FormularioClientes.js";
import TablaClientes from "../components/TablaCliente.js";

const Clientes = () => {
    const [clientes, setClientes] = useState([]);

     const eliminarCliente = async (id) => {
            try {
                await deleteDoc(doc(db, "clientes", id));
                cargarDatos(); //recargar la lista
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
    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioClientes cargarDatos={cargarDatos} />
            <TablaClientes clientes={clientes}
                eliminarCliente={eliminarCliente} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Clientes;