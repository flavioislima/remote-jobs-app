import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Platform, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

export default function TabLayout() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 1024;

  if (isDesktop) {
    // Desktop layout with sidebar
    return (
      <View style={styles.desktopContainer}>
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.navLink} onPress={() => router.push('/')}>
            <MaterialCommunityIcons name="briefcase" size={25} color="#1E2229" />
            <Text style={styles.navText}>{t('tabs.allJobs')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink} onPress={() => router.push('/favorites')}>
            <MaterialCommunityIcons name="heart-multiple" size={25} color="#1E2229" />
            <Text style={styles.navText}>{t('tabs.favorites')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {/* The slot for the current tab */}
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="favorites" />
          </Tabs>
        </View>
      </View>
    );
  }

  // Mobile layout with tabs
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
        headerShown: false,
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

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#F6F9FE',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    textDecorationLine: 'none',
  },
  navText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1E2229',
  },
  content: {
    flex: 1,
  },
});
