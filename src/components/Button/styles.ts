import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    marginBottom: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BRAND_MID,
  },
  containerOutline: {
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    marginBottom: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: THEME.COLORS.BRAND_MID,
    borderWidth: 1,
  },
  title: {
    color: THEME.COLORS.WHITE,
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  }
});
