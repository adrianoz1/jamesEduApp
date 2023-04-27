import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  content: {
    marginBottom: Platform.OS === "ios" ? 38 : 24,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
    borderRadius: 99,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
  },
  buttonTab: {
    justifyContent: "center",
    alignItems: "center",
  },
});
