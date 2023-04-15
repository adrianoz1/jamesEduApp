import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BLUE_800,
    justifyContent: 'center',
    paddingTop: 100
  },
  signIn: {
    padding: 32,
  },
  title: {
    color: THEME.COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
  }
});
