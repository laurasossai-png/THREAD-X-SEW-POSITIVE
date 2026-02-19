
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { EVENT_INFO } from '@/constants/EventInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GameScreen() {
  const handlePlayGame = async () => {
    console.log('User tapped Play the Game button');
    try {
      const supported = await Linking.canOpenURL(EVENT_INFO.gameLink);
      if (supported) {
        await Linking.openURL(EVENT_INFO.gameLink);
      } else {
        console.error('Cannot open game URL:', EVENT_INFO.gameLink);
      }
    } catch (error) {
      console.error('Error opening game:', error);
    }
  };

  const gameTitle = 'Escape the Fast Fashion Curse';
  const gameDescription = 'Explore the impact of fast fashion before the event.';

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{gameTitle}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{gameDescription}</Text>
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayGame}
        >
          <Text style={styles.playButtonText}>Play the Game</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This interactive game will open in your browser. Learn about sustainable fashion and the impact of fast fashion on our planet.
          </Text>
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
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    textAlign: 'center',
    lineHeight: 40,
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  description: {
    fontSize: 18,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    textAlign: 'center',
    lineHeight: 26,
  },
  playButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  playButtonText: {
    fontSize: 20,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#222222',
    borderWidth: 2,
    borderColor: Colors.primaryButton,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
});
