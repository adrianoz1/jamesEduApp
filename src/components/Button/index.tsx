import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: "default" | "outline";
  isLoading?: boolean;
};

export function Button({ title, variant, isLoading, ...rest }: Props) {
  return (
    <TouchableOpacity disabled={!!isLoading}
      style={variant === "outline" ? styles.containerOutline : styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {isLoading ? "..." : title}
      </Text>
    </TouchableOpacity>
  );
}
