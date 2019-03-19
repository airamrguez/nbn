import React from 'react';
import { Text, Platform } from 'react-native';

export default function StyledText(props) {
  const { style, ...rest } = props;
  return (
    <Text
      style={[
        style,
        { fontFamily: Platform.OS === 'ios' ? 'verdana' : 'sans-serif' },
      ]}
      {...rest}
    />
  );
}
