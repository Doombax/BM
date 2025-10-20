import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { View } from "react-native";
import { auth } from "./src/database/firebaseConfig";
import Login from "./src/components/Login";
import Productos from "./src/views/Productos";
import HomeScreen from "./src/views/HomeScreen";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Escucha los cambios en la autenticación (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return unsubscribe;
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  if (!usuario) {
    // Si no hay usunario auteticado, mostrar login
    return <Login onLoginSuccess={() => setUsuario(auth.currentUser)} />;
  }

  // Si hay usuario autenticado, mostrar productos
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen cerrarSesion={cerrarSesion} />
    </View>
  );
  
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Productos" component={Productos} options={{ title: 'Productos' }} />
        <Stack.Screen name="Clientes" component={Clientes} options={{ title: 'Clientes' }} />
        <Stack.Screen name="Promedio" component={Promedio} options={{ title: 'Promedio' }} />
        <Stack.Screen name="Empleados" component={Empleados} options={{ title: 'Empleados' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
