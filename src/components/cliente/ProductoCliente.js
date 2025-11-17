import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlertaModal from '../shared/AlertaModal';
import { useCarrito } from './CarritoContext';

export default function ProductoCliente({ producto, favoritos = [], setFavoritos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const { agregarProducto } = useCarrito();

  const esFavorito = useMemo(() => {
    return Array.isArray(favoritos)
      ? favoritos.some((f) => f.id === producto.id)
      : false;
  }, [favoritos, producto.id]);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter((f) => f.id !== producto.id));
      setMensajeModal('Producto eliminado de favoritos');
    } else {
      setFavoritos([...favoritos, producto]);
      setMensajeModal('Producto agregado a favoritos');
    }
    setModalVisible(true);
  };

  const irAlCarrito = () => {
    agregarProducto(producto);
    setMensajeModal('Producto agregado al carrito 🛒');
    setModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: producto.foto }} style={styles.imagen} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${producto.precio}</Text>
        <Text style={styles.detalle}>Marca: {producto.marca}</Text>
        <Text style={styles.detalle}>Talla: {producto.talla}</Text>
        <Text style={styles.detalle}>Categoría: {producto.categoria}</Text>
        <Text style={styles.detalle}>Stock: {producto.stock}</Text>
      </View>

      <View style={styles.iconos}>
        <TouchableOpacity onPress={toggleFavorito}>
          <MaterialCommunityIcons
            name={esFavorito ? 'heart' : 'heart-outline'}
            size={24}
            color={esFavorito ? '#D96C9F' : '#ccc'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={irAlCarrito}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <AlertaModal
        visible={modalVisible}
        titulo="Acción realizada"
        mensaje={mensajeModal}
        onCerrar={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  imagen: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  info: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  nombre: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  precio: {
    color: '#D96C9F',
    fontSize: 14,
    marginBottom: 4,
  },
  detalle: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  iconos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
});