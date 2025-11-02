import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoritosPublicoScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);

    const irALogin = () => {
        setModalVisible(false);
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <MaterialCommunityIcons name="lock-outline" size={48} color="#D96C9F" />
                        <Text style={styles.modalTexto}>Debes iniciar sesión para ver tus favoritos</Text>
                        <Pressable style={styles.boton} onPress={irALogin}>
                            <Text style={styles.botonTexto}>Iniciar sesión</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Text style={styles.texto}>Esta sección está bloqueada sin sesión.</Text>

            <TouchableOpacity style={styles.botonLogin} onPress={irALogin}>
                <Text style={styles.botonTexto}>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    texto: {
        color: '#888',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1E1E1E',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        width: '80%',
    },
    modalTexto: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 12,
    },
    boton: {
        backgroundColor: '#D96C9F',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 8,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    botonLogin: {
        backgroundColor: '#D96C9F',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
    },
});