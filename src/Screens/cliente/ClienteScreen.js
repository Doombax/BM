import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import CategoriaCliente from '../../components/cliente/CategoriaCliente';
import ProductoCliente from '../../components/cliente/ProductoCliente';
import { FavoritosContext } from '../../components/cliente/FavoritosContext';
import { useFocusEffect } from '@react-navigation/native';

export default function ClienteScreen() {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [todosLosProductos, setTodosLosProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const { favoritos, setFavoritos } = useContext(FavoritosContext);

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

    useFocusEffect(
        useCallback(() => {
            cargarCategorias();
            cargarProductos();
        }, [])
    );

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
                renderItem={({ item }) => (
                    <ProductoCliente
                        producto={item}
                        favoritos={favoritos}
                        setFavoritos={setFavoritos}
                    />
                )}
                numColumns={2}
                key={'GRID'}
                ListEmptyComponent={
                    <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
                        No se encontraron productos
                    </Text>
                }
                extraData={favoritos}
                contentContainerStyle={styles.listaProductos}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    buscador: {
        paddingHorizontal: 10,
        paddingTop: 10
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
        paddingBottom: 6
    },
    listaProductos: {
        paddingBottom: 20,
        paddingHorizontal: 4
    },
});