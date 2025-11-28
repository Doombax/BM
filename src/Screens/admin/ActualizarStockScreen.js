import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, updateDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertaModal from '../../components/shared/AlertaModal';
import normalizeImageUri from '../../utils/imageHelpers';

export default function ActualizarStockScreen() {
    const [codigo, setCodigo] = useState('');
    const [productos, setProductos] = useState([]);
    const [stocks, setStocks] = useState({});
    const [filtrados, setFiltrados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'productos'));
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(lista);
            setFiltrados(lista);

            const inicial = {};
            lista.forEach((p) => {
                inicial[p.id] = String(p.stock ?? 0);
            });
            setStocks(inicial);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    const buscarPorCodigo = async () => {
        if (!codigo.trim()) {
            setFiltrados(productos);
            return;
        }
        try {
            const q = query(collection(db, 'productos'), where('codigo', '==', codigo.trim()));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const lista = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFiltrados(lista);

                const inicial = {};
                lista.forEach((p) => {
                    inicial[p.id] = String(p.stock ?? 0);
                });
                setStocks(inicial);
            } else {
                setFiltrados([]);
            }
        } catch (error) {
            console.error('Error al buscar producto:', error);
        }
    };

    const actualizarStock = async (productoId, nuevoStock, nombre) => {
        try {
            const parsed = parseInt(nuevoStock, 10);
            if (isNaN(parsed)) {
                setMensajeModal('Ingrese un número válido para el stock');
                setModalVisible(true);
                return;
            }

            await updateDoc(doc(db, 'productos', productoId), { stock: parsed });
            setMensajeModal(`Stock de ${nombre} actualizado a ${parsed}`);
            setModalVisible(true); // abrir modal boutique
            cargarProductos();
        } catch (error) {
            console.error('Error al actualizar stock:', error);
        }
    };

    const renderItem = ({ item }) => {

        const stock = stocks[item.id] ?? String(item.stock ?? 0);

        return (
            <View style={styles.card}>
                <Image source={{ uri: normalizeImageUri(item.foto) }} style={styles.imagen} />
                <View style={styles.info}>
                    <Text style={styles.nombre}>{item.nombre}</Text>
                    <Text style={styles.detalle}>Marca: {item.marca}</Text>
                    <Text style={styles.detalle}>Talla: {item.talla}</Text>
                    <View style={styles.stockRow}>
                        <TouchableOpacity onPress={() => {
                            const current = Number(stock) || 0;
                            const next = Math.max(0, current - 1);
                            setStocks({ ...stocks, [item.id]: String(next) });
                        }}>
                            <MaterialCommunityIcons name="minus-circle" size={28} color="#D96C9F" />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.stockInput}
                            keyboardType="numeric"
                            value={String(stock)}
                            onChangeText={(text) => {
                                const sanitized = text.replace(/[^0-9]/g, '');
                                setStocks({ ...stocks, [item.id]: sanitized });
                            }}
                        />

                        <TouchableOpacity onPress={() => {
                            const current = Number(stock) || 0;
                            const next = current + 1;
                            setStocks({ ...stocks, [item.id]: String(next) });
                        }}>
                            <MaterialCommunityIcons name="plus-circle" size={28} color="#D96C9F" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.botonActualizar}
                        onPress={() => actualizarStock(item.id, stock, item.nombre)}
                    >
                        <Text style={styles.botonTexto}>Actualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Actualizar Stock</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por código..."
                placeholderTextColor="#888"
                value={codigo}
                onChangeText={setCodigo}
            />
            <TouchableOpacity style={styles.botonBuscar} onPress={buscarPorCodigo}>
                <Text style={styles.botonTexto}>Buscar</Text>
            </TouchableOpacity>

            <FlatList
                data={filtrados}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* 👇 Modal boutique para alertas */}
            <AlertaModal
                visible={modalVisible}
                titulo="Stock actualizado"
                mensaje={mensajeModal}
                onCerrar={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    botonBuscar: {
        backgroundColor: '#D96C9F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        marginBottom: 12,
        borderRadius: 10,
        padding: 10,
    },
    imagen: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    nombre: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detalle: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 2,
    },
    stockRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 8,
    },
    stockInput: {
        backgroundColor: '#333',
        color: '#fff',
        padding: 8,
        borderRadius: 6,
        width: 60,
        textAlign: 'center',
    },
    botonActualizar: {
        backgroundColor: '#D96C9F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    botonTexto: {
        color: '#fff',
        fontWeight: '600',
    },
});