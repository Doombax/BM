import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioEmpleados = ({ nuevoEmpleado, manejoCambio, guardarEmpleado, actualizarEmpleado, modEdicion }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {modEdicion ? "Actualizar empleado" : "Registro de empleado"}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nombres del empleado"
                value={nuevoEmpleado.nombre}
                onChangeText={(nombre) => manejoCambio('nombre', nombre)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellidos del empleado"
                value={nuevoEmpleado.apellido}
                onChangeText={(apellido) => manejoCambio('apellido', apellido)}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                keyboardType="numeric"
                value={nuevoEmpleado.edad}
                onChangeText={(edad) => manejoCambio('edad', edad)}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefono"
                keyboardType="numeric"
                value={nuevoEmpleado.telefono}
                onChangeText={(telefono) => manejoCambio('telefono', telefono)}
            />
             <TextInput
                style={styles.input}
                placeholder="Cedula"
                value={nuevoEmpleado.cedula}
                onChangeText={(cedula) => manejoCambio('cedula', cedula)}
            />
            <TextInput
                style={styles.input}
                placeholder="Cargo del empleado"
                value={nuevoEmpleado.cargo}
                onChangeText={(cargo) => manejoCambio('cargo', cargo)}
            />
            <Button
                title={modEdicion ? "Actualizar" : "Guardar"}
                onPress={modEdicion ? actualizarEmpleado : guardarEmpleado}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});

export default FormularioEmpleados;