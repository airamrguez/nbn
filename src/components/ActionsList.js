import React, { Fragment } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ActionListItem from './ActionListItem';
import { isNil } from '../utils';

export default function ActionsList(props) {
  const { actions, match } = props;
  return (
    <Fragment>
      <View style={styles.gap} />
      <FlatList
        data={normalize(actions, match)}
        renderItem={({ item }) => <ActionListItem action={item} />}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </Fragment>
  );
}

function normalize(actions, match) {
  if (!Array.isArray(actions) || isNil(match)) {
    return [];
  }
  // During a match we can have a big amount of
  // actions. A map is used to create an index to
  // do faster lookups.
  const playersMap = new Map();
  const teams = Object.keys(match);
  teams.forEach((teamName, teamIndex) => {
    match[teamName].players.forEach(player => {
      playersMap.set(player.id, teamIndex);
    });
  });

  const scores = [0, 0];
  return (
    actions
      // All the actions in this example are going to be
      // of type POINTS.
      .filter(action => action.type === 'POINTS')
      .reverse()
      .map(action => {
        const teamIndex = playersMap.get(action.playerId);
        scores[teamIndex] += action.value;
        const [teamAScore, teamBScore] = scores;
        return {
          id: action.id,
          teamName: teams[teamIndex] === 'teamA' ? 'A' : 'B',
          score: `${teamAScore}-${teamBScore}`,
          points: action.value,
        };
      })
      .reverse()
  );
}

function keyExtractor(item) {
  return String(item.id);
}

const styles = StyleSheet.create({
  gap: {
    backgroundColor: '#fff',
    height: 40,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  list: {
    marginTop: -4,
    borderWidth: 4,
    borderColor: '#fff',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
