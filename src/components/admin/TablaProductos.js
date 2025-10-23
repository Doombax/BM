import { useNavigation } from '@react-navigation/native';

export default function TablaProductos({ productos = [] }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.fila}>
      <Image source={{ uri: item.foto }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.subtexto}>Código: {item.codigo}</Text>
        <Text style={styles.subtexto}>Categoría: {item.categoria}</Text>
        <Text style={styles.subtexto}>Descripción: {item.descripcion}</Text>
        <Text style={styles.subtexto}>Precio: ${item.precio}</Text>
        <Text style={styles.subtexto}>Stock: {item.stock}</Text>
        <Text style={styles.subtexto}>Talla: {item.talla}</Text>
        <Text style={styles.subtexto}>Marca: {item.marca}</Text>
        <Text style={styles.subtexto}>Color: {item.color}</Text>
      </View>
      <View style={styles.acciones}>
        <TouchableOpacity onPress={() => navigation.navigate('EditarProducto', { producto: item })}>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={productos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={styles.vacio}>No hay productos registrados.</Text>}
    />
  );
}