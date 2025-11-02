import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClienteScreen from '../../Screens/cliente/ClienteScreen';
import FavoritosScreen from '../../Screens/cliente/FavoritosScreen';
import ComprasScreen from '../../Screens/cliente/ComprasScreen';
import SettingsClienteScreen from '../../Screens/cliente/SettingsClienteScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavoritosProvider } from '../cliente/FavoritosContext';

const Tab = createBottomTabNavigator();

export default function ClienteTabs() {
  return (
    <FavoritosProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopColor: '#333',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#D96C9F',
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={ClienteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Compras"
          component={ComprasScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ajustes"
          component={SettingsClienteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </FavoritosProvider>
  );
}