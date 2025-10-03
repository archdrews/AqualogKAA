import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export function GradientButton({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  disabled = false
}: GradientButtonProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'danger':
        return ['#C62828', '#8E0000'];
      case 'secondary':
        return ['#C0C0C0', '#9E9E9E'];
      default:
        return ['#009688', '#40E0D0'];
    }
  };

  const getButtonHeight = () => {
    switch (size) {
      case 'small': return 40;
      case 'large': return 60;
      default: return 50;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style, disabled && styles.disabled]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height: getButtonHeight() }]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    shadowColor: '#40E0D0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});