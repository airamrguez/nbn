import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

export default function ActionsButtons(props) {
  return (
    <View style={[props.style, styles.container]}>
      <View>
        <Button
          title="2 points"
          onPress={() => void props.onPointsPress(2)}
          style={[{ backgroundColor: 'green' }, styles.button]}
          disabled={!props.isPlaying}
        />
        <Button
          title="3 points"
          onPress={() => void props.onPointsPress(3)}
          style={[{ backgroundColor: 'darkgreen' }, styles.button]}
          disabled={!props.isPlaying}
        />
      </View>
      <Button
        title={props.isPlaying ? 'Pause' : 'Play'}
        onPress={props.toggleCountdown}
        style={[styles.playButton, styles.button]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    padding: 20,
  },
  playButton: {
    backgroundColor: '#ddd',
    marginBottom: 0,
  },
});
