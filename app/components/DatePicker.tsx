import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Overlay } from '@rneui/themed';

interface DatePickerProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  initialDate = new Date(),
  minimumDate = new Date(2023, 0, 1),
  maximumDate = new Date()
}) => {
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  
  // Reset the picker when initial date changes
  useEffect(() => {
    if (initialDate) {
      setYear(initialDate.getFullYear());
      setMonth(initialDate.getMonth());
    }
  }, [initialDate]);
  
  const handleApply = () => {
    const selectedDate = new Date(year, month, 1);
    onConfirm(selectedDate);
  };
  
  // Get available years (from minYear to maxYear)
  const minYear = minimumDate ? minimumDate.getFullYear() : 2023;
  const maxYear = maximumDate ? maximumDate.getFullYear() : new Date().getFullYear();
  
  // Create years array in reverse order (newest first)
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );
  
  // Month names
  const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onCancel}
      overlayStyle={styles.datePickerOverlay}
    >
      <View style={styles.datePickerContent}>
        <Text style={styles.datePickerTitle}>Select Date</Text>
        
        <Text style={styles.datePickerLabel}>Year</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.yearPicker}>
          {years.map(y => (
            <TouchableOpacity
              key={y}
              style={[
                styles.yearItem,
                year === y && styles.selectedItem
              ]}
              onPress={() => setYear(y)}
            >
              <Text style={[
                styles.yearText,
                year === y && styles.selectedItemText
              ]}>
                {y}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.datePickerLabel}>Month</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthPicker}>
          {months.map((m, index) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.monthItem,
                month === index && styles.selectedItem
              ]}
              onPress={() => setMonth(index)}
            >
              <Text style={[
                styles.monthText,
                month === index && styles.selectedItemText
              ]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.datePickerButtons}>
          <Button
            title="Cancel"
            type="outline"
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.cancelButton}
            onPress={onCancel}
          />
          <Button
            title="Apply"
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.applyDateButton}
            onPress={handleApply}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  datePickerOverlay: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff'
  },
  datePickerContent: {
    width: '100%'
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  datePickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 8
  },
  yearPicker: {
    flexGrow: 0,
    marginBottom: 15
  },
  monthPicker: {
    flexGrow: 0,
    marginBottom: 20
  },
  yearItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8'
  },
  monthItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8'
  },
  selectedItem: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3'
  },
  yearText: {
    fontSize: 14,
    color: '#333'
  },
  monthText: {
    fontSize: 14,
    color: '#333'
  },
  selectedItemText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  buttonContainer: {
    width: '48%'
  },
  cancelButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 10
  },
  applyDateButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 10
  }
});

export default DatePicker;
