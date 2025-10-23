import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../database/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AgregarProductoScreen({ navigation }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    foto: '',
    talla: '',
    marca: '',
    color: '',
  });

  const manejoCambio = (campo, valor) => {
    setNuevoProducto((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5,
    });

    if (!resultado.canceled) {
      const base64 = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setNuevoProducto((prev) => ({ ...prev, foto: base64 }));
    }
  };

  const guardarProducto = async () => {
    const {
      codigo, nombre, categoria, precio, stock, foto, talla, marca, color
    } = nuevoProducto;

    if (!codigo || !nombre || !categoria || !precio || !stock || !foto) {
      Alert.alert('Campos incompletos', 'Por favor completá todos los campos obligatorios.');
      return;
    }

    try {
      await addDoc(collection(db, 'productos'), {
        codigo,
        nombre,
        categoria,
        precio: parseFloat(precio),
        stock: parseFloat(stock),
        foto,
        talla,
        marca,
        color,
      });

      Alert.alert('Producto guardado', 'Se agregó correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      Alert.alert('Error', 'No se pudo guardar el producto.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput placeholder="Código" value={nuevoProducto.codigo} onChangeText={(text) => manejoCambio('codigo', text)} style={styles.input} />
        <TextInput placeholder="Nombre" value={nuevoProducto.nombre} onChangeText={(text) => manejoCambio('nombre', text)} style={styles.input} />
        <TextInput placeholder="Categoría" value={nuevoProducto.categoria} onChangeText={(text) => manejoCambio('categoria', text)} style={styles.input} />
        <TextInput placeholder="Precio" value={nuevoProducto.precio} onChangeText={(text) => manejoCambio('precio', text)} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Stock" value={nuevoProducto.stock} onChangeText={(text) => manejoCambio('stock', text)} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Talla" value={nuevoProducto.talla} onChangeText={(text) => manejoCambio('talla', text)} style={styles.input} />
        <TextInput placeholder="Marca" value={nuevoProducto.marca} onChangeText={(text) => manejoCambio('marca', text)} style={styles.input} />
        <TextInput placeholder="Color" value={nuevoProducto.color} onChangeText={(text) => manejoCambio('color', text)} style={styles.input} />
        <Button title="Seleccionar Imagen" onPress={seleccionarImagen} color="#4CAF50" />
        {nuevoProducto.foto ? (
          <Image source={{ uri: nuevoProducto.foto }} style={styles.preview} />
        ) : (
          <Text style={styles.sinImagen}>Sin imagen seleccionada</Text>
        )}
        <Button title="Guardar Producto" onPress={guardarProducto} color="#007AFF" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  preview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  sinImagen: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginVertical: 10,
  },
});