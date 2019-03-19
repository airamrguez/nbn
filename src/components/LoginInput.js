import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function LoginInput(props) {
  const { label, style, autoComplete, secureTextEntry } = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoComplete={autoComplete}
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChange}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

LoginInput.defaultProps = {
  autoComplete: 'off',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: 8,
    minWidth: 100,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    height: 38,
  },
});
