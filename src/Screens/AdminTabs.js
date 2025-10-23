import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

// Vistas de administración
import ProductosScreen from '../views/ProductosScreen';
import CategoriaScreen from '../views/CategoriaScreen';
import Settings from '../views/Settings';

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  useFocusEffect(
    useCallback(() => {
      const bloquearBack = () => true;
      const backHandler = BackHandler.addEventListener('hardwareBackPress', bloquearBack);
      return () => backHandler.remove();
    }, [])
  );

  return (
    <Tab.Navigator
      initialRouteName="Productos"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#7C7CFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f7f7ff',
          borderTopColor: '#ccc',
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Productos') iconName = 'shirt-outline';
          else if (route.name === 'Categoría') iconName = 'pricetags-outline';
          else if (route.name === 'Configuración') iconName = 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Categoría" component={CategoriaScreen} />
      <Tab.Screen name="Configuración" component={Settings} />
    </Tab.Navigator>
  );
}