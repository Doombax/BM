import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertaModal from '../../components/shared/AlertaModal';

export default function AgregarCategoriaScreen() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState('');
  const [alertaMensaje, setAlertaMensaje] = useState('');

  const guardarCategoria = async () => {
    if (!nombre.trim()) {
      setAlertaTitulo('Campo vacío');
      setAlertaMensaje('Ingresá un nombre para la categoría.');
      setAlertaVisible(true);
      return;
    }

    try {
      await addDoc(collection(db, 'categoria'), { categoria: nombre });
      setAlertaTitulo('Categoría guardada');
      setAlertaMensaje('La categoría se agregó correctamente.');
      setAlertaVisible(true);
    } catch (error) {
      setAlertaTitulo('Error');
      setAlertaMensaje('No se pudo guardar la categoría.');
      setAlertaVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Agregar categoría</Text>
      <TextInput
        placeholder="Nombre de la categoría"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.boton} onPress={guardarCategoria}>
        <Text style={styles.botonTexto}>Guardar categoría</Text>
      </TouchableOpacity>

      <AlertaModal
        visible={alertaVisible}
        titulo={alertaTitulo}
        mensaje={alertaMensaje}
        onCerrar={() => {
          setAlertaVisible(false);
          if (alertaTitulo === 'Categoría guardada') navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#1E1E1E',
    color: '#fff',
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#D96C9F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});