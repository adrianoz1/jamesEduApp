import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Quiz } from "../screens/Quiz";
import { Finish } from "../screens/Finish";
import { THEME } from "../styles/theme";

import { CustomTabBar } from "../components/CustomTab";

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "quiz") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="homeScreen" component={Home} />
      <HomeStack.Screen name="quiz" component={Quiz} />
      <HomeStack.Screen name="finish" component={Finish} />
    </HomeStack.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: THEME.COLORS.BLUE_300,

        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: "home",
        }}
      />
    </Tab.Navigator>
  );
}
