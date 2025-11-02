import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import CategoriaCliente from '../../components/cliente/CategoriaCliente';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlertaModalPublico from '../../components/shared/AlertaModalPublico';

export default function CatalogoPublicoScreen() {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [todosLosProductos, setTodosLosProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        cargarCategorias();
        cargarProductos();
    }, []);

    const cargarCategorias = async () => {
        const snapshot = await getDocs(collection(db, 'categoria'));
        const lista = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setCategorias(lista);
    };

    const cargarProductos = async () => {
        const snapshot = await getDocs(collection(db, 'productos'));
        const lista = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setProductos(lista);
        setTodosLosProductos(lista);
    };

    const filtrarPorCategoria = (nombreCategoria) => {
        if (
            typeof nombreCategoria !== 'string' ||
            !nombreCategoria.trim() ||
            nombreCategoria.toLowerCase() === 'todas'
        ) {
            setProductos(todosLosProductos);
            return;
        }

        const filtrados = todosLosProductos.filter(
            (p) =>
                typeof p.categoria === 'string' &&
                p.categoria.toLowerCase() === nombreCategoria.toLowerCase()
        );

        setProductos(filtrados);
    };

    const filtrarPorBusqueda = (texto) => {
        setBusqueda(texto);
        const filtrados = todosLosProductos.filter((p) =>
            p.nombre.toLowerCase().includes(texto.toLowerCase())
        );
        setProductos(filtrados);
    };

    const mostrarModalLogin = () => {
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{
                    uri: item.foto || 'https://via.placeholder.com/60x60?text=Sin+imagen',
                }}
                style={styles.imagen}
                resizeMode="cover"
            />
            <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
            </View>
            <View style={styles.iconos}>
                <TouchableOpacity onPress={mostrarModalLogin}>
                    <MaterialCommunityIcons name="heart-outline" size={24} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity onPress={mostrarModalLogin}>
                    <MaterialCommunityIcons name="cart-outline" size={24} color="#ccc" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buscador}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar producto..."
                    placeholderTextColor="#888"
                    value={busqueda}
                    onChangeText={filtrarPorBusqueda}
                />
            </View>

            <View style={styles.categoriasContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <CategoriaCliente nombre="Todas" onPress={filtrarPorCategoria} />
                    {categorias.map((cat) => (
                        <CategoriaCliente
                            key={cat.id}
                            nombre={cat.categoria}
                            onPress={filtrarPorCategoria}
                        />
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={productos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listaProductos}
            />

            <TouchableOpacity style={styles.botonLogin} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textoLogin}>Iniciar sesión</Text>
            </TouchableOpacity>

            <AlertaModalPublico
                visible={modalVisible}
                titulo="Función bloqueada"
                mensaje="Debes iniciar sesión para usar favoritos o compras"
                onCancelar={() => setModalVisible(false)}
                onConfirmar={() => {
                    setModalVisible(false);
                    navigation.navigate('Login');
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    buscador: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    input: {
        backgroundColor: '#1E1E1E',
        color: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    categoriasContainer: {
        marginTop: 8,
        paddingHorizontal: 10,
        paddingBottom: 6,
    },
    listaProductos: {
        paddingBottom: 20,
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: '#1E1E1E',
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    imagen: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    info: {
        flex: 1,
    },
    nombre: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    precio: {
        color: '#D96C9F',
        fontSize: 14,
        marginTop: 4,
    },
    iconos: {
        flexDirection: 'row',
        gap: 12,
    },
    botonLogin: {
        backgroundColor: '#D96C9F',
        margin: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoLogin: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});