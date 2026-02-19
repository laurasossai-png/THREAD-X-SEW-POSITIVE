
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = '@threadx_swap_bag';

interface SwapBagItem {
  id: string;
  name: string;
  category: string;
  size: string;
  colour: string;
  condition: string;
  notes: string;
}

const CATEGORIES = ['Top', 'Bottom', 'Dress', 'Outerwear', 'Accessories', 'Other'];
const CONDITIONS = ['Excellent', 'Good', 'Worn but Loved'];

export default function SwapBagScreen() {
  const [items, setItems] = useState<SwapBagItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Top');
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');
  const [condition, setCondition] = useState('Good');
  const [notes, setNotes] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showConditionPicker, setShowConditionPicker] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const loadedItems = JSON.parse(savedData);
        setItems(loadedItems);
        console.log('Loaded swap bag items from storage:', loadedItems.length);
      }
    } catch (error) {
      console.error('Failed to load swap bag items:', error);
    }
  };

  const saveItems = async (newItems: SwapBagItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      console.log('Saved swap bag items to storage');
    } catch (error) {
      console.error('Failed to save swap bag items:', error);
    }
  };

  const handleAddItem = () => {
    console.log('User tapped Add Item button');
    
    if (!name.trim() || !size.trim() || !colour.trim()) {
      console.log('Validation failed: missing required fields');
      return;
    }

    const newItem: SwapBagItem = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      size: size.trim(),
      colour: colour.trim(),
      condition,
      notes: notes.trim(),
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItems(updatedItems);

    setName('');
    setSize('');
    setColour('');
    setNotes('');
    console.log('Added new item to swap bag');
  };

  const handleDeleteItem = (id: string) => {
    console.log('User deleted item:', id);
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const totalCount = items.length;
  const reminderText = 'Bring clean, wearable items ready to find a new home.';

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Add Clothing Item</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Blue Denim Jacket"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={styles.pickerButtonText}>{category}</Text>
            </TouchableOpacity>
            {showCategoryPicker && (
              <View style={styles.pickerOptions}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={styles.pickerOption}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text style={styles.pickerOptionText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Size</Text>
            <TextInput
              style={styles.input}
              value={size}
              onChangeText={setSize}
              placeholder="e.g., M, L, 10"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Colour</Text>
            <TextInput
              style={styles.input}
              value={colour}
              onChangeText={setColour}
              placeholder="e.g., Blue, Red"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Condition</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowConditionPicker(!showConditionPicker)}
            >
              <Text style={styles.pickerButtonText}>{condition}</Text>
            </TouchableOpacity>
            {showConditionPicker && (
              <View style={styles.pickerOptions}>
                {CONDITIONS.map((cond) => (
                  <TouchableOpacity
                    key={cond}
                    style={styles.pickerOption}
                    onPress={() => {
                      setCondition(cond);
                      setShowConditionPicker(false);
                    }}
                  >
                    <Text style={styles.pickerOptionText}>{cond}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Any additional details"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddItem}
          >
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>My Items</Text>
            <Text style={styles.totalCount}>{totalCount}</Text>
          </View>

          {items.length === 0 ? (
            <Text style={styles.emptyText}>No items added yet</Text>
          ) : (
            <View>
              {items.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteItem(item.id)}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemDetail}>{item.category}</Text>
                  <Text style={styles.itemDetail}>Size: {item.size}</Text>
                  <Text style={styles.itemDetail}>Colour: {item.colour}</Text>
                  <Text style={styles.itemDetail}>Condition: {item.condition}</Text>
                  {item.notes ? (
                    <Text style={styles.itemNotes}>{item.notes}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>{reminderText}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 12,
    paddingBottom: 40,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
  },
  pickerOptions: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pickerOptionText: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
  },
  addButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
  listSection: {
    marginBottom: 32,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalCount: {
    fontSize: 20,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.accent,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: '#999',
    textAlign: 'center',
    marginVertical: 24,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: Colors.secondaryButton,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    fontSize: 14,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
  itemDetail: {
    fontSize: 14,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  itemNotes: {
    fontSize: 14,
    fontFamily: 'Fraunces_400Regular',
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  reminderContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.accent,
    borderRadius: 8,
  },
  reminderText: {
    fontSize: 16,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
