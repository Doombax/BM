import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Clientes from "./src/views/Clientes";
import Productos from "./src/views/Productos";
import HomeScreen from "./src/views/HomeScreen";
import Promedio from "./src/views/Promedio";
import Empleados from "./src/views/Empleado";

const Stack = createStackNavigator();

export default function App() {
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