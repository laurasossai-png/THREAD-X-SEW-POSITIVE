
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = '@threadx_checklist';

interface ChecklistState {
  ticketReady: boolean;
  clothesPacked: boolean;
  itemsCleaned: boolean;
  toteBag: boolean;
  readyToSwap: boolean;
}

export default function ChecklistScreen() {
  const [checklist, setChecklist] = useState<ChecklistState>({
    ticketReady: false,
    clothesPacked: false,
    itemsCleaned: false,
    toteBag: false,
    readyToSwap: false,
  });

  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const loadedChecklist = JSON.parse(savedData);
        setChecklist(loadedChecklist);
        console.log('Loaded checklist from storage');
      }
    } catch (error) {
      console.error('Failed to load checklist:', error);
    }
  };

  const saveChecklist = async (newChecklist: ChecklistState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newChecklist));
      console.log('Saved checklist to storage');
    } catch (error) {
      console.error('Failed to save checklist:', error);
    }
  };

  const toggleItem = (key: keyof ChecklistState) => {
    console.log('User toggled checklist item:', key);
    const newChecklist = {
      ...checklist,
      [key]: !checklist[key],
    };
    setChecklist(newChecklist);
    saveChecklist(newChecklist);
  };

  const allChecked = Object.values(checklist).every(value => value === true);
  const completionMessage = "You're officially THREAD X Ready.";

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.checklistContainer}>
          <ChecklistItem
            label="Ticket ready"
            checked={checklist.ticketReady}
            onToggle={() => toggleItem('ticketReady')}
          />
          <ChecklistItem
            label="Clothes packed"
            checked={checklist.clothesPacked}
            onToggle={() => toggleItem('clothesPacked')}
          />
          <ChecklistItem
            label="Items cleaned"
            checked={checklist.itemsCleaned}
            onToggle={() => toggleItem('itemsCleaned')}
          />
          <ChecklistItem
            label="Tote bag"
            checked={checklist.toteBag}
            onToggle={() => toggleItem('toteBag')}
          />
          <ChecklistItem
            label="Ready to swap"
            checked={checklist.readyToSwap}
            onToggle={() => toggleItem('readyToSwap')}
          />
        </View>

        {allChecked && (
          <View style={styles.completionContainer}>
            <Text style={styles.completionText}>{completionMessage}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

function ChecklistItem({ label, checked, onToggle }: ChecklistItemProps) {
  return (
    <TouchableOpacity
      style={styles.checklistItem}
      onPress={onToggle}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checklistLabel}>{label}</Text>
    </TouchableOpacity>
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
  checklistContainer: {
    gap: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
    padding: 16,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 6,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  checkmark: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checklistLabel: {
    fontSize: 18,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    flex: 1,
  },
  completionContainer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: Colors.accent,
    borderRadius: 8,
  },
  completionText: {
    fontSize: 20,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
