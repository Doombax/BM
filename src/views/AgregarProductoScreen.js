import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import FormularioProducto from '../components/admin/FormularioProductos';

export default function AgregarProductoScreen() {
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    talla: '',
    marca: '',
    color: '',
    foto: '',
  });

  const listaCategorias = [
    { id: '1', categoria: 'Camisas' },
    { id: '2', categoria: 'Vestidos' },
    { id: '3', categoria: 'Accesorios' },
  ];

  const manejoCambio = (campo, valor) => {
    setNuevoProducto((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarProducto = () => {
    console.log('Producto guardado:', nuevoProducto);
  };

  const seleccionarImagen = () => {
    console.log('Seleccionar imagen');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <FormularioProducto
          nuevoProducto={nuevoProducto}
          manejoCambio={manejoCambio}
          guardarProducto={guardarProducto}
          seleccionarImagen={seleccionarImagen}
          modEdicion={false}
          listaCategorias={listaCategorias}
        />
      </View>
    </KeyboardAvoidingView>
  );
}