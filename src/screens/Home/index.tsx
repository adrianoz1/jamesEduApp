import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Trophy } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import { Level } from "../../components/Level";
import { Header } from "../../components/Header";
import { QuizCard } from "../../components/QuizCard";

import { styles } from "./styles";
import { api } from "../../services/api";
import { AppError } from "../../utils/AppError";
import { useToast } from "../../context/ToastContext";
import { QuizProps } from "../Quiz/types";
import { AppNavigatorRoutesProps } from "../../routes";

export function Home() {
  const [quizzes, setQuizzes] = useState([] as QuizProps[]);
  const [allQuizzes, setAllQuizzes] = useState([] as QuizProps[]);

  const [levels, setLevels] = useState([1, 2, 3]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { showToast } = useToast();

  function handleLevelFilter(level: number) {
    const levelAlreadySelected = levels.includes(level);

    if (levelAlreadySelected) {
      if (levels.length > 1) {
        setLevels((prevState) => prevState.filter((item) => item !== level));
      }
    } else {
      setLevels((prevState) => [...prevState, level]);
    }
  }

  useEffect(() => {
    setQuizzes(allQuizzes.filter(({ level }) => levels.includes(level)));
  }, [levels]);

  async function fetchQuizzes() {
    try {
      const response = await api.get("/quizzes");
      const quizzes = response.data.quizzes.filter((quiz: QuizProps) =>
        levels.includes(quiz.level)
      );
      setAllQuizzes(quizzes);
      setQuizzes(quizzes);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os quizzes. Tente novamente mais tarde.";

      showToast(title);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        icon={Trophy}
        logout={true}
        title="Vamos estudar"
        subtitle="Treine seus conhecimento"
        onPress={() => navigation.navigate("history")}
      />

      <View style={styles.levels}>
        <Level
          title="Fácil"
          type="EASY"
          onPress={() => handleLevelFilter(1)}
          isChecked={levels.includes(1)}
        />
        <Level
          title="Médio"
          type="MEDIUM"
          onPress={() => handleLevelFilter(2)}
          isChecked={levels.includes(2)}
        />
        <Level
          title="Difícil"
          type="HARD"
          onPress={() => handleLevelFilter(3)}
          isChecked={levels.includes(3)}
        />
      </View>

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <QuizCard
            index={index}
            data={item}
            onPress={() => navigation.navigate("quiz", { id: item.id })}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cards}
      />
    </View>
  );
}
