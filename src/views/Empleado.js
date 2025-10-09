import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import FormularioEmpleados from "../components/FormularioEmpleado.js";
import TablaEmpleados from "../components/TablaEmpleado.js";

const Empleados = () => {
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        telefono: "",
        cedula: "",
        cargo: "",
    });
    const [empleados, setEmpleados] = useState([]);
    const [modEdicion, setModEdicion] = useState(false);
    const [empleadoId, setEmpleadoId] = useState(null);

    const manejoCambio = (nombre, valor) => {
        setNuevoEmpleado((prev) => ({
            ...prev,
            [nombre]: valor,
        }));
    };

    const guardarEmpleado = async () => {
        try {
            if (nuevoEmpleado.nombre && nuevoEmpleado.apellido && nuevoEmpleado.edad && nuevoEmpleado.telefono && nuevoEmpleado.cedula && nuevoEmpleado.cargo) {
                await addDoc(collection(db, "empleados"), {
                    nombre: nuevoEmpleado.nombre,
                    apellido: nuevoEmpleado.apellido,
                    edad: parseFloat(nuevoEmpleado.edad),
                    telefono: parseFloat(nuevoEmpleado.telefono),
                    cedula: nuevoEmpleado.cedula,
                    cargo: nuevoEmpleado.cargo,
                });
                setNuevoEmpleado({ nombre: "", apellido: "", edad: "", telefono: "", cedula: "", cargo: "" }); // Limpiar formulario
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al registrar empleado:", error);
        }
    };

    const actualizarEmpleado = async () => {
        try {
            if (nuevoEmpleado.nombre && nuevoEmpleado.apellido && nuevoEmpleado.edad && nuevoEmpleado.telefono && nuevoEmpleado.cedula && nuevoEmpleado.cargo) {
                await updateDoc(doc(db, "empleados", empleadoId), {
                    nombre: nuevoEmpleado.nombre,
                    apellido: nuevoEmpleado.apellido,
                    edad: parseFloat(nuevoEmpleado.edad),
                    telefono: parseFloat(nuevoEmpleado.telefono),
                    cedula: nuevoEmpleado.cedula,
                    cargo: nuevoEmpleado.cargo,
                });
                setNuevoEmpleado({ nombre: "", apellido: "", edad: "", telefono: "", cedula: "", cargo: "" });
                setModEdicion(false);
                setEmpleadoId(null);
                cargarDatos(); // Recargar lista
            } else {
                Alert.alert("Por favor, complete todos los campos.");
            }
        } catch (error) {
            console.error("Error al actualizar empleado:", error);
        }
    };

    const eliminarEmpleado = async (id) => {
        try {
            await deleteDoc(doc(db, "empleados", id));
            cargarDatos(); // Recargar la lista
        } catch (error) {
            console.error("Error al eliminar;", error);
        }
    };

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "empleados"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEmpleados(data);
        } catch (error) {
            console.error("Error al obtener documentos: ", error);
        }
    };

    const editarEmpleado = (item) => {
        setNuevoEmpleado({
            nombre: item.nombre,
            apellido: item.apellido,
            edad: item.edad.toString(),
            telefono: item.telefono.toString(),
            cedula: item.cedula,
            cargo: item.cargo,
        });
        setEmpleadoId(item.id);
        setModEdicion(true);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioEmpleados
                nuevoEmpleado={nuevoEmpleado}
                manejoCambio={manejoCambio}
                guardarEmpleado={guardarEmpleado}
                actualizarEmpleado={actualizarEmpleado}
                modEdicion={modEdicion}
            />
            <TablaEmpleados
                empleados={empleados}
                eliminarEmpleado={eliminarEmpleado}
                editarEmpleado={editarEmpleado}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Empleados;