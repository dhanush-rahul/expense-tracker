import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginBox = ({ loginData, setLoginData, handleLogin }) => {
  const { email, password } = loginData;

  const handleChange = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Log in</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => handleChange('email', value)}
          placeholder="Email address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(value) => handleChange('password', value)}
          placeholder="Password"
        />
      </View>

      <Button title="Log in" onPress={handleLogin} color="#38a169" />

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => alert('Forgot Password')}>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Register')}>
          <Text style={styles.link}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  linkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#38a169',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default LoginBox;
