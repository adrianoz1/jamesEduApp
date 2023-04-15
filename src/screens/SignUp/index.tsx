import React from "react";
import { View, Text, ScrollView } from "react-native";

import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";

import { Input } from "../../components/Input";

import { styles } from "./styles";
import { Button } from "../../components/Button";
import { useToast } from "../../context/ToastContext";
import { AppError } from "../../utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  passwordConfirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
});

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const { showToast } = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      await api.post("/users", { name, email, password });

      showToast("Cadastro realizado com sucesso!");
      navigation.navigate("signIn");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar conta. Tente novamente mais tarde.";

      showToast(title);
    }
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.signIn}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Cadastrar</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              autoCapitalize="words"
              style={styles.input}
              placeholder="Seu nome"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

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

        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, value } }) => (
            <Input
              style={styles.input}
              placeholder="Confirmar Senha"
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleSignUp)}
              errorMessage={errors.passwordConfirm?.message}
            />
          )}
        />

        <Button title="Cadastrar" onPress={handleSubmit(handleSignUp)} />
        <Button
          variant="outline"
          title="Voltar para o login"
          onPress={handleGoBack}
        />
      </ScrollView>
    </View>
  );
};
