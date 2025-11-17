import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../database/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import AlertaModal from '../components/shared/AlertaModal';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState('');
  const [alertaMensaje, setAlertaMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rol = docSnap.data().rol;

        if (rol === 'admin') {
          // 👇 reset para que no quede LoginScreen en el stack
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'AdminTabs' }],
            })
          );
        } else if (rol === 'cliente') {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'ClienteTabs' }],
            })
          );
        } else {
          setAlertaTitulo('Acceso denegado');
          setAlertaMensaje('Usuario sin rol válido.');
          setAlertaVisible(true);
        }
      } else {
        setAlertaTitulo('Error');
        setAlertaMensaje('No se encontró información del usuario.');
        setAlertaVisible(true);
      }
    } catch (error) {
      setAlertaTitulo('Credenciales incorrectas');
      setAlertaMensaje('Verificá tu correo y contraseña.');
      setAlertaVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.inner}>
        <View style={styles.logoContainer}>
          <Image source={require('../components/img/logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.titulo}>boutique morales</Text>
        <Text style={styles.subtitulo}>Tu Estilo Nuestra Moda</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.boton} onPress={handleLogin}>
            <Text style={styles.botonTexto}>Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RegistroUsuario')}>
            <Text style={styles.link}>¿No tienes una cuenta? Crear cuenta</Text>
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
  container: { flex: 1, backgroundColor: '#121212' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 200, height: 120, resizeMode: 'contain' },
  titulo: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 30,
  },
  form: { gap: 16 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#D96C9F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  link: {
    color: '#D96C9F',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14
  },
});