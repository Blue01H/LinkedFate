import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Welcome from './src/pages/welcome';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Dashboard from './src/pages/Dashboard'

export default function App() {
  return (
    <Dashboard></Dashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
