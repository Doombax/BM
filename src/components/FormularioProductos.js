import { View, TextInput, KeyboardAvoidingView, StyleSheet, Text, ScrollView, TouchableOpacity
 } from "react-native";

const FormularioProductos = ({ nuevoProducto, manejoCambio, guardarProducto, actualizarProducto, modEdicion }) => {
    return (
  <KeyboardAvoidingView style={{ flex: 1 }} >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{modEdicion ? "Actualizar Producto" : "Registro de Producto"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Código del producto"
        placeholderTextColor="#9a9a9a"
        value={nuevoProducto.codigo}
        onChangeText={(t) => manejoCambio("codigo", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#9a9a9a"
        value={nuevoProducto.nombre}
        onChangeText={(t) => manejoCambio("nombre", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoría"
        placeholderTextColor="#9a9a9a"
        value={nuevoProducto.categoria}
        onChangeText={(t) => manejoCambio("categoria", t)}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción"
        placeholderTextColor="#9a9a9a"
        value={nuevoProducto.descripcion}
        onChangeText={(t) => manejoCambio("descripcion", t)}
        multiline
        numberOfLines={3}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#9a9a9a"
        keyboardType="numeric"
        value={nuevoProducto.precio}
        onChangeText={(t) => manejoCambio("precio", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Stock"
        placeholderTextColor="#9a9a9a"
        keyboardType="numeric"
        value={nuevoProducto.stock}
        onChangeText={(t) => manejoCambio("stock", t)}
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#7B2CBF" }]}
          onPress={modEdicion ? actualizarProducto : guardarProducto}
        >
          <Text style={styles.actionText}>{modEdicion ? "Actualizar" : "Guardar"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60, backgroundColor: "#1A1018" },
  title: { color: "#FFF", fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: {
    backgroundColor: "#161617",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#252525",
  },
  textarea: { minHeight: 80, textAlignVertical: "top" },
  actions: { marginTop: 8 },
  actionButton: { paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default FormularioProductos;