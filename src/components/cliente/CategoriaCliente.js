import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CategoriaCliente({ nombre, onPress }) {
    const icono = obtenerIcono(nombre);

    return (
        <TouchableOpacity onPress={() => onPress(nombre)} style={styles.boton}>
            <View style={styles.contenido}>
                <MaterialCommunityIcons name={icono} size={16} color="#D96C9F" />
                <Text style={styles.texto}>{nombre}</Text>
            </View>
        </TouchableOpacity>
    );
}

const obtenerIcono = (nombre) => {
    if (!nombre || typeof nombre !== 'string') return 'tag-outline';

    switch (nombre.toLowerCase()) {
        case 'ropa':
            return 'tshirt-crew-outline';
        case 'zapatos':
            return 'shoe-formal';
        case 'accesorios':
            return 'watch';
        case 'todas':
            return 'apps';
        default:
            return 'tag-outline';
    }
};

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 14,
        marginRight: 6,
        borderWidth: 1,
        borderColor: '#D96C9F',
        alignSelf: 'center',
    },
    contenido: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texto: {
        color: '#fff',
        fontSize: 13,
        marginLeft: 5,
        fontWeight: '500',
    },
});