import { View, Text } from 'react-native';

import { Option } from '../Option';
import { styles } from './styles';
import { Question as QuestionItem } from '../../screens/Quiz/types';


type Props = {
  question: QuestionItem;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
}

export function Question({ question, alternativeSelected, setAlternativeSelected }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {question.content}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative.content}
            checked={alternativeSelected === index}
            onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
          />
        ))
      }
    </View>
  );
}
