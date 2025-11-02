import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductoCliente from './ProductoCliente';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComprasCliente = ({ compras, setCompras }) => {
    const toggleCompra = (product) => {
        if (!product?.id || typeof setCompras !== 'function') return;
        const exists = compras.some((item) => item.id === product.id);
        setCompras(
            exists ? compras.filter((item) => item.id !== product.id) : [...compras, product]
        );
    };

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cart-off" size={70} color="#666" />
            <Text style={styles.emptyText}>No tienes compras aún.</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tus Compras</Text>
            <FlatList
                data={compras}
                renderItem={({ item }) => (
                    <ProductoCliente
                        {...item}
                        isFavorite={true}
                        onToggleFavorite={() => { }}
                        isInCart={true}
                        onAddCompra={() => toggleCompra(item)}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListEmptyComponent={renderEmptyList}
                contentContainerStyle={styles.productContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    emptyText: {
        color: '#AAAAAA',
        fontSize: 16,
        marginTop: 10,
    },
    productContainer: {
        paddingBottom: 20,
        paddingHorizontal: 4,
    },
});

export default ComprasCliente;