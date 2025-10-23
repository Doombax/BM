import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Pantallas principales
import LoginForm from '../components/auth/LoginForm';
import AdminTabs from './AdminTabs';
import ClienteScreen from '../views/ClienteScreen';

// Formularios separados
import AgregarProductoScreen from '../views/AgregarProductoScreen';
import AgregarCategoriaScreen from '../views/AgregarCategriaScreen';
import EditarProductoScreen from '../views/EditarProductoScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="ClienteScreen" component={ClienteScreen} />
        <Stack.Screen name="AgregarProducto" component={AgregarProductoScreen} />
        <Stack.Screen name="AgregarCategoria" component={AgregarCategoriaScreen} />
        <Stack.Screen name="EditarProducto" component={EditarProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}