import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collectionGroup, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import AlertaModal from "../../components/shared/AlertaModal";
import AlertaModalConfirmacion from "../../components/shared/AlertaModalConfirmacion";

export default function PedidosScreen() {
    const [pedidos, setPedidos] = useState([]);
    const [confirmacionVisible, setConfirmacionVisible] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    const [alertaVisible, setAlertaVisible] = useState(false);
    const [alertaTitulo, setAlertaTitulo] = useState("");
    const [alertaMensaje, setAlertaMensaje] = useState("");

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const snapshot = await getDocs(collectionGroup(db, "compras"));
            const lista = [];

            for (const docSnap of snapshot.docs) {
                const compraData = { id: docSnap.id, ...docSnap.data(), path: docSnap.ref.path };

                // usuarios/{uid}/compras/{compraId}
                const pathParts = docSnap.ref.path.split("/");
                const uidCliente = pathParts[1];

                const userDoc = await getDoc(doc(db, "usuarios", uidCliente));
                const userData = userDoc.exists() ? userDoc.data() : {};

                lista.push({
                    ...compraData,
                    nombres: userData.nombres || "",
                    apellidos: userData.apellidos || "",
                    direccion: userData.direccion || "",
                });
            }

            setPedidos(lista);
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return "";
        const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
        return date.toLocaleDateString("es-NI", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const generarExcel = async () => {
        try {
            const compras = pedidos.map((p) => ({
                fecha: p.fecha?.toDate ? p.fecha.toDate().toISOString() : new Date(p.fecha).toISOString(),
                cliente: `${p.nombres || ""} ${p.apellidos || ""}`.trim(),
                total: Number(p.total) || 0,
                productos: (p.productos || []).map((prod) => ({
                    nombre: prod.nombre || "",
                    cantidad: Number(prod.cantidad) || 0,
                    subtotal: Number(prod.subtotal) || 0,
                })),
            }));

            if (!compras.length) {
                Alert.alert("Sin datos", "No hay compras para exportar.");
                return;
            }

            const response = await fetch("https://gi32qd73c9.execute-api.us-east-2.amazonaws.com/excel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ compras, opciones: { formatoMes: "es-NI" } }),
            });

            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

            const base64 = await response.text();

            const fileUri = FileSystem.documentDirectory + "reporte-compras.xlsx";
            await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: "base64" });

            Alert.alert("Excel generado", "El archivo se guardó correctamente y está listo para compartir.");

            await Sharing.shareAsync(fileUri, {
                mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                dialogTitle: "Compartir reporte",
                UTI: "com.microsoft.excel.xlsx",
            });
        } catch (error) {
            console.error("Error generando Excel:", error);
            Alert.alert("Error", "No se pudo generar el Excel.");
        }
    };

    const marcarEnviado = async () => {
        if (!pedidoSeleccionado) return;
        try {
            await updateDoc(doc(db, pedidoSeleccionado.path), {
                estado: "enviado",
                mensaje: "Su pedido llegará en 30 días",
            });
            setConfirmacionVisible(false);
            setAlertaTitulo("Pedido actualizado");
            setAlertaMensaje("El pedido fue marcado como enviado.");
            setAlertaVisible(true);
            cargarPedidos();
        } catch (error) {
            console.error("Error actualizando pedido:", error);
            setAlertaTitulo("Error");
            setAlertaMensaje("No se pudo actualizar el pedido.");
            setAlertaVisible(true);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.nombre}>
                Cliente: {item.nombres} {item.apellidos}
            </Text>
            <Text style={styles.detalle}>Dirección: {item.direccion}</Text>
            <Text style={styles.detalle}>Estado: {item.estado}</Text>

            <Text style={styles.subtitulo}>Productos:</Text>
            {item.productos?.map((p, idx) => (
                <Text key={idx} style={styles.producto}>
                    • {p.nombre} x{p.cantidad} (${p.subtotal})
                </Text>
            ))}

            <Text style={styles.total}>Total del pedido: ${item.total}</Text>
            <Text style={styles.fecha}>Fecha: {formatearFecha(item.fecha)}</Text>

            {item.estado === "en espera" && (
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        setPedidoSeleccionado(item);
                        setConfirmacionVisible(true);
                    }}
                >
                    <Text style={styles.botonTexto}>Marcar como enviado</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Lista de Pedidos</Text>

            <View style={{ marginBottom: 10 }}>
                <TouchableOpacity style={styles.boton} onPress={generarExcel}>
                    <Text style={styles.botonTexto}>Generar Excel</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <AlertaModalConfirmacion
                visible={confirmacionVisible}
                titulo="Confirmar envío"
                mensaje="¿Deseas marcar este pedido como enviado? El cliente será notificado."
                onCancelar={() => setConfirmacionVisible(false)}
                onConfirmar={marcarEnviado}
            />

            <AlertaModal
                visible={alertaVisible}
                titulo={alertaTitulo}
                mensaje={alertaMensaje}
                onCerrar={() => setAlertaVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 16,
    },
    card: {
        backgroundColor: "#1E1E1E",
        marginBottom: 12,
        borderRadius: 10,
        padding: 12,
    },
    nombre: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    detalle: {
        color: "#aaa",
        fontSize: 13,
        marginTop: 2,
    },
    subtitulo: {
        color: "#D96C9F",
        fontSize: 14,
        marginTop: 6,
        fontWeight: "600",
    },
    producto: {
        color: "#fff",
        fontSize: 13,
        marginLeft: 8,
        marginTop: 2,
    },
    total: {
        color: "#D96C9F",
        fontSize: 15,
        fontWeight: "700",
        marginTop: 8,
    },
    fecha: {
        color: "#888",
        fontSize: 12,
        marginTop: 6,
    },
    boton: {
        backgroundColor: "#D96C9F",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "600",
    },
});