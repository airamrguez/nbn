import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Grid(props) {
  return <View style={[props.style, styles.grid]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
  },
});
