import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


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
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        initialRouteName="Productos"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopColor: '#333',
            height: 60,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: '#D96C9F',
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
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
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
};