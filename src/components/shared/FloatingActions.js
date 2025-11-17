import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text, } from 'react-native';
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
              <Ionicons name="shirt-outline" size={22} color="#fff" />
              <Text style={styles.texto}>Producto</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarCategoria')}>
            <View style={styles.botonAccion}>
              <Ionicons name="pricetag-outline" size={22} color="#fff" />
              <Text style={styles.texto}>Categoría</Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('ActualizarStock')}>
            <View style={styles.botonAccion}>
              <Ionicons name="shirt-outline" size={22} color="#fff" />
              <Text style={styles.texto}>Stock</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.botonPrincipal} onPress={toggleExpand}>
        <Ionicons name={expandido ? 'close' : 'add'} size={28} color="#fff" />
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
    backgroundColor: '#D96C9F',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  action: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 3,
  },
  texto: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});