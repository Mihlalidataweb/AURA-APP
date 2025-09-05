import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CyberpunkTheme } from '@/constants/theme';

interface CyberpunkButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return CyberpunkTheme.colors.gradients.cyan;
      case 'secondary':
        return CyberpunkTheme.colors.gradients.magenta;
      case 'accent':
        return CyberpunkTheme.colors.gradients.green;
      case 'danger':
        return ['#330000', '#660000', '#990000'];
      default:
        return CyberpunkTheme.colors.gradients.cyan;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'primary':
        return CyberpunkTheme.colors.primary;
      case 'secondary':
        return CyberpunkTheme.colors.secondary;
      case 'accent':
        return CyberpunkTheme.colors.accent;
      case 'danger':
        return '#ff0000';
      default:
        return CyberpunkTheme.colors.primary;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 12,
        };
      case 'large':
        return {
          paddingHorizontal: 24,
          paddingVertical: 16,
          fontSize: 18,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 14,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: getBorderColor(),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={[
          styles.gradient,
          {
            paddingHorizontal: sizeStyles.paddingHorizontal,
            paddingVertical: sizeStyles.paddingVertical,
          },
        ]}
      >
        {icon && <>{icon}</>}
        <Text
          style={[
            styles.text,
            {
              fontSize: sizeStyles.fontSize,
              marginLeft: icon ? 8 : 0,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: CyberpunkTheme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: CyberpunkTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: CyberpunkTheme.colors.text,
    fontWeight: 'bold' as const,
    fontFamily: Platform.OS === 'ios' ? CyberpunkTheme.fonts.mono : 'monospace',
    textAlign: 'center',
  },
});
