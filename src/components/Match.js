import React, { useEffect, useRef, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import ActionsList from './ActionsList';
import Scores from './Scores';
import PlayersGrid from './PlayersGrid';
import ActionsButtons from './ActionsButtons';
import useCountdown from './useCountdown';
import { isNil, isEmpty } from '../utils';
import { saveActions } from '../api';
import { Constants } from '../theme';

const PERIOD_SECS = 10 * 60;
const BATCH_PERIOD_MS = 10 * 1000;
const EMPTY_ACTION = Object.freeze({
  value: null,
  playerId: null,
  teamName: null,
});

export default function Match(props) {
  const { match } = props;
  const [periodTime, isPlaying, toggleCountdown] = useCountdown(PERIOD_SECS);
  const [actions, setActions] = useState([]);
  const [[teamAScore, teamBScore], setScores] = useState([0, 0]);
  const action = useRef({ ...EMPTY_ACTION });
  const pendingActions = useRef([]);
  const actionTimer = useRef(null);

  useEffect(() => {
    sendBatchedActions();
    return () => {
      if (!isNil(actionTimer.current)) {
        BackgroundTimer.clearInterval(actionTimer.current);
      }
    };
  }, []);

  function sendBatchedActions() {
    actionTimer.current = BackgroundTimer.setInterval(() => {
      if (!isEmpty(pendingActions.current)) {
        saveActions(pendingActions.current).then(
          () => {
            pendingActions.current = [];
          },
          error => {
            // Here we could adapt the BATCH_PERIOD_MS to implement
            // an exponential backoff to retry for example when the server is down
            // or to subscribe to network changes to resend the data if the
            // device is offline.
            Alert.alert(
              'Error',
              'Could not send actions to the server. Will try again later.' +
                error,
            );
          },
        );
      }
    }, BATCH_PERIOD_MS);
  }

  function batchAction() {
    const { value, playerId, teamName } = action.current;
    if (!isNil(value) && !isNil(playerId)) {
      const newAction = {
        id: Date.now(),
        playerId,
        type: 'POINTS',
        value,
      };
      pendingActions.current.push(newAction);
      action.current = { ...EMPTY_ACTION };
      setActions(prevActions => [newAction, ...prevActions]);
      setScores(([teamAScore, teamBScore]) => {
        if (teamName === 'A') {
          return [teamAScore + value, teamBScore];
        }
        return [teamAScore, teamBScore + value];
      });
    }
  }

  const onPointsPress = points => {
    action.current.value = points;
    batchAction();
  };

  const onPlayerPress = (playerId, teamName) => {
    action.current.playerId = playerId;
    action.current.teamName = teamName;
    batchAction();
  };

  return (
    <View style={styles.container}>
      <PlayersGrid
        match={match}
        isPlaying={isPlaying}
        onPlayerPress={onPlayerPress}
        style={styles.left}
      />
      <View style={styles.center}>
        <Scores
          match={match}
          teamAScore={teamAScore}
          teamBScore={teamBScore}
          periodTime={periodTime}
          style={styles.scores}
        />
        <ActionsList actions={actions} match={match} />
      </View>
      <ActionsButtons
        isPlaying={isPlaying}
        onPointsPress={onPointsPress}
        toggleCountdown={toggleCountdown}
        style={styles.right}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    maxWidth: 300,
    padding: 8,
    marginTop: Constants.headerHeight - Constants.teamNameHeight,
  },
  center: {
    flexGrow: 2,
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
  },
  right: {
    maxWidth: 300,
    padding: 8,
    marginTop: 8 + Constants.headerHeight,
  },
  scores: {
    height: Constants.headerHeight,
    marginBottom: 8,
  },
});
