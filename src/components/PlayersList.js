import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import StyledText from './StyledText';
import theme, { Constants } from '../theme';

export default function PlayersList(props) {
  const { teamName, players, color, isPlaying, onPlayerPress } = props;
  const actionStyle = {
    backgroundColor: color,
  };
  const buttonStyle = [actionStyle, styles.button];
  return (
    <View>
      <View
        style={[
          theme.action,
          actionStyle,
          { height: Constants.teamNameHeight },
        ]}
      >
        <StyledText style={theme.actionText}>TEAM {teamName}</StyledText>
      </View>
      {players.map(player => (
        <Button
          key={player.id}
          title={player.number}
          onPress={() => onPlayerPress(player.id, teamName)}
          style={buttonStyle}
          underlayColor="#000"
          disabled={!isPlaying}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingBottom: 40,
  },
});
