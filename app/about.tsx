
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { EVENT_INFO } from '@/constants/EventInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const handleOpenWebsite = async () => {
    console.log('User tapped Visit Our Website button');
    try {
      const supported = await Linking.canOpenURL(EVENT_INFO.website);
      if (supported) {
        await Linking.openURL(EVENT_INFO.website);
      } else {
        console.error('Cannot open URL:', EVENT_INFO.website);
      }
    } catch (error) {
      console.error('Error opening website:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Event</Text>
          <Text style={styles.bodyText}>{EVENT_INFO.aboutText}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{EVENT_INFO.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{EVENT_INFO.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{EVENT_INFO.location}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.websiteButton}
          onPress={handleOpenWebsite}
        >
          <Text style={styles.websiteButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    lineHeight: 24,
  },
  detailRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    lineHeight: 22,
  },
  websiteButton: {
    backgroundColor: Colors.primaryButton,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  websiteButtonText: {
    fontSize: 18,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
});
