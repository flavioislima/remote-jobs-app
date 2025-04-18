import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ErrorProps {
  onPress?: () => void;
}

const Error: React.FC<ErrorProps> = ({ onPress }) => (
  <View style={styles.container}>
    <MaterialCommunityIcons name="alert-circle-outline" size={60} color="#f44336" />
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.description}>
      Sorry, no jobs found! This is probably a server or network error.
    </Text>
    {onPress && (
      <TouchableOpacity style={styles.retryButton} onPress={onPress}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10
  },
  description: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  },
  retryButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Error;
