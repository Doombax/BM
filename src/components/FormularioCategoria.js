import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const FormularioCategorias = ({ nuevaCategoria, manejoCambio, guardarCategoria, actualizarCategoria, modEdicion }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {modEdicion ? "Actualizar Categoria" : "Registro de Categoria"}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Categoria"
                value={nuevaCategoria.categoria}
                onChangeText={(categoria) => manejoCambio('categoria', categoria)}
            />
            <Button
                title={modEdicion ? "Actualizar" : "Guardar"}
                onPress={modEdicion ? actualizarCategoria : guardarCategoria}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});

export default FormularioCategorias;