import React, { useState } from 'react';
import {TextInput,TouchableOpacity,StyleSheet,Text,View,Image,KeyboardAvoidingView,Platform,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../database/firebaseConfig';
import AlertaModal from '../shared/AlertaModal';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaTitulo, setAlertaTitulo] = useState('');
  const [alertaMensaje, setAlertaMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      if (userEmail === 'admin@gmail.com') {
        navigation.replace('AdminTabs');
      } else if (userEmail === 'cliente@gmail.com') {
        navigation.replace('ClienteScreen');
      } else {
        setAlertaTitulo('Acceso denegado');
        setAlertaMensaje('Usuario no autorizado.');
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../img/logo.png')}
            style={styles.logo}
          />
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
 logo: {
  width: 200,
  height: 120,
  resizeMode: 'contain',
},
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
  form: {
    gap: 16,
  },
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
    letterSpacing: 0.5,
  },
});