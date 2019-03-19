import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';

function Button(props) {
  const { title, ...buttonProps } = props;
  return (
    <TouchableOpacity {...buttonProps} style={[theme.action, props.style]}>
      <StyledText style={[theme.actionText, styles.title]}>{title}</StyledText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
});

export default Button;
