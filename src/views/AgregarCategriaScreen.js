import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { db } from '../database/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import FormularioCategorias from '../components/admin/FormularioCategoria';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AgregarCategoriaScreen({ navigation }) {
  const [nuevaCategoria, setNuevaCategoria] = useState({ categoria: '' });

  const manejoCambio = (nombre, valor) => {
    setNuevaCategoria((prev) => ({ ...prev, [nombre]: valor }));
  };

  const guardarCategoria = async () => {
    if (nuevaCategoria.categoria) {
      await addDoc(collection(db, 'categoria'), {
        categoria: nuevaCategoria.categoria,
      });
      Alert.alert('Categoría agregada');
      navigation.goBack();
    } else {
      Alert.alert('Por favor, complete el campo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormularioCategorias
        nuevaCategoria={nuevaCategoria}
        manejoCambio={manejoCambio}
        guardarCategoria={guardarCategoria}
        modEdicion={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
});