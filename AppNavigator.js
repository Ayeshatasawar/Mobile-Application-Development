import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomCard = ({
  title,
  subtitle,
  icon,
  image,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  leftIcon,
  rightIcon,
  rightIconOnPress,
  isDarkTheme,
  children,
  elevation = true,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        elevation && styles.cardElevated,
        isDarkTheme && styles.darkCard,
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.cardContent}>
        {/* Left Icon or Image */}
        {(leftIcon || image) && (
          <View style={styles.leftSection}>
            {image ? (
              <Image source={{ uri: image }} style={styles.cardImage} />
            ) : (
              <View style={[styles.iconContainer, isDarkTheme && styles.darkIconContainer]}>
                <Icon name={leftIcon} size={24} color={isDarkTheme ? '#fff' : '#007AFF'} />
              </View>
            )}
          </View>
        )}

        {/* Main Content */}
        <View style={styles.middleSection}>
          {icon && !leftIcon && (
            <Icon name={icon} size={20} color={isDarkTheme ? '#fff' : '#666'} style={styles.inlineIcon} />
          )}
          {title && (
            <Text style={[styles.title, isDarkTheme && styles.darkText, titleStyle]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, isDarkTheme && styles.darkSubText, subtitleStyle]}>
              {subtitle}
            </Text>
          )}
          {children}
        </View>

        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity onPress={rightIconOnPress} style={styles.rightSection}>
            <Icon name={rightIcon} size={24} color={isDarkTheme ? '#888' : '#999'} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  cardElevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
  },
  leftSection: {
    marginRight: 15,
    justifyContent: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkIconContainer: {
    backgroundColor: '#2c2c2c',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  inlineIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  darkText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  darkSubText: {
    color: '#aaa',
  },
  rightSection: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default CustomCard;