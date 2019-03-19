import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import { Constants } from '../theme';

export default function LoginView(props) {
  return (
    <View style={styles.container}>
      <LoginForm onLoggedIn={props.onLoggedIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.appBackgroundColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
