import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonEliminarEdad from './BotonEliminarEdad';

const TablaPromedio = ({ promedio = [], eliminarPromedio }) => {
    if (!Array.isArray(promedio)) return <Text>No hay datos</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tabla de edades</Text>
            <View style={[styles.fila, styles.encabezado]}>
                <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
            </View>
            <ScrollView>
                {promedio.length > 0 ? (
                    promedio.map((item) => (
                        <View key={item.id} style={styles.fila}>
                            <Text style={styles.celda}>{item.nombre || 'N/A'}</Text>
                            <Text style={styles.celda}>{item.edad || 'N/A'}</Text>
                            <View style={styles.celdaAcciones}>
                                <BotonEliminarEdad
                                    id={item.id}
                                    eliminarPromedio={eliminarPromedio}
                                />
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.sinDatos}>No hay registros</Text>
                )}
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
        fontSize: 16,
        textAlign: "center"
    },
    celdaAcciones: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textoEncabezado: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
    sinDatos: {
        textAlign: "center",
        fontStyle: "italic",
        padding: 20
    }
});

export default TablaPromedio;