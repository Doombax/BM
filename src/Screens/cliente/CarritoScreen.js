import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCarrito } from "../../components/cliente/CarritoContext";
import { auth, db } from "../../database/firebaseConfig";
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import PagoModal from "./PagoModal";
import AlertaModal from "../../components/shared/AlertaModal";
import AlertaModalConfirmacion from "../../components/shared/AlertaModalConfirmacion";

export default function CarritoScreen({ navigation }) {
  const { carrito, actualizarCantidad, limpiarCarrito } = useCarrito();
  const [pagoVisible, setPagoVisible] = useState(false);


  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState("");
  const [alertaMensaje, setAlertaMensaje] = useState("");


  const [confirmacionVisible, setConfirmacionVisible] = useState(false);

  const total = useMemo(
    () => carrito.reduce((acc, item) => acc + item.subtotal, 0),
    [carrito]
  );

  const guardarCompra = async () => {
    const user = auth.currentUser;
    if (!user) {
      setAlertaTitulo("Sesión requerida");
      setAlertaMensaje("Inicia sesión para confirmar tu compra.");
      setAlertaVisible(true);
      return;
    }

    for (const p of carrito) {
      if (typeof p.stock === "number" && p.cantidad > p.stock) {
        setAlertaTitulo("Stock insuficiente");
        setAlertaMensaje(`No hay suficiente stock de ${p.nombre}.`);
        setAlertaVisible(true);
        return;
      }
    }

    const compraData = {
      usuarioId: user.uid,
      productos: carrito.map((p) => ({
        productoId: p.id,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precioUnitario: p.precio,
        subtotal: p.subtotal,
        foto: p.foto,
      })),
      total,
      fecha: new Date(),
      estado: "en espera", 
    };

    try {
      const userCompraRef = doc(collection(db, "usuarios", user.uid, "compras"));
      await setDoc(userCompraRef, compraData);
      await addDoc(collection(db, "compras"), compraData);

      for (const p of carrito) {
        if (typeof p.stock === "number") {
          const productoRef = doc(db, "productos", p.id);
          await updateDoc(productoRef, { stock: p.stock - p.cantidad });
        }
      }

      limpiarCarrito();
      setPagoVisible(false);
      setAlertaTitulo("Compra confirmada");
      setAlertaMensaje("Tu compra fue registrada correctamente.");
      setAlertaVisible(true);
    } catch (error) {
      console.error("Error al guardar compra:", error);
      setAlertaTitulo("Error");
      setAlertaMensaje("Ocurrió un problema al guardar tu compra.");
      setAlertaVisible(true);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto }} style={styles.imagen} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.detalle}>Precio unitario: ${item.precio}</Text>
        <Text style={styles.detalle}>Stock disponible: {item.stock ?? "—"}</Text>

        <View style={styles.cantidadRow}>
          <TouchableOpacity
            style={styles.botonCantidad}
            onPress={() => actualizarCantidad(item.id, Math.max(1, item.cantidad - 1))}
          >
            <Text style={styles.botonTexto}>-</Text>
          </TouchableOpacity>

          <Text style={styles.cantidad}>{item.cantidad}</Text>

          <TouchableOpacity
            style={styles.botonCantidad}
            onPress={() => actualizarCantidad(item.id, item.cantidad + 1)}
          >
            <Text style={styles.botonTexto}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtotal}>Subtotal: ${item.subtotal}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Carrito de compras</Text>

      {carrito.length === 0 ? (
        <View style={styles.vacioBox}>
          <Text style={styles.vacioTexto}>Tu carrito está vacío.</Text>
          <TouchableOpacity style={styles.irInicio} onPress={() => navigation.navigate("Inicio")}>
            <Text style={styles.irInicioTexto}>Explorar productos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListFooterComponent={
              <View>
                <Text style={styles.total}>Total: ${total}</Text>
              </View>
            }
          />

          {/* Botón cancelar compra (antes de confirmar/pagar) */}
          <TouchableOpacity style={styles.cancelar} onPress={() => setConfirmacionVisible(true)}>
            <Text style={styles.cancelarTexto}>Cancelar compra</Text>
          </TouchableOpacity>

          {/* Botón confirmar compra → abre modal de pago */}
          <TouchableOpacity style={styles.confirmar} onPress={() => setPagoVisible(true)}>
            <Text style={styles.confirmarTexto}>Confirmar compra</Text>
          </TouchableOpacity>

          {/* Modal de pago */}
          <PagoModal
            visible={pagoVisible}
            onCerrar={() => setPagoVisible(false)}
            onConfirmar={guardarCompra}
          />

          {/* Confirmación al cancelar carrito */}
          <AlertaModalConfirmacion
            visible={confirmacionVisible}
            titulo="Cancelar compra"
            mensaje="¿Seguro que deseas cancelar tu carrito? Esta acción no se puede deshacer."
            onCancelar={() => setConfirmacionVisible(false)}
            onConfirmar={() => {
              limpiarCarrito();
              setConfirmacionVisible(false);
              setAlertaTitulo("Compra cancelada");
              setAlertaMensaje("Tu carrito fue cancelado correctamente.");
              setAlertaVisible(true);
            }}
          />

          {/* Alertas informativas */}
          <AlertaModal
            visible={alertaVisible}
            titulo={alertaTitulo}
            mensaje={alertaMensaje}
            onCerrar={() => setAlertaVisible(false)}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  titulo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#333",
  },
  info: { flex: 1 },
  nombre: { color: "#fff", fontSize: 16, fontWeight: "600" },
  detalle: { color: "#aaa", fontSize: 14, marginTop: 2 },
  cantidadRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  botonCantidad: {
    backgroundColor: "#D96C9F",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  botonTexto: { color: "#fff", fontSize: 18, fontWeight: "600" },
  cantidad: { color: "#fff", fontSize: 16, minWidth: 28, textAlign: "center" },
  subtotal: { color: "#D96C9F", marginTop: 6, fontWeight: "600" },
  total: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 12 },
  confirmar: {
    backgroundColor: "#D96C9F",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmarTexto: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cancelar: {
    backgroundColor: "#e63946",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelarTexto: { color: "#fff", fontSize: 16, fontWeight: "600" },
  vacioBox: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  vacioTexto: { color: "#aaa", fontSize: 14 },
  irInicio: {
    marginTop: 12,
    backgroundColor: "#D96C9F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  irInicioTexto: { color: "#fff", fontWeight: "600" },
});