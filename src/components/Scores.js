import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Grid from './Grid';
import Column from './Column';
import StyledText from './StyledText';
import { Constants } from '../theme';
import { formatTime } from '../utils';

export default function Scores(props) {
  const {
    teamAScore,
    teamBScore,
    periodTime,
    match: {
      teamA: { name: teamAName },
      teamB: { name: teamBName },
    },
  } = props;
  return (
    <Grid style={[props.style, styles.container]}>
      <Column style={styles.column}>
        {renderCountryName(teamAName)}
        <Score value={teamAScore} color={Constants.scoreColor} />
      </Column>
      <VerticalSeparator />
      <Column style={styles.column}>
        {renderPeriodName('Period 1')}
        <Score value={formatTime(periodTime)} />
      </Column>
      <VerticalSeparator />
      <Column style={styles.column}>
        {renderCountryName(teamBName)}
        <Score value={teamBScore} color={Constants.scoreColor} />
      </Column>
    </Grid>
  );
}

function Score(props) {
  const { color, value } = props;
  return <StyledText style={[styles.score, { color }]}>{value}</StyledText>;
}

Score.defaultProps = {
  color: '#fff',
};

function VerticalSeparator(props) {
  return <View style={styles.vSep} />;
}

function renderCountryName(name) {
  return (
    <StyledText style={[styles.title, styles.countryName]}>{name}</StyledText>
  );
}

function renderPeriodName(name) {
  return <StyledText style={[styles.title]}>{name}</StyledText>;
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 4,
    flexDirection: 'column',
    padding: 10,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  countryName: {
    textTransform: 'uppercase',
  },
  score: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  vSep: {
    marginTop: 10,
    marginBottom: 10,
    width: 4,
    backgroundColor: '#fff',
  },
});
