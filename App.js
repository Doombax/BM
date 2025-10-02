import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Clientes from "./src/views/Clientes";
import Productos from "./src/views/Productos";
import HomeScreen from "./src/views/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Productos" component={Productos} options={{ title: 'Productos' }} />
        <Stack.Screen name="Clientes" component={Clientes} options={{ title: 'Clientes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}