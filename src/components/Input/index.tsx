import React from "react";
import { TextInput, View, TextInputProps } from "react-native";

import { placeholderColor, placeholderErrorColor, styles } from "./styles";

type Props = TextInputProps & {
  value: string;
  placeholder: string;
  style?: object;
  errorMessage?: string | null;
  isInvalid?: boolean;
  onChangeText: (text: string) => void;
};

export const Input = ({
  value,
  placeholder,
  style,
  onChangeText,
  errorMessage = null,
  isInvalid,
  ...rest
}: Props) => {
  return (
    <View>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
        placeholderTextColor={errorMessage ? placeholderErrorColor : placeholderColor}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};
