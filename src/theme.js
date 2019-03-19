import { StyleSheet } from 'react-native';

export const Constants = {
  gridSpacing: 10,
  teamNameHeight: 40,
  headerHeight: 130,
  teamAColor: '#f75000',
  teamBColor: '#ffe55f',
  scoreColor: '#e2ba5e',
  appBackgroundColor: '#001027',
};

export default StyleSheet.create({
  action: {
    borderRadius: 4,
    padding: 10,
    marginBottom: Constants.gridSpacing,
  },
  actionText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
  },
});
