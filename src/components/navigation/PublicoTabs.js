import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CatalogoPublicoScreen from '../../Screens/publico/CatalogoPublicoScreen';
import FavoritosPublicoScreen from '../../Screens/publico/FavoritosPublicoScreen';
import ComprasPublicoScreen from '../../Screens/publico/ComprasPublicoScreen';

const Tab = createBottomTabNavigator();

export default function PublicoTabs() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Tab.Navigator
                initialRouteName="Inicio"
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
                        if (route.name === 'Inicio') iconName = 'home-outline';
                        else if (route.name === 'Favoritos') iconName = 'heart-outline';
                        else if (route.name === 'Compras') iconName = 'cart-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Inicio" component={CatalogoPublicoScreen} />
                <Tab.Screen name="Favoritos" component={FavoritosPublicoScreen} />
                <Tab.Screen name="Compras" component={ComprasPublicoScreen} />
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