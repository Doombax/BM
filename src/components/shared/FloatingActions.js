import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FloatingActions() {
  const [expandido, setExpandido] = useState(false);
  const animation = new Animated.Value(0);
  const navigation = useNavigation();

  const toggleExpand = () => {
    setExpandido(!expandido);
    Animated.timing(animation, {
      toValue: expandido ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  return (
    <View style={styles.container}>
      {expandido && (
        <Animated.View style={[styles.action, { transform: [{ translateY }] }]}>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarProducto')}>
            <View style={styles.botonAccion}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.texto}>Producto</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarCategoria')}>
            <View style={styles.botonAccion}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.texto}>Categoría</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.botonPrincipal} onPress={toggleExpand}>
        <Ionicons name={expandido ? 'close' : 'add'} size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  botonPrincipal: {
    backgroundColor: '#7C7CFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  action: {
    marginBottom: 10,
    alignItems: 'center',
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  texto: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});