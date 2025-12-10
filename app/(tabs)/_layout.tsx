import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const iconName = route.name === 'index' ? 'briefcase' : 'heart-multiple';
          return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: '#1E2229',
        tabBarInactiveTintColor: '#858585',
        tabBarStyle: { 
          backgroundColor: '#F6F9FE' 
        },
        tabBarShowLabel: true,
        headerShown: false, // Show header on all tabss
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.allJobs'),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('tabs.favorites'),
        }}
      />
    </Tabs>
  );
}
