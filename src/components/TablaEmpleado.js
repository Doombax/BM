
import React from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import BotonEliminarEmpleado from './BotonEliminarEmpleado';


const TablaEmpleados = ({ empleados, eliminarEmpleado, editarEmpleado }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tabla de empleados</Text>
            {/* Encabezado de la tabla */}
            <View style={[styles.fila, styles.encabezado]}>
                <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Apellido</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Telefono</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Cedula</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>cargo</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
            </View>
            {/* Contenido de la tabla */}
            <ScrollView>
                {empleados.map((item) => (
                    <View key={item.id} style={styles.fila}>
                        <Text style={styles.celda}>{item.nombre}</Text>
                        <Text style={styles.celda}>{item.apellido}</Text>
                        <Text style={styles.celda}>{item.edad}</Text>
                        <Text style={styles.celda}>{item.telefono}</Text>
                        <Text style={styles.celda}>{item.cedula}</Text>
                        <Text style={styles.celda}>{item.cargo}</Text>
                        <View style={styles.celdaAcciones}>
                            <TouchableOpacity
                                style={styles.botonActualizar}
                                onPress={() => editarEmpleado(item)}
                            >
                                <Text>✏️</Text>
                            </TouchableOpacity>
                            <BotonEliminarEmpleado
                                id={item.id}
                                eliminarEmpleado={eliminarEmpleado}
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
    }
});

export default TablaEmpleados;