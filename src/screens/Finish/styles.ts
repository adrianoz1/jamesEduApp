import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BLUE_800,
    padding: 32
  },
  message: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.BOLD,
    fontSize: 24,
    marginTop: 41
  },
  subtitle: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: 16,
    marginTop: 8
  },
});
