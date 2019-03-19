import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Grid from './Grid';
import Column from './Column';
import PlayersList from './PlayersList';
import { Constants } from '../theme';

export default function PlayersGrid(props) {
  const { match, onPlayerPress, isPlaying } = props;
  return (
    <Grid style={[props.style, styles.grid]}>
      <Column style={[styles.column, { marginRight: Constants.gridSpacing }]}>
        <PlayersList
          teamName="A"
          onPlayerPress={onPlayerPress}
          color={Constants.teamAColor}
          players={match.teamA.players}
          isPlaying={isPlaying}
        />
      </Column>
      <Column style={styles.column}>
        <PlayersList
          teamName="B"
          onPlayerPress={onPlayerPress}
          color={Constants.teamBColor}
          players={match.teamB.players}
          isPlaying={isPlaying}
        />
      </Column>
    </Grid>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    justifyContent: 'center',
  },
  column: {
    minWidth: 80,
    maxWidth: 200,
  },
});
