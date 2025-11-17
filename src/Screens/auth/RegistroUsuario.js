import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,KeyboardAvoidingView,Platform,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { auth, db } from '../../database/firebaseConfig';
import AlertaModal from "../../components/shared/AlertaModal";

export default function RegistroUsuarioScreen({ navigation }) {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [direccion, setDireccion] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cargando, setCargando] = useState(false);
    const [alertaVisible, setAlertaVisible] = useState(false);
    const [alertaTitulo, setAlertaTitulo] = useState("");
    const [alertaMensaje, setAlertaMensaje] = useState("");

    const validarCampos = () => {
        if (!nombres.trim() || !apellidos.trim() || !direccion.trim()) {
            setAlertaTitulo("Campos incompletos");
            setAlertaMensaje("Completá nombres, apellidos y dirección.");
            setAlertaVisible(true);
            return false;
        }
        const edadNum = Number(edad);
        if (!edad || Number.isNaN(edadNum) || edadNum <= 0) {
            setAlertaTitulo("Edad inválida");
            setAlertaMensaje("Ingresá una edad válida (número mayor a 0).");
            setAlertaVisible(true);
            return false;
        }
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!correoValido) {
            setAlertaTitulo("Correo inválido");
            setAlertaMensaje("Ingresá un correo electrónico válido.");
            setAlertaVisible(true);
            return false;
        }
        if (!password || password.length < 6) {
            setAlertaTitulo("Contraseña débil");
            setAlertaMensaje("La contraseña debe tener al menos 6 caracteres.");
            setAlertaVisible(true);
            return false;
        }
        return true;
    };

    const registrarUsuario = async () => {
        if (!validarCampos()) return;

        try {
            setCargando(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const snapshot = await getDocs(collection(db, "usuarios"));
            const existeAdmin = snapshot.docs.some((d) => d.data().rol === "admin");

            const rol = existeAdmin ? "cliente" : "admin";

            await setDoc(doc(db, "usuarios", user.uid), {
                nombres: nombres.trim(),
                apellidos: apellidos.trim(),
                direccion: direccion.trim(),
                edad: Number(edad),
                email: user.email,
                rol,
                creado: new Date(),
            });

            setAlertaTitulo("Registro exitoso");
            setAlertaMensaje(`Cuenta creada`);
            setAlertaVisible(true);

            setTimeout(() => {
                setAlertaVisible(false);
                navigation.replace("Login");
            }, 800);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setAlertaTitulo("Error de registro");
            setAlertaMensaje("No se pudo registrar el usuario. Verificá los datos o intentá más tarde.");
            setAlertaVisible(true);
        } finally {
            setCargando(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inner}
            >
                <Text style={styles.titulo}>Crear cuenta</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombres"
                        placeholderTextColor="#888"
                        value={nombres}
                        onChangeText={setNombres}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellidos"
                        placeholderTextColor="#888"
                        value={apellidos}
                        onChangeText={setApellidos}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Dirección"
                        placeholderTextColor="#888"
                        value={direccion}
                        onChangeText={setDireccion}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Edad"
                        placeholderTextColor="#888"
                        value={edad}
                        onChangeText={setEdad}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[styles.boton, cargando && styles.botonDisabled]}
                        onPress={registrarUsuario}
                        disabled={cargando}
                    >
                        <Text style={styles.botonTexto}>{cargando ? "Registrando..." : "Registrarse"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.replace("Login")}>
                        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

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
    container: { flex: 1, backgroundColor: "#121212" },
    inner: { flex: 1, justifyContent: "center", paddingHorizontal: 30 },
    titulo: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "600",
        color: "#FFFFFF",
        marginBottom: 20,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    form: { gap: 12 },
    input: {
        backgroundColor: "#1E1E1E",
        color: "#fff",
        padding: 12,
        borderRadius: 8,
    },
    boton: {
        backgroundColor: "#D96C9F",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    botonDisabled: {
        opacity: 0.7,
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    link: {
        color: "#D96C9F",
        textAlign: "center",
        marginTop: 12,
        fontSize: 14
    },
});