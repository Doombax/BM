import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FavoritosContext } from '../../components/cliente/FavoritosContext';
import ProductoCliente from '../../components/cliente/ProductoCliente';

export default function FavoritosScreen() {
    const { favoritos, setFavoritos } = useContext(FavoritosContext);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Mis Favoritos</Text>
            <FlatList
                data={favoritos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductoCliente
                        producto={item}
                        favoritos={favoritos}
                        setFavoritos={setFavoritos}
                    />
                )}
                contentContainerStyle={styles.lista}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        margin: 16,
    },
    lista: {
        paddingHorizontal: 8,
        paddingBottom: 20,
    },
});