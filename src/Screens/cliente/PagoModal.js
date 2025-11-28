import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import AlertaModal from "../../components/shared/AlertaModal";
import AlertaModalConfirmacion from "../../components/shared/AlertaModalConfirmacion";

export default function PagoModal({ visible, onCerrar, onConfirmar }) {
    const [numero, setNumero] = useState("");
    const [cvv, setCvv] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [titular, setTitular] = useState("");

    const [alertaVisible, setAlertaVisible] = useState(false);
    const [alertaTitulo, setAlertaTitulo] = useState("");
    const [alertaMensaje, setAlertaMensaje] = useState("");

    const [confirmacionVisible, setConfirmacionVisible] = useState(false);

    const validarYConfirmar = () => {
        // vencimiento stored as 4 digits MMYY
        if (numero.length !== 16 || cvv.length !== 3 || vencimiento.length !== 4 || !titular.trim()) {
            setAlertaTitulo("Datos inválidos");
            setAlertaMensaje("Por favor completa los datos correctamente.");
            setAlertaVisible(true);
            return;
        }
        setConfirmacionVisible(true); // mostrar confirmación antes de pagar
    };

    const ejecutarPago = () => {
        onConfirmar({ numero, cvv, vencimiento, titular });
        setConfirmacionVisible(false);
        setAlertaTitulo("Pago exitoso");
        setAlertaMensaje("Tu pago fue procesado correctamente.");
        setAlertaVisible(true);
        limpiarCampos();
    };

    const limpiarCampos = () => {
        setNumero("");
        setCvv("");
        setVencimiento("");
        setTitular("");
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.titulo}>Pago con tarjeta</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Número de tarjeta (16 dígitos)"
                        keyboardType="numeric"
                        value={numero}
                        onChangeText={setNumero}
                        maxLength={16}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Código de seguridad (CVV)"
                        keyboardType="numeric"
                        value={cvv}
                        onChangeText={setCvv}
                        maxLength={3}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Fecha de vencimiento (MM/AA)"
                        keyboardType="numeric"
                        value={(function format(v){
                            if(!v) return '';
                            if(v.length <= 2) return v;
                            return v.substring(0,2) + '/' + v.substring(2,4);
                        })(vencimiento)}
                        onChangeText={(text) => {
                            // keep only digits
                            const digits = text.replace(/[^0-9]/g, '');
                            // limit to 4 digits (MMYY)
                            setVencimiento(digits.substring(0,4));
                        }}
                        maxLength={5}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del titular"
                        value={titular}
                        onChangeText={(text) => {
                            // Permitir solo letras y espacios (soporta acentos mediante fallback)
                            try {
                                const sanitized = text.replace(/[^^\p{L}\s]/gu, '');
                                setTitular(sanitized);
                            } catch (e) {
                                const sanitized = text.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]/g, '');
                                setTitular(sanitized);
                            }
                        }}
                    />

                    <TouchableOpacity style={styles.botonConfirmar} onPress={validarYConfirmar}>
                        <Text style={styles.botonTexto}>Confirmar pago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonCancelar} onPress={onCerrar}>
                        <Text style={styles.botonTexto}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal de confirmación */}
            <AlertaModalConfirmacion
                visible={confirmacionVisible}
                titulo="Confirmar pago"
                mensaje="¿Deseas confirmar el pago con la tarjeta ingresada?"
                onCancelar={() => setConfirmacionVisible(false)}
                onConfirmar={ejecutarPago}
            />

            {/* Modal de alerta informativa */}
            <AlertaModal
                visible={alertaVisible}
                titulo={alertaTitulo}
                mensaje={alertaMensaje}
                onCerrar={() => setAlertaVisible(false)}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    card: {
        backgroundColor: "#1E1E1E",
        padding: 20,
        borderRadius: 12,
        width: "90%",
    },
    titulo: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#333",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    botonConfirmar: {
        backgroundColor: "#D96C9F",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    botonCancelar: {
        backgroundColor: "#e63946",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "600",
    },
});