import React from "react";

import { View, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "../../styles/theme";

import { styles } from "./styles";

export function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          const tabBarVisible = descriptors[route.key].options.tabBarVisible;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return tabBarVisible && (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonTab}
            >
              <View style={{ alignItems: "center", padding: 4 }}>
                <View
                  style={{
                    padding: 8,
                    borderRadius: 99,
                    backgroundColor: isFocused
                      ? THEME.COLORS.BLUE_300
                      : "transparent",
                  }}
                >
                  <MaterialIcons
                    name={options.tabBarIcon}
                    size={34}
                    color={
                      isFocused ? THEME.COLORS.WHITE : THEME.COLORS.BLUE_300
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
