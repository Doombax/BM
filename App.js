import React, { useEffect, useState } from "react";
import Productos from "./src/views/Productos";
import HomeScreen from "./src/views/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Categoria from "./src/views/Categoria";

export default function App() {
  const [usuario, setUsuario] = useState(null);
const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Productos" component={Productos} options={{ title: 'Productos' }} />
        <Stack.Screen name="Categoria" component={Categoria} options={{ title: 'Categoria' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
