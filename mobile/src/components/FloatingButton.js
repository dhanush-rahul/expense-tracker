import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const FloatingButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear token and navigate to login
    // You can replace AsyncStorage with whatever storage solution you're using in React Native
    // Example: AsyncStorage.removeItem('token') if you're using async storage for the token
    AsyncStorage.removeItem('token')
    navigation.navigate('Login'); // Replace with your actual 'Login' route name
  };

  return (
    <View style={styles.container}>
      {/* Floating Button */}
      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.floatingButton}
      >
        <Icon name="ellipsis-v" size={24} color="white" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
            <Icon name="sign-out" size={20} color="gray" />
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 50,
  },
  floatingButton: {
    backgroundColor: 'purple',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8, // Adds shadow on Android
  },
  dropdownMenu: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 8, // Adds shadow on Android
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
});

export default FloatingButton;
