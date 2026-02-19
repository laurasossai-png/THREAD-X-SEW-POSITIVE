
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = '@threadx_ticket_details';

export default function TicketScreen() {
  const [orderNumber, setOrderNumber] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadTicketDetails();
  }, []);

  const loadTicketDetails = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const { orderNum, email, userNotes } = JSON.parse(savedData);
        setOrderNumber(orderNum || '');
        setBookingEmail(email || '');
        setNotes(userNotes || '');
        setIsSaved(true);
        console.log('Loaded ticket details from storage');
      }
    } catch (error) {
      console.error('Failed to load ticket details:', error);
    }
  };

  const handleSave = async () => {
    console.log('User tapped Save Details button');
    
    if (!orderNumber.trim() || !bookingEmail.trim()) {
      console.log('Validation failed: missing order number or email');
      return;
    }

    try {
      const ticketDetails = {
        orderNum: orderNumber,
        email: bookingEmail,
        userNotes: notes,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ticketDetails));
      setIsSaved(true);
      console.log('Ticket details saved successfully');
    } catch (error) {
      console.error('Failed to save ticket details:', error);
    }
  };

  const confirmationMessage = 'THREAD X Ready. Keep your details handy for entry.';

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Ticket Order Number</Text>
          <TextInput
            style={styles.input}
            value={orderNumber}
            onChangeText={setOrderNumber}
            placeholder="Enter your order number"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Booking Email</Text>
          <TextInput
            style={styles.input}
            value={bookingEmail}
            onChangeText={setBookingEmail}
            placeholder="Enter your booking email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Optional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any additional notes"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Details</Text>
        </TouchableOpacity>

        {isSaved && (
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>{confirmationMessage}</Text>
          </View>
        )}
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
  section: {
    marginBottom: 24,
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Colors.primaryButton,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
  confirmationContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.accent,
    borderRadius: 8,
  },
  confirmationText: {
    fontSize: 16,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
