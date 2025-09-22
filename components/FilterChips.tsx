import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

interface FilterChipsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  title?: string;
}

export default function FilterChips({ options, selected, onSelect, title }: FilterChipsProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.chip,
              selected === option && styles.chipSelected
            ]}
            onPress={() => {
              if (option && option.trim()) {
                onSelect(option.trim());
              }
            }}
            testID={`filter-chip-${option}`}
          >
            <Text style={[
              styles.chipText,
              selected === option && styles.chipTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  chipSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
});