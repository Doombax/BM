import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function ComprasClienteScreen() {
    const [compras, setCompras] = useState([]);

    const cargarCompras = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const snapshot = await getDocs(collection(db, "usuarios", user.uid, "compras"));
            const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCompras(lista);
        } catch (error) {
            console.error("Error cargando compras:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            cargarCompras();
        }, [])
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.fecha}>
                {new Date(item.fecha.seconds * 1000).toLocaleString()}
            </Text>

            {item.productos.map((p, i) => (
                <View key={i} style={styles.productoBox}>
                    <Image source={{ uri: p.foto }} style={styles.imagen} resizeMode="cover" />
                    <View style={styles.info}>
                        <Text style={styles.nombre}>{p.nombre}</Text>
                        <Text style={styles.detalle}>Cantidad: {p.cantidad}</Text>
                        <Text style={styles.detalle}>Precio unitario: ${p.precioUnitario}</Text>
                        <Text style={styles.subtotal}>Subtotal: ${p.subtotal}</Text>
                    </View>
                </View>
            ))}

            <Text style={styles.total}>Total: ${item.total}</Text>
            <Text style={styles.estado}>Estado: {item.estado}</Text>

            {item.mensaje && (
                <Text style={styles.mensaje}>{item.mensaje}</Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Mis Compras</Text>
            {compras.length === 0 ? (
                <Text style={styles.vacio}>No tienes compras registradas aún.</Text>
            ) : (
                <FlatList
                    data={compras}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    titulo: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 12,
    },
    card: {
        backgroundColor: "#1E1E1E",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    fecha: {
        color: "#aaa",
        marginBottom: 6,
    },
    productoBox: {
        flexDirection: "row",
        marginBottom: 8,
    },
    imagen: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: "#333",
    },
    info: {
        flex: 1,
    },
    nombre: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    detalle: {
        color: "#aaa",
        fontSize: 14,
    },
    subtotal: {
        color: "#D96C9F",
        fontWeight: "600",
        marginTop: 2,
    },
    total: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginTop: 6,
    },
    estado: {
        color: "#aaa",
        fontSize: 14,
        marginTop: 4,
    },
    mensaje: {
        color: "#D96C9F",
        fontSize: 14,
        marginTop: 4,
        fontStyle: "italic",
    },
    vacio: {
        color: "#888",
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
    },
});