import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import AlertaModal from '../shared/AlertaModal';

export default function ProductoCliente({ producto, favoritos = [], setFavoritos }) {
  const [modalVisible, setModalVisible] = useState(false);

  const esFavorito = useMemo(() => {
    return Array.isArray(favoritos)
      ? favoritos.some((f) => f.id === producto.id)
      : false;
  }, [favoritos, producto.id]);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter((f) => f.id !== producto.id));
    } else {
      setFavoritos([...favoritos, producto]);
    }
  };

  const realizarCompra = async () => {
    try {
      const nuevaCompra = {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        foto: producto.foto || '',
        cliente: 'cliente@gmail.com',
        fecha: new Date(),
      };

      await addDoc(collection(db, 'compras'), nuevaCompra);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al guardar la compra:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: producto.foto || 'https://via.placeholder.com/60x60?text=Sin+imagen',
        }}
        style={styles.imagen}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${producto.precio}</Text>
      </View>
      <View style={styles.iconos}>
        <TouchableOpacity onPress={toggleFavorito}>
          <MaterialCommunityIcons
            name={esFavorito ? 'heart' : 'heart-outline'}
            size={24}
            color={esFavorito ? '#D96C9F' : '#ccc'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={realizarCompra}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <AlertaModal
        visible={modalVisible}
        titulo="Compra realizada"
        mensaje="Tu pedido ha sido registrado correctamente"
        onCerrar={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  precio: {
    color: '#D96C9F',
    fontSize: 14,
    marginTop: 4,
  },
  iconos: {
    flexDirection: 'row',
    gap: 12,
  },
});