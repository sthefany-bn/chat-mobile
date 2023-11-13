import React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenPerfil, ScreenCamera, ScreenLocation, ScreenAcelerometer } from '../screens'
import { colors } from '../styles/colors';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

type TabParamList = {
  Perfil: undefined
  Camera: undefined
  Location: undefined
  Acelerometer: undefined
}

type TabScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Perfil'>
export type TabTypes = {
  navigation: TabScreenNavigationProp
}

export function TabNavigation() {
  const Tab = createBottomTabNavigator<TabParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray
      }}
    >
      <Tab.Screen name="Perfil" component={ScreenPerfil}
        options={{
          tabBarIcon: () => (
            <Ionicons name='person' color={colors.white} size={24} />
          ),
        }}
      />
      <Tab.Screen name="Camera" component={ScreenCamera}
        options={{
          tabBarIcon: () => (
            <AntDesign name='camera' color={colors.white} size={24} />
          ),
        }}
      />
      <Tab.Screen name='Location' component={ScreenLocation}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="map-marker" color={colors.white} size={24} />
            
          ),
        }}
      />
      <Tab.Screen name='Acelerometer' component={ScreenAcelerometer}
        options={{
          tabBarIcon: () => (<AntDesign name="car" color={colors.white} size={24} />)
        }}
      />
    </Tab.Navigator>
  );
}
