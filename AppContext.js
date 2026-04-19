import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomButton = ({
  title,
  onPress,
  type = 'primary', // primary, secondary, outline, danger, success
  size = 'medium', // small, medium, large
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
  isDarkTheme,
}) => {
  const getButtonStyles = () => {
    const buttonStyles = [styles.button, styles[size]];
    
    if (disabled || loading) {
      buttonStyles.push(styles.disabled);
    } else {
      switch (type) {
        case 'primary':
          buttonStyles.push(styles.primary);
          break;
        case 'secondary':
          buttonStyles.push(styles.secondary);
          break;
        case 'outline':
          buttonStyles.push(styles.outline);
          break;
        case 'danger':
          buttonStyles.push(styles.danger);
          break;
        case 'success':
          buttonStyles.push(styles.success);
          break;
        default:
          buttonStyles.push(styles.primary);
      }
    }
    
    if (isDarkTheme && type !== 'outline') {
      buttonStyles.push(styles.darkButton);
    }
    
    return buttonStyles;
  };

  const getTextStyles = () => {
    const textStyles = [styles.text, styles[`${size}Text`]];
    
    if (type === 'outline') {
      textStyles.push(styles.outlineText);
      if (isDarkTheme) {
        textStyles.push(styles.darkOutlineText);
      }
    } else if (disabled || loading) {
      textStyles.push(styles.disabledText);
    } else {
      textStyles.push(styles.primaryText);
    }
    
    return textStyles;
  };

  const getIconColor = () => {
    if (disabled || loading) return '#fff';
    if (type === 'outline') return isDarkTheme ? '#0A84FF' : '#007AFF';
    return '#fff';
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? (isDarkTheme ? '#0A84FF' : '#007AFF') : '#fff'} size="small" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && iconPosition === 'left' && (
            <Icon name={icon} size={20} color={getIconColor()} style={styles.leftIcon} />
          )}
          <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Icon name={icon} size={20} color={getIconColor()} style={styles.rightIcon} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  disabled: {
    opacity: 0.6,
  },
  darkButton: {
    opacity: 0.9,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#007AFF',
  },
  disabledText: {
    color: '#fff',
  },
  darkOutlineText: {
    color: '#0A84FF',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;