import React from 'react';
import { View, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import LoginInput from './LoginInput';
import { login } from '../api';
import { isNil, isEmpty } from '../utils';
import StyledText from './StyledText';

export default function LoginForm(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = React.useCallback(() => {
    const user = { username, password };
    const error = validateLogin(user);
    if (!isNil(error)) {
      showLoginError(error);
      return;
    }
    login(user).then(props.onLoggedIn, e =>
      showLoginError(
        'Could not log in. Try user: nbn and pass: nbn. ' + e.toString(),
      ),
    );
  });

  return (
    <View style={styles.container}>
      <LoginInput
        autoComplete="username"
        label="Username"
        value={username}
        onChange={setUsername}
        style={styles.formItem}
        secureTextEntry={false}
      />
      <LoginInput
        autoComplete="password"
        label="Password"
        value={password}
        onChange={setPassword}
        style={styles.formItem}
        secureTextEntry={true}
      />
      <TouchableHighlight style={styles.button} onPress={signIn}>
        <StyledText style={styles.buttonText}>Sign in</StyledText>
      </TouchableHighlight>
    </View>
  );
}

function validateLogin(user) {
  if (isEmpty(user.username)) {
    return 'Username cannot be empty';
  }
  if (isEmpty(user.password)) {
    return 'Password cannot be empty';
  }
  return null;
}

function showLoginError(error) {
  Alert.alert(
    'Unauthorized',
    error,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false },
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: 500,
  },
  button: {
    borderRadius: 4,
    maxWidth: 300,
    padding: 20,
    margin: 16,
    backgroundColor: '#0b6074',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  formItem: {
    marginBottom: 8,
  },
});
