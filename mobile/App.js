import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens (equivalent to your 'pages' in web)
// import Login from './pages/Login';
// import Register from './src/pages/Register';
// import Dashboard from './pages/Dashboard';
import Home from './src/pages/Home';
// import ForgotPassword from './pages/ForgotPassword';
import Toast from 'react-native-toast-message';
import Login from './src/pages/Login';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Register" component={Register} /> */}
        {/* <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
    
  );
};


export default App;
