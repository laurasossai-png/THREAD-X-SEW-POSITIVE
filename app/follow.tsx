
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { EVENT_INFO } from '@/constants/EventInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FollowScreen() {
  const handleOpenLink = async (url: string, label: string) => {
    console.log('User tapped link:', label);
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Cannot open URL:', url);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const finalMessage = 'Make It. Swap It. Wear It.';

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Join the Community</Text>
          <Text style={styles.description}>
            Stay connected with THREAD X SEW POSITIVE and be part of the sustainable fashion movement.
          </Text>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={[styles.linkButton, styles.websiteButton]}
            onPress={() => handleOpenLink(EVENT_INFO.website, 'Website')}
          >
            <Text style={styles.linkButtonText}>Visit Our Website</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, styles.instagramButton]}
            onPress={() => handleOpenLink(EVENT_INFO.instagram, 'Instagram')}
          >
            <Text style={styles.linkButtonText}>Follow on Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, styles.tiktokButton]}
            onPress={() => handleOpenLink(EVENT_INFO.tiktok, 'TikTok')}
          >
            <Text style={styles.linkButtonText}>Follow on TikTok</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.finalMessageContainer}>
          <Text style={styles.finalMessage}>{finalMessage}</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
  linksContainer: {
    gap: 16,
    marginBottom: 40,
  },
  linkButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  websiteButton: {
    backgroundColor: Colors.primaryButton,
  },
  instagramButton: {
    backgroundColor: Colors.secondaryButton,
  },
  tiktokButton: {
    backgroundColor: Colors.accent,
  },
  linkButtonText: {
    fontSize: 18,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
  finalMessageContainer: {
    padding: 24,
    backgroundColor: '#222222',
    borderWidth: 3,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
  },
  finalMessage: {
    fontSize: 24,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
