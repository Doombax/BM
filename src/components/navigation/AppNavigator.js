import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// cata publico e inicio de sesion
import PublicoTabs from './PublicoTabs';
import LoginScreen from '../../auth/LoginForm';

// Cliente
import ClienteTabs from './ClienteTabs';

// Admin
import AdminTabs from './AdminTabs';
import AgregarProductoScreen from '../../Screens/admin/AgregarProductoScreen';
import AgregarCategoriaScreen from '../../Screens/admin/AgregarCategriaScreen';
import EditarProductoScreen from '../../Screens/admin/EditarProductoScreen';
import EditarCategoriaScreen from '../../Screens/admin/EditarCategoriaScreen';
import ActualizarStockScreen from '../../Screens/admin/ActualizarStockScreen';
import RegistroUsuarioScreen from '../../Screens/auth/RegistroUsuario';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PublicoTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PublicoTabs" component={PublicoTabs} />
        
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuarioScreen} />

        <Stack.Screen name="ClienteTabs" component={ClienteTabs} />

        <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="AgregarProducto" component={AgregarProductoScreen} />
        <Stack.Screen name="AgregarCategoria" component={AgregarCategoriaScreen} />
        <Stack.Screen name="ActualizarStock" component={ActualizarStockScreen} />
        <Stack.Screen name="EditarProducto" component={EditarProductoScreen} />
        <Stack.Screen name="EditarCategoria" component={EditarCategoriaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}