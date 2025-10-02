// components/TablaProductos.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonEliminarProducto from './BotonEliminarProducto';  // Ajusta la ruta si es necesario

const TablaProductos = ({ productos, eliminarProducto }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tabla de Productos</Text>
            {/* Encabezado de la tabla */}
            <View style={[styles.fila, styles.encabezado]}>
                <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Descripción</Text> 
                <Text style={[styles.celda, styles.textoEncabezado]}>Precio</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Stock</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
            </View>
            {/* Contenido de la tabla */}
            <ScrollView>
                {productos.map((item) => (
                    <View key={item.id} style={styles.fila}>
                        <Text style={styles.celda}>{item.nombre}</Text>
                        <Text style={styles.celda}>{item.descripcion}</Text>
                        <Text style={styles.celda}>{item.precio}</Text>
                        <Text style={styles.celda}>{item.stock}</Text>
                        <View style={styles.celdaAcciones}> 
                            <BotonEliminarProducto 
                                id={item.id}  // ← CLAVE: Cambia de item={item.id} a id={item.id}
                                eliminarProducto={eliminarProducto}
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

export default TablaProductos;