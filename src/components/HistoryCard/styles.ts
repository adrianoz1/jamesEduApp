import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.BLUE_700,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: 16,
  },
  subtitle: {
    color: THEME.COLORS.BLUE_300,
    fontSize: 12
  }
});
