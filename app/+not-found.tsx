import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>The page you are looking for does not exist.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F9FE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E2229',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#858585',
  },
});