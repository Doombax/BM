import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const BotonEliminarProducto = ({ id, eliminarProducto }) => {

    const [visible, setVisible] = useState(false);

    const confirmarEliminar = () => {
        setVisible(false);
        eliminarProducto(id);
    };
    return (
  <View>
    <TouchableOpacity style={styles.boton} onPress={() => setVisible(true)}>
      <Text style={styles.botonText}>Eliminar</Text>
    </TouchableOpacity>

    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Confirmar eliminación</Text>
          <Text style={styles.modalText}>¿Estás seguro que querés eliminar este producto?</Text>

          <View style={styles.modalActions}>
            <TouchableOpacity style={[styles.modalButton, styles.cancel]} onPress={() => setVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.confirm]} onPress={confirmarEliminar}>
              <Text style={styles.modalButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

};

const styles = StyleSheet.create({
  boton: { backgroundColor: "#E63946", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  botonText: { color: "#fff", fontWeight: "700" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "86%", backgroundColor: "#0E0E10", borderRadius: 12, padding: 18, borderWidth: 1, borderColor: "#222" },
  modalTitle: { color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 8 },
  modalText: { color: "#bfbfbf", fontSize: 13, marginBottom: 16 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8 },
  cancel: { backgroundColor: "#333" },
  confirm: { backgroundColor: "#E63946" },
  modalButtonText: { color: "#fff", fontWeight: "700" },
});

export default BotonEliminarProducto;