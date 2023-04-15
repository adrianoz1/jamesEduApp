import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  toastView: {
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
  },
});
