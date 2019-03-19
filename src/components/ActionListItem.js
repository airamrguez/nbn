import React from 'react';
import { StyleSheet } from 'react-native';
import Grid from './Grid';
import Column from './Column';
import StyledText from './StyledText';

export default function ActionListItem(props) {
  const {
    action: { teamName, score, points },
    color,
  } = props;
  return (
    <Grid>
      <ActionListItemColumn text={teamName} color={color} />
      <ActionListItemColumn text={score} />
      <ActionListItemColumn text={`${points} POINTS`} />
    </Grid>
  );
}

ActionListItem.defaultProps = {
  action: {},
};

function ActionListItemColumn(props) {
  return (
    <Column style={styles.column}>
      <StyledText style={[styles.text, { color: props.color }]}>
        {props.text}
      </StyledText>
    </Column>
  );
}

ActionListItemColumn.defaultProps = {
  color: '#fff',
};

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
