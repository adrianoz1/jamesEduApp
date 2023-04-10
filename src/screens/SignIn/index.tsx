import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { Input } from "../../components/Input";

import { styles } from "./styles";
import { Button } from "../../components/Button";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.signIn}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Login</Text>
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Button
        title="Entrar"
        onPress={() => navigate('home')}
        />
      </ScrollView>
    </View>
  );
};
