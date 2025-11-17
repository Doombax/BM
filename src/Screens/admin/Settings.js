import React, { useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../database/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "firebase/auth";
import AlertaModal from "../../components/shared/AlertaModal";

export default function PerfilScreen() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [rol, setRol] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [creado, setCreado] = useState(null);

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState("");
  const [alertaMensaje, setAlertaMensaje] = useState("");
  const [redirigir, setRedirigir] = useState(false);

  const user = auth.currentUser;
  const navigation = useNavigation();

  const cargarPerfil = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, "usuarios", user.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setNombres(data.nombres || "");
        setApellidos(data.apellidos || "");
        setEdad(data.edad?.toString() || "");
        setDireccion(data.direccion || "");
        setRol(data.rol || "");
        setFotoPerfil(data.fotoPerfil || null); // 👈 base64
        setCreado(data.creado?.seconds ? new Date(data.creado.seconds * 1000) : null);
      }
    } catch (error) {
      console.error("Error cargando perfil:", error);
      setAlertaTitulo("Error");
      setAlertaMensaje("No se pudo cargar tu perfil.");
      setAlertaVisible(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [])
  );

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true, // 👈 importante
    });

    if (!result.canceled) {
      const base64Img = result.assets[0].base64;
      setFotoPerfil(base64Img);
    }
  };

  const guardarPerfil = async () => {
    try {
      await setDoc(
        doc(db, "usuarios", user.uid),
        {
          nombres,
          apellidos,
          edad: parseInt(edad),
          direccion,
          fotoPerfil, // 👈 guardamos base64
          correo: user.email,
          rol,
          creado: creado || new Date(),
        },
        { merge: true }
      );

      setAlertaTitulo("Perfil actualizado");
      setAlertaMensaje("Tu información se guardó correctamente.");
      setAlertaVisible(true);
    } catch (error) {
      console.error("Error guardando perfil:", error);
      setAlertaTitulo("Error");
      setAlertaMensaje("No se pudo guardar tu perfil.");
      setAlertaVisible(true);
    }
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setAlertaTitulo("Sesión cerrada");
      setAlertaMensaje("Has salido correctamente.");
      setRedirigir(true);
      setAlertaVisible(true);
    } catch (error) {
      setAlertaTitulo("Error");
      setAlertaMensaje("No se pudo cerrar la sesión.");
      setRedirigir(false);
      setAlertaVisible(true);
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Mi Perfil</Text>

      <TouchableOpacity onPress={seleccionarImagen}>
        {fotoPerfil ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${fotoPerfil}` }}
            style={styles.foto}
          />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={{ color: "#aaa" }}>Seleccionar foto</Text>
          </View>
        )}
      </TouchableOpacity>

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
        placeholder="Edad"
        placeholderTextColor="#888"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="#888"
        value={direccion}
        onChangeText={setDireccion}
      />

      <Text style={styles.correo}>Correo: {user?.email}</Text>
      <Text style={styles.rol}>Rol: {rol}</Text>

      {creado && (
        <Text style={styles.fecha}>
          Cuenta creada: {creado.toLocaleString()}
        </Text>
      )}

      <TouchableOpacity style={styles.boton} onPress={guardarPerfil}>
        <Text style={styles.botonTexto}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonCerrar} onPress={cerrarSesion}>
        <Text style={styles.botonTexto}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* 👇 AlertaModal integrado */}
      <AlertaModal
        visible={alertaVisible}
        titulo={alertaTitulo}
        mensaje={alertaMensaje}
        onCerrar={() => {
          setAlertaVisible(false);
          if (redirigir) navigation.replace("PublicoTabs");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  titulo: { color: "#fff", fontSize: 20, fontWeight: "600", marginBottom: 20 },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  correo: { color: "#aaa", marginBottom: 6 },
  rol: { color: "#aaa", marginBottom: 6 },
  fecha: { color: "#888", marginBottom: 20 },
  boton: {
    backgroundColor: "#D96C9F",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  botonCerrar: {
    backgroundColor: "#e63946",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botonTexto: { color: "#fff", fontSize: 16, fontWeight: "600" },
});