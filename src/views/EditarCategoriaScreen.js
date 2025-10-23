import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditarCategoriaScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { categoria } = route.params;

    const [nombre, setNombre] = useState(categoria.categoria || '');

    const actualizarCategoria = async () => {
        if (!nombre.trim()) {
            Alert.alert('Campo vacío', 'Ingresá un nombre para la categoría.');
            return;
        }

        try {
            await updateDoc(doc(db, 'categoria', categoria.id), { categoria: nombre });
            Alert.alert('Categoría actualizada');
            navigation.goBack();
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            Alert.alert('Error', 'No se pudo actualizar la categoría.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Nombre de la categoría"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            <Button title="Actualizar categoría" onPress={actualizarCategoria} color="#007AFF" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
});