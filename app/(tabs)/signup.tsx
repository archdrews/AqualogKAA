import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { LuxuryCard } from '@/components/LuxuryCard';
import { Droplets } from 'lucide-react-native';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <LinearGradient
      colors={['#0B1E2D', '#121212']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Droplets size={32} color="#40E0D0" />
            <Text style={styles.logo}>AQUALOG</Text>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the hydration revolution</Text>
        </View>

        {/* Form */}
        <LuxuryCard style={styles.formCard}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#B0BEC5"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a secure password"
                placeholderTextColor="#B0BEC5"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#B0BEC5"
                secureTextEntry
              />
            </View>

            <GradientButton
              title="Sign Up"
              onPress={() => console.log('Sign Up')}
              size="large"
              style={styles.signUpButton}
            />

            <View style={styles.loginLink}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text style={styles.loginLinkText}>Sign In</Text>
            </View>
          </View>
        </LuxuryCard>

        {/* Features */}
        <View style={styles.features}>
          <LuxuryCard variant="gradient" style={styles.featureCard}>
            <Text style={styles.featureTitle}>🌊 Beautiful Visualizations</Text>
            <Text style={styles.featureText}>Track your progress with our stunning crystal ball interface</Text>
          </LuxuryCard>

          <LuxuryCard variant="gradient" style={styles.featureCard}>
            <Text style={styles.featureTitle}>📊 Smart Analytics</Text>
            <Text style={styles.featureText}>Gain insights into your hydration patterns and trends</Text>
          </LuxuryCard>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    color: '#40E0D0',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 10,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#C0C0C0',
    fontSize: 16,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(245,245,245,0.1)',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 12,
    padding: 16,
    color: '#F5F5F5',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 10,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#C0C0C0',
    fontSize: 14,
  },
  loginLinkText: {
    color: '#40E0D0',
    fontSize: 14,
    fontWeight: '600',
  },
  features: {
    gap: 15,
  },
  featureCard: {
    marginBottom: 10,
  },
  featureTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureText: {
    color: 'rgba(245,245,245,0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
});