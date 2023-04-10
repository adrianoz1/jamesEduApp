import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 21,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 40,
  },
  title: {
    fontFamily: THEME.FONTS.BOLD,
    color: THEME.COLORS.WHITE,
    fontSize: 16,
  },
  question: {
    color: '#C4C4CC'
  },
  length: {
    color: '#C4C4CC'
  },
});
