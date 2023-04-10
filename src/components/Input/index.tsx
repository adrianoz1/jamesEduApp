import React from 'react';
import { TextInput, View } from 'react-native';

import { placeholderColor, styles } from './styles';

type Props = {
  value: string;
  placeholder: string;
  style?: object;
  onChangeText: (text: string) => void;
}

export const Input = (props: Props) => {
  return (
    <View>
      <TextInput
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        value={props.value}
        placeholderTextColor={placeholderColor}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};
