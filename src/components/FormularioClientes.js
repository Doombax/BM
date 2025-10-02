import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioClientes = ({ cargarDatos }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [cedula, setCedula] = useState("");


    const guardarCliente = async () => {
        if (nombre && apellido && edad && telefono && cedula) {
            try {
                await addDoc(collection(db, "clientes"), {
                    nombre: nombre,
                    apellido: apellido,
                    edad: Number(edad),
                    telefono: Number(telefono),
                    cedula: cedula,
                });
                setNombre("");
                setApellido("");
                setEdad("");
                setTelefono("");
                setCedula("");
                cargarDatos(); // Volver a cargar la lista
            } catch (error) {
                console.error("Error al registrar clientes:", error);
            }
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de clientes</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombres"
                value={nombre}
                onChangeText={setNombre}
            />
             <TextInput
                style={styles.input}
                placeholder="Apellidos"
                value={apellido}
                onChangeText={setApellido}
            />
             <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Cedula"
                value={cedula}
                onChangeText={setCedula}
            />
            <Button title="Guardar" onPress={guardarCliente} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});

export default FormularioClientes;