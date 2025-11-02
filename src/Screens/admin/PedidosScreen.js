import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';

export default function PedidosScreen() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'compras'));
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPedidos(lista);
        } catch (error) {
            console.error('Error al cargar pedidos:', error);
        }
    };

    const formatearFecha = (timestamp) => {
        if (!timestamp?.toDate) return '';
        const fecha = timestamp.toDate();
        return fecha.toLocaleDateString('es-NI', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{
                    uri: item.foto || 'https://via.placeholder.com/60x60?text=Sin+imagen',
                }}
                style={styles.imagen}
            />
            <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.cliente}>Cliente: {item.cliente}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
                <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Lista de Pedidos</Text>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        marginBottom: 12,
        borderRadius: 10,
        padding: 10,
    },
    imagen: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    info: {
        marginLeft: 12,
        justifyContent: 'center',
        flex: 1,
    },
    nombre: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cliente: {
        color: '#aaa',
        fontSize: 13,
        marginTop: 2,
    },
    precio: {
        color: '#D96C9F',
        fontSize: 14,
        marginTop: 4,
    },
    fecha: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
});