import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity);

import { styles } from "./styles";
import { THEME } from "../../styles/theme";

import { LevelBars } from "../LevelBars";
import { QUIZZES } from "../../data/quizzes";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = TouchableOpacityProps & {
  data: typeof QUIZZES[0];
  index: number;
};

export function QuizCard({ data, index, ...rest }: Props) {
  return (
    <TouchableOpacityAnimated entering={FadeInUp.delay(index*100)} style={styles.container} {...rest}>
      <View style={styles.header}>
        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacityAnimated>
  );
}
