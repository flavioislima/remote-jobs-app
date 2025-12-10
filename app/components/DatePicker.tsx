import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Modal, Portal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
  const months = t('datepicker.months', { returnObjects: true }) as string[];

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onCancel}
        contentContainerStyle={styles.datePickerOverlay}
      >
        <View style={styles.datePickerContent}>
          <Text variant="titleLarge" style={styles.datePickerTitle}>{t('datepicker.selectDate')}</Text>

        <Text variant="titleMedium" style={styles.datePickerLabel}>{t('datepicker.year')}</Text>
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
        
        <Text variant="titleMedium" style={styles.datePickerLabel}>{t('datepicker.month')}</Text>
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
            mode="outlined"
            style={styles.buttonContainer}
            buttonColor='#c00505ff'
            textColor='#fff'
            onPress={onCancel}
          >
            {t('common.cancel')}
          </Button>
          <Button
            mode="contained"
            style={styles.buttonContainer}
            onPress={handleApply}
          >
            {t('common.apply')}
          </Button>
        </View>
      </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  datePickerOverlay: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginHorizontal: '5%'
  },
  datePickerContent: {
    width: '100%'
  },
  datePickerTitle: {
    marginBottom: 15,
    textAlign: 'center'
  },
  datePickerLabel: {
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
    flex: 1,
    marginHorizontal: 5
  }
});

export default DatePicker;
