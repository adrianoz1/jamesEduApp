import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../components/Input";

import { styles } from "./styles";
import { Button } from "../../components/Button";
import { Controller, useForm } from "react-hook-form";

import { useAuth } from "../../hooks/useAuth";
import { AppError } from "../../utils/AppError";
import { useToast } from "../../context/ToastContext";

type FormDataProps = {
  email: string;
  password: string;
};

const signUpSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const { showToast } = useToast();

  const { navigate } = useNavigation();

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível logar. Tente novamente mais tarde.";

      setIsLoading(false);

      showToast(title);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.signIn}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Login</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              placeholder="Seu E-mail"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              style={styles.input}
              placeholder="Senha"
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Button title="Entrar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        <Button
          variant="outline"
          title="Cadastrar"
          onPress={() => navigate("signUp")}
        />
      </ScrollView>
    </View>
  );
};
