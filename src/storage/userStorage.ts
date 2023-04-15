import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../dtos/UserDTO";

export const USER_STORAGE = "@jamesedu:user";

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const user = await AsyncStorage.getItem(USER_STORAGE);
  return user ? (JSON.parse(user) as UserDTO) : null;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
