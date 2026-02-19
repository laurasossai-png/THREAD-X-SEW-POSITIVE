
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { EVENT_INFO } from '@/constants/EventInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    console.log('User tapped navigation button:', route);
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/16cb3e94-f2ae-4640-a4f2-1bfc1effe40e.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{EVENT_INFO.name}</Text>
        </View>

        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>{EVENT_INFO.tagline}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handleNavigate('/about')}
          >
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handleNavigate('/ticket')}
          >
            <Text style={styles.buttonText}>My Ticket</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => handleNavigate('/swap-bag')}
          >
            <Text style={styles.buttonText}>My Swap Bag</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.accentButton]}
            onPress={() => handleNavigate('/game')}
          >
            <Text style={styles.buttonText}>Play the Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handleNavigate('/checklist')}
          >
            <Text style={styles.buttonText}>Checklist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => handleNavigate('/follow')}
          >
            <Text style={styles.buttonText}>Follow the Movement</Text>
          </TouchableOpacity>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 280,
    height: 280,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Fraunces_700Bold',
    color: Colors.primaryText,
    textAlign: 'center',
    letterSpacing: 1,
  },
  taglineContainer: {
    marginBottom: 32,
  },
  tagline: {
    fontSize: 20,
    fontFamily: 'Fraunces_400Regular',
    color: Colors.primaryText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primaryButton,
  },
  secondaryButton: {
    backgroundColor: Colors.secondaryButton,
  },
  accentButton: {
    backgroundColor: Colors.accent,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Fraunces_700Bold',
    color: '#FFFFFF',
  },
});
