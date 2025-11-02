import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

export default function ComprasScreen() {
  const [compras, setCompras] = useState([]);

  useFocusEffect(
    useCallback(() => {
      cargarCompras();
    }, [])
  );

  const cargarCompras = async () => {
    try {
      const q = query(
        collection(db, 'compras'),
        where('cliente', '==', 'cliente@gmail.com')
      );
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompras(lista);
    } catch (error) {
      console.error('Error al cargar compras:', error);
    }
  };

  const formatearFecha = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const fecha = timestamp.toDate();
    return fecha.toLocaleDateString('es-NI', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.foto?.startsWith('data:image')
            ? item.foto
            : 'https://via.placeholder.com/80x80?text=Sin+imagen',
        }}
        style={styles.imagen}
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
        <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Text style={styles.titulo}>Historial de Compras</Text>
      <FlatList
        data={compras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  nombre: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  precio: {
    color: '#D96C9F',
    fontSize: 14,
  },
  fecha: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
});