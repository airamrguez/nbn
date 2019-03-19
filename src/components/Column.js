import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Column(props) {
  return <View style={[styles.column, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});
