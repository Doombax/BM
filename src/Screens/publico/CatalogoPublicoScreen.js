import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,StyleSheet,FlatList,ScrollView,TouchableOpacity,Image,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import CategoriaCliente from '../../components/cliente/CategoriaCliente';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlertaModalPublico from '../../components/shared/AlertaModalPublico';

export default function CatalogoPublicoScreen() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    cargarCategorias();
    cargarProductos();
  }, []);

  const cargarCategorias = async () => {
    const snapshot = await getDocs(collection(db, 'categoria'));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategorias(lista);
  };

  const cargarProductos = async () => {
    const snapshot = await getDocs(collection(db, 'productos'));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductos(lista);
    setTodosLosProductos(lista);
  };

  const filtrarPorCategoria = (nombreCategoria) => {
    if (
      typeof nombreCategoria !== 'string' ||
      !nombreCategoria.trim() ||
      nombreCategoria.toLowerCase() === 'todas'
    ) {
      setProductos(todosLosProductos);
      return;
    }

    const filtrados = todosLosProductos.filter(
      (p) =>
        typeof p.categoria === 'string' &&
        p.categoria.toLowerCase() === nombreCategoria.toLowerCase()
    );

    setProductos(filtrados);
  };

  const filtrarPorBusqueda = (texto) => {
    setBusqueda(texto);
    const filtrados = todosLosProductos.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setProductos(filtrados);
  };

  const mostrarModalLogin = () => {
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.foto || 'https://via.placeholder.com/120x120?text=Sin+imagen',
        }}
        style={styles.imagen}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
        <Text style={styles.detalle}>Marca: {item.marca}</Text>
        <Text style={styles.detalle}>Talla: {item.talla}</Text>
        <Text style={styles.detalle}>Categoría: {item.categoria}</Text>
        <Text style={styles.detalle}>
          Stock: {item.stock > 0 ? item.stock : 'Agotado'}
        </Text>
      </View>

      <View style={styles.iconos}>
        <TouchableOpacity onPress={mostrarModalLogin}>
          <MaterialCommunityIcons name="heart-outline" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={mostrarModalLogin}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Buscador */}
      <View style={styles.buscador}>
        <TextInput
          style={styles.input}
          placeholder="Buscar producto..."
          placeholderTextColor="#888"
          value={busqueda}
          onChangeText={filtrarPorBusqueda}
        />
      </View>

      {/* Categorías */}
      <View style={styles.categoriasContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoriaCliente nombre="Todas" onPress={filtrarPorCategoria} />
          {categorias.map((cat) => (
            <CategoriaCliente
              key={cat.id}
              nombre={cat.categoria}
              onPress={filtrarPorCategoria}
            />
          ))}
        </ScrollView>
      </View>

      {/* Productos en grid */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}   // 👈 catálogo en 2 columnas
        key={'GRID'}     // 👈 fuerza renderizado como grid
        ListEmptyComponent={
          <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
            No se encontraron productos 😔
          </Text>
        }
        contentContainerStyle={styles.listaProductos}
      />

      {/* Botón de login */}
      <TouchableOpacity
        style={styles.botonLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoLogin}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Modal bloqueado */}
      <AlertaModalPublico
        visible={modalVisible}
        titulo="Función bloqueada"
        mensaje="Debes iniciar sesión para usar favoritos o compras"
        onCancelar={() => setModalVisible(false)}
        onConfirmar={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  buscador: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  categoriasContainer: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  listaProductos: {
    paddingBottom: 20,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#1E1E1E',
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    maxWidth: '48%', // 👈 para que se acomoden 2 por fila
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
  botonLogin: {
    backgroundColor: '#D96C9F',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoLogin: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});