import React from 'react';
import {
  View, TextInput, StyleSheet, Image, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import ModalSelector from '../../Screens/admin/ModalSelector';

export default function FormularioProducto({
  nuevoProducto = {},
  manejoCambio,
  guardarProducto,
  seleccionarImagen,
  modEdicion,
  listaCategorias = [],
}) {
  return (
    <View style={styles.formulario}>
      <ScrollView
        contentContainerStyle={styles.scrollContenido}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.grupo}>
          <Text style={styles.etiqueta}>Código</Text>
          <TextInput
            value={nuevoProducto.codigo}
            onChangeText={(text) => manejoCambio('codigo', text)}
            style={styles.input}
            placeholder="Código del producto"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.grupo}>
          <Text style={styles.etiqueta}>Nombre</Text>
          <TextInput
            value={nuevoProducto.nombre}
            onChangeText={(text) => manejoCambio('nombre', text)}
            style={styles.input}
            placeholder="Nombre del producto"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.grupo}>
          <ModalSelector
            label="Categoría"
            value={nuevoProducto.categoria}
            options={listaCategorias.map((cat) => ({
              label: cat.categoria,
              value: cat.categoria,
            }))}
            onSelect={(valor) => manejoCambio('categoria', valor)}
          />
        </View>

        {/* Otros campos */}
        {['precio', 'stock', 'talla', 'marca', 'color'].map((campo) => (
          <View key={campo} style={styles.grupo}>
            <Text style={styles.etiqueta}>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
            </Text>
            <TextInput
              value={nuevoProducto[campo]}
              onChangeText={(text) => manejoCambio(campo, text)}
              style={styles.input}
              placeholder={campo}
              placeholderTextColor="#888"
              keyboardType={
                campo === 'precio' || campo === 'stock' ? 'numeric' : 'default'
              }
            />
          </View>
        ))}

        {nuevoProducto.foto ? (
          <Image source={{ uri: nuevoProducto.foto }} style={styles.preview} />
        ) : null}

        {/* Botones al final del scroll */}
        <View style={styles.botones}>
          <TouchableOpacity style={styles.botonGuardar} onPress={guardarProducto}>
            <Text style={styles.botonTexto}>
              {modEdicion ? 'Actualizar producto' : 'Guardar producto'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonImagen} onPress={seleccionarImagen}>
            <Text style={styles.botonTextoSecundario}>Seleccionar imagen</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContenido: {
    padding: 20,
    paddingBottom: 40,
  },
  grupo: {
    marginBottom: 16,
  },
  etiqueta: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 15,
  },
  preview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#333',
    marginTop: 10,
  },
  botones: {
    marginTop: 20,
    gap: 10,
  },
  botonGuardar: {
    backgroundColor: '#D96C9F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonImagen: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  botonTextoSecundario: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
});