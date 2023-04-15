import { Text, View, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import { IconProps } from "phosphor-react-native";

import { ArrowRight } from "phosphor-react-native";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  title: string;
  subtitle: string;
  onPress: () => void;
  icon: React.FC<IconProps>;
  logout?: boolean;
};

export function Header({ title, subtitle, logout, icon: Icon, onPress }: Props) {

  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity
        style={styles.history}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Icon size={28} color={THEME.COLORS.WHITE} />
      </TouchableOpacity>

      {logout && (
        <TouchableOpacity
          style={styles.history}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <ArrowRight size={28} color={THEME.COLORS.WHITE} />
        </TouchableOpacity>
      )}
    </View>
  );
}
