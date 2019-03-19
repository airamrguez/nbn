/**
 * @format
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import LoginView from './components/LoginView';
import MatchProvider from './components/MatchProvider';
import Match from './components/Match';
import { Constants } from './theme';

export default function App() {
  const [isModalVisible, setModalVisible] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const onLoggedIn = React.useCallback(user => {
    setUser(user);
    setModalVisible(false);
  });

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <LoginView onLoggedIn={onLoggedIn} />
      </Modal>
      <MatchProvider>
        {({ match, isLoading, error }) => {
          if (isLoading || match === null) {
            return (
              <View>
                <Text>Loading ...</Text>
              </View>
            );
          }
          if (error !== null) {
            // Here we should show more information about the error.
            return (
              <View>
                <Text>Error. An error ocurred</Text>
              </View>
            );
          }
          return <Match user={user} match={match} />;
        }}
      </MatchProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Constants.appBackgroundColor,
  },
});
