import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const placeholderColor = THEME.COLORS.WHITE;

export const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    backgroundColor: THEME.COLORS.BLUE_700,
    borderRadius: 6,
    padding: 16,
    color: THEME.COLORS.WHITE,
    borderColor: THEME.COLORS.BLUE_500,
    borderWidth: 2,
  },
});
