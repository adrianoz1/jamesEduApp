import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useToast } from "../../context/ToastContext";

type ToastProps = {
  message: string;
};
import { styles } from "./styles";

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const { showToast } = useToast();

  return (
    <TouchableOpacity style={styles.container} onPress={() => showToast("")}>
      <View style={styles.toastView}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};
