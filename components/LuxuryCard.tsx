import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LuxuryCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'dark' | 'light' | 'gradient';
}

export function LuxuryCard({ children, style, variant = 'dark' }: LuxuryCardProps) {
  const getCardContent = () => {
    if (variant === 'gradient') {
      return (
        <LinearGradient
          colors={['#009688', '#40E0D0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientCard, style]}
        >
          {children}
        </LinearGradient>
      );
    }
    
    return (
      <View style={[
        styles.card,
        variant === 'light' ? styles.lightCard : styles.darkCard,
        style
      ]}>
        {children}
      </View>
    );
  };

  return getCardContent();
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  darkCard: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  lightCard: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  gradientCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#40E0D0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});