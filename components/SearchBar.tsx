import { Search, X } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = "Search phones..." }: SearchBarProps) {
  const clearSearch = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.light.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textSecondary}
        testID="search-input"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <X size={20} color={Colors.light.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  clearButton: {
    padding: 4,
  },
});