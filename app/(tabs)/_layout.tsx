import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = route.name === 'index' ? 'briefcase' : 'heart-multiple';
          return <MaterialCommunityIcons name={iconName as any} size={25} color={color} />;
        },
        tabBarActiveTintColor: '#1E2229',
        tabBarInactiveTintColor: '#858585',
        tabBarStyle: { 
          backgroundColor: '#F6F9FE' 
        },
        tabBarShowLabel: true,
        headerShown: true // Show header on all tabs
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Remote Jobs',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
        }}
      />
    </Tabs>
  );
}
