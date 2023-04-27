import "react-native-reanimated";
import "react-native-gesture-handler";

import * as React from "react";

import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
import { ToastProvider } from "./src/context/ToastContext";
import { AuthContextProvider } from "./src/context/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <ToastProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Routes />
        </ToastProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
