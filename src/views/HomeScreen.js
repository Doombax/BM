import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation}) {
    return (
        <View style={styles.container}>
              <View style={styles.spacer} />
            <Button
                title="Ir a Productos"
                onPress={() => navigation.navigate('Productos')}
            />
            <View style={styles.spacer} />
            <Button
                title="Ir a Categorias"
                onPress={() => navigation.navigate('Categoria')}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        height: 15,
    },
});