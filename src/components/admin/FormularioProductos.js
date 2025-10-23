import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function FormularioProducto({
  nuevoProducto,
  manejoCambio,
  guardarProducto,
  seleccionarImagen,
  modEdicion,
  listaCategorias = [],
}) {
  const [openCategoria, setOpenCategoria] = useState(false);
  const [itemsCategoria, setItemsCategoria] = useState([]);
  const [categoria, setCategoria] = useState(nuevoProducto.categoria);

  useEffect(() => {
    const opciones = listaCategorias.map((cat) => ({
      label: cat.categoria,
      value: cat.categoria,
    }));
    setItemsCategoria(opciones);
  }, [listaCategorias]);

  useEffect(() => {
    manejoCambio('categoria', categoria);
  }, [categoria]);

  return (
    <View style={styles.formulario}>
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

      <View style={[styles.grupo, { zIndex: openCategoria ? 1000 : 0 }]}>
        <Text style={styles.etiqueta}>Categoría</Text>
        <DropDownPicker
          open={openCategoria}
          value={categoria}
          items={itemsCategoria}
          setOpen={setOpenCategoria}
          setValue={setCategoria}
          setItems={setItemsCategoria}
          placeholder="Seleccionar categoría"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={{ color: '#888' }}
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.etiqueta}>Precio</Text>
        <TextInput
          value={nuevoProducto.precio}
          onChangeText={(text) => manejoCambio('precio', text)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Precio"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.etiqueta}>Stock</Text>
        <TextInput
          value={nuevoProducto.stock}
          onChangeText={(text) => manejoCambio('stock', text)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Cantidad disponible"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.etiqueta}>Talla</Text>
        <TextInput
          value={nuevoProducto.talla}
          onChangeText={(text) => manejoCambio('talla', text)}
          style={styles.input}
          placeholder="Talla del producto"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.etiqueta}>Marca</Text>
        <TextInput
          value={nuevoProducto.marca}
          onChangeText={(text) => manejoCambio('marca', text)}
          style={styles.input}
          placeholder="Marca"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.etiqueta}>Color</Text>
        <TextInput
          value={nuevoProducto.color}
          onChangeText={(text) => manejoCambio('color', text)}
          style={styles.input}
          placeholder="Color"
          placeholderTextColor="#888"
        />
      </View>

      {nuevoProducto.foto ? (
        <Image source={{ uri: nuevoProducto.foto }} style={styles.preview} />
      ) : null}

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarProducto}>
        <Text style={styles.botonTexto}>
          {modEdicion ? 'Actualizar producto' : 'Guardar producto'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonImagen} onPress={seleccionarImagen}>
        <Text style={styles.botonTextoSecundario}>Seleccionar imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 12,
    gap: 20,
  },
  grupo: {
    gap: 6,
  },
  etiqueta: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 15,
  },
  dropdown: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
    borderRadius: 8,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 15,
  },
  dropdownContainer: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
  },
  preview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#333',
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