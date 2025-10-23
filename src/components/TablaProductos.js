import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BotonEliminarProducto from './BotonEliminarProducto';

const TablaProductos = ({ productos, eliminarProducto, editarProducto }) => {
    return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Lista de Productos</Text>

    {productos.length === 0 ? (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>No hay productos registrados.</Text>
      </View>
    ) : (
      productos.map((p) => {
        const imgUri = p.imagen || p.image || p.foto || p.imageUrl || null;
        return (
          <View key={p.id} style={styles.row}>
            <View style={styles.left}>
              {imgUri ? (
                <Image source={{ uri: imgUri }} style={styles.productImage} resizeMode="cover" />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>No imagen</Text>
                </View>
              )}
            </View>

            <View style={styles.center}>
              <Text style={styles.cellTitle}>{p.nombre}</Text>
              <Text style={styles.cellSub}>Código: {p.codigo}</Text>
              <Text style={styles.cellSub}>Categoría: {p.categoria}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.price}>${p.precio}</Text>
              <Text style={styles.stock}>Stock: {p.stock}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => editarProducto(p)}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>

                <BotonEliminarProducto id={p.id} eliminarProducto={eliminarProducto} />
              </View>
            </View>
          </View>
        );
      })
    )}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: { paddingBottom: 80, padding: 8,     borderColor:"#fff",
    borderWidth:1,
    borderRadius:25 },
  title: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  emptyBox: { backgroundColor: "#161617", borderRadius: 12, padding: 18, alignItems: "center" },
  emptyText: { color: "#9aa0a6" },

  row: {
    backgroundColor: "#161617",
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor:"#fff",
    borderWidth:1,
    borderRadius:25
  },

  left: { width: 78, height: 78, marginRight: 10 },
  center: { flex: 1 },
  right: { width: 70, alignItems: "flex-end", marginLeft:50 },

  productImage: { width: 78, height: 78, borderRadius: 8, backgroundColor: "#222" },
  noImage: {
    width: 78,
    height: 78,
    borderRadius: 8,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: { color: "#9aa0a6", fontSize: 12 },

  cellTitle: { color: "#fff", fontSize: 15, fontWeight: "700" },
  cellSub: { color: "#bfbfbf", fontSize: 12, marginTop: 2 },

  price: { color: "#C77DFF", fontWeight: "700", fontSize: 15 },
  stock: { color: "#9aa0a6", fontSize: 12, marginTop: 4 },

  actions: { marginTop: 8, flexDirection: "row", alignItems: "center" },
  editButton: { backgroundColor: "#7B2CBF", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 8 },
  editText: { color: "#fff", fontWeight: "600" },
});

export default TablaProductos;