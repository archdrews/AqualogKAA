import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { LuxuryCard } from '@/components/LuxuryCard';
import { Droplets, Eye, EyeOff } from 'lucide-react-native';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const ForgotPasswordFlow = () => (
    <LuxuryCard style={styles.forgotCard}>
      <Text style={styles.forgotTitle}>Reset Your Password</Text>
      <View style={styles.forgotSteps}>
        <Text style={styles.forgotStep}>1. Enter your email address</Text>
        <Text style={styles.forgotStep}>2. Check your email for reset link</Text>
        <Text style={styles.forgotStep}>3. Create a new password</Text>
        <Text style={styles.forgotStep}>4. Sign in with new password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#B0BEC5"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <GradientButton
        title="Send Reset Link"
        onPress={() => setShowForgotPassword(false)}
        style={styles.resetButton}
      />
      <TouchableOpacity onPress={() => setShowForgotPassword(false)}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </LuxuryCard>
  );

  return (
    <LinearGradient
      colors={['#0B1E2D', '#121212']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Droplets size={40} color="#40E0D0" />
            <Text style={styles.logo}>AQUALOG</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your hydration journey</Text>
        </View>

        {showForgotPassword ? (
          <ForgotPasswordFlow />
        ) : (
          <>
            {/* Login Form */}
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
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#B0BEC5"
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      {showPassword ? 
                        <EyeOff size={20} color="#C0C0C0" /> : 
                        <Eye size={20} color="#C0C0C0" />
                      }
                    </TouchableOpacity>
                  </View>
                </View>

                <GradientButton
                  title="Sign In"
                  onPress={() => console.log('Sign In')}
                  size="large"
                  style={styles.signInButton}
                />

                <View style={styles.links}>
                  <TouchableOpacity onPress={() => setShowForgotPassword(true)}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.signUpLink}>
                    <Text style={styles.signUpText}>New user? </Text>
                    <TouchableOpacity>
                      <Text style={styles.linkText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LuxuryCard>

            {/* Welcome Back Message */}
            <LuxuryCard variant="gradient" style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>🏆 Your Progress Awaits</Text>
              <Text style={styles.welcomeText}>
                Continue building healthy hydration habits with personalized insights and beautiful visualizations
              </Text>
            </LuxuryCard>
          </>
        )}
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
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 10,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 32,
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: 'rgba(245,245,245,0.1)',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 12,
    padding: 16,
    paddingRight: 50,
    color: '#F5F5F5',
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
  signInButton: {
    marginTop: 10,
  },
  links: {
    gap: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#40E0D0',
    fontSize: 14,
    fontWeight: '600',
  },
  signUpLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpText: {
    color: '#C0C0C0',
    fontSize: 14,
  },
  welcomeCard: {
    marginBottom: 20,
  },
  welcomeTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  welcomeText: {
    color: 'rgba(245,245,245,0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  forgotCard: {
    marginBottom: 20,
  },
  forgotTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  forgotSteps: {
    marginBottom: 25,
    gap: 8,
  },
  forgotStep: {
    color: '#C0C0C0',
    fontSize: 14,
    lineHeight: 20,
  },
  resetButton: {
    marginTop: 20,
    marginBottom: 15,
  },
  backToLogin: {
    color: '#40E0D0',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});