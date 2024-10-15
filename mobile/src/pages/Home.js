import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const loginClicked = (e) => {
    navigation.navigate('Login');
  };

  const signUpClicked = (e) => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Less stress tracking your expenses</Text>
        <Text style={styles.subtitle}>
          With Expense-Tracker, easily track balances, organize expenses, and check your monthly spends.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={loginClicked}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={signUpClicked}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Track Balance Section */}
      <Section bgColor={styles.trackBalanceBg} text="Track balance" imageSrc={require('../../assets/track_balance.png')} />

      {/* Organize Expenses Section */}
      <Section bgColor={styles.organizeExpensesBg} text="Organize expenses" imageSrc={require('../../assets/expenses.png')} />

      {/* Add Expenses Section */}
      <Section bgColor={styles.addExpensesBg} text="Add expenses easily" imageSrc={require('../../assets/add_expense.png')} />

      {/* Check Your Monthly Spends Section */}
      <Section bgColor={styles.monthlySpendsBg} text="Check your monthly spends" imageSrc={require('../../assets/compare.png')} />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Expense-Tracker</Text>
      </View>
    </View>
  );
};

// Reusable Section Component
const Section = ({ bgColor, text, imageSrc }) => (
  <View style={[styles.section, bgColor]}>
    <View style={styles.sectionContent}>
      <Text style={styles.sectionText}>{text}</Text>
      {imageSrc && <Image source={imageSrc} style={styles.sectionImage} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerSection: {
    backgroundColor: '#f7fafc',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#4299e1',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginRight: 10,
  },
  signUpButton: {
    backgroundColor: '#48bb78',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  sectionContent: {
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  sectionImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  trackBalanceBg: {
    backgroundColor: '#2d3748',
  },
  organizeExpensesBg: {
    backgroundColor: '#319795',
  },
  addExpensesBg: {
    backgroundColor: '#ed8936',
  },
  monthlySpendsBg: {
    backgroundColor: '#6b46c1',
  },
  footer: {
    backgroundColor: '#f7fafc',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#2d3748',
    fontSize: 16,
  },
});

export default Home;
