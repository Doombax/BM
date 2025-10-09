import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioPromedio = ({ cargarDatos }) => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");

    const guardarEdad = async () => {
        if (nombre && edad) {
            try {
                await addDoc(collection(db, "edades"), {
                    nombre: nombre,
                    edad: parseInt(edad),
                });
                setNombre("");
                setEdad("");
                cargarDatos();
            } catch (error) {
                console.error("Error al registrar edades:", error);
            }
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de edades</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la persona"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
            />
            <Button title="Guardar" onPress={guardarEdad} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
});

export default FormularioPromedio;