import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BotonEliminarCategoria  from './BotonEliminarCategoria'; // Ajusta la ruta si es necesario

const TablaCategorias = ({ categorias, eliminarCategoria, editarCategoria }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tabla de Categorias</Text>
            {/* Encabezado de la tabla */}
            <View style={[styles.fila, styles.encabezado]}>
                <Text style={[styles.celda, styles.textoEncabezado]}>Categoria</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
            </View>
            {/* Contenido de la tabla */}
            <ScrollView>
                {categorias.map((item) => (
                    <View key={item.id} style={styles.fila}>
                        <Text style={styles.celda}>{item.categoria}</Text>
                        <View style={styles.celdaAcciones}>
                            <TouchableOpacity
                                style={styles.botonActualizar}
                                onPress={() => editarCategoria(item)}
                            >
                                <Text>✏️</Text>
                            </TouchableOpacity>
                            <BotonEliminarCategoria
                                id={item.id}
                                eliminarCategoria={eliminarCategoria}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignSelf: "stretch"
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    fila: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#CCC",
        paddingVertical: 6,
        alignItems: "center"
    },
    encabezado: {
        backgroundColor: "#F0F0F0"
    },
    celda: {
        flex: 1,
        fontSize: 10,
        textAlign: "center"
    },
    celdaAcciones: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },
    textoEncabezado: {
        fontWeight: "bold",
        fontSize: 8,
        textAlign: "center"
    },
    botonActualizar: {
        padding: 4,
        backgroundColor: "#f3f3f7",
        borderRadius: 5,
        marginRight: 5
    }
});

export default TablaCategorias;