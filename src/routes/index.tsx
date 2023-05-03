import React from "react";

import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { THEME } from "../styles/theme";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type AppRoutes = {
  home: undefined;
  signUp: undefined;
  signIn: undefined;
  quiz: { id: string };
  history: undefined;
  finish: { total: string; points: string };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: THEME.COLORS.BLUE_800 }}>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
