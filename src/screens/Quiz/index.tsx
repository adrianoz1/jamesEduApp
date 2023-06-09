import React from "react";

import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { styles } from "./styles";

import { historyAdd } from "../../storage/quizHistoryStorage";

import { Loading } from "../../components/Loading";
import { Question } from "../../components/Question";
import { QuizHeader } from "../../components/QuizHeader";
import { ConfirmButton } from "../../components/ConfirmButton";
import { OutlineButton } from "../../components/OutlineButton";
import { api } from "../../services/api";
import { QuizProps } from "./types";

interface Params {
  id: string;
}

export function Quiz() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null
  );

  const shake = useSharedValue(0);

  const navigation = useNavigation();
  const { navigate } = useNavigation();

  const route = useRoute();
  const { id } = route.params as Params;

  async function fetchQuiz() {
    try {
      const response = await api.get(`/quizzes/${id}`);
      setQuiz(response.data.quizzes);
      if (!response.data.quizzes) navigation.goBack();
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  }

  function handleSkipConfirm() {
    Alert.alert("Pular", "Deseja realmente pular a questão?", [
      { text: "Sim", onPress: () => handleNextQuestion(points) },
      { text: "Não", onPress: () => {} },
    ]);
  }

  async function handleFinished(points: number) {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      quizId: id,
      questions: quiz?.questions?.length,
    });

    navigate("finish", {
      points: String(points),
      total: String(quiz?.questions?.length),
    });
  }

  function handleNextQuestion(points: number) {
    if (currentQuestion < quiz.questions?.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1);
    } else {
      handleFinished(points);
    }
  }

  function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (
      quiz.questions[currentQuestion]?.alternatives[alternativeSelected]
        .is_correct
    ) {
      handleNextQuestion(points + 1);
      setPoints(prevPoints => prevPoints + 1);
    } else {
      shakeAnimation();
      handleNextQuestion(points);
    }
    setAlternativeSelected(null);
  }

  function handleStop() {
    Alert.alert("Parar", "Deseja parar agora?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => navigate("homeScreen"),
      },
    ]);

    return true;
  }

  function shakeAnimation() {
    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }

  const shakeStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shake.value,
            [0, 0.5, 1, 1.5, 2.5, 3],
            [0, -15, 0, 15, 0, -15, 0]
          ),
        },
      ],
    };
  });

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestion + 1}
          totalOfQuestions={quiz.questions?.length}
        />

        <Animated.View style={shakeStyleAnimated}>
          <Question
            key={quiz.questions[currentQuestion].content}
            question={quiz.questions[currentQuestion]}
            alternativeSelected={alternativeSelected}
            setAlternativeSelected={setAlternativeSelected}
          />
        </Animated.View>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </ScrollView>
    </View>
  );
}
