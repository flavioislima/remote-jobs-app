import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SalaryProps {
  salary: string;
}

const Salary: React.FC<SalaryProps> = ({ salary }) => (
  <View style={styles.container}>
    <Text style={styles.salary}>{salary}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4
  }
});

export default Salary;
