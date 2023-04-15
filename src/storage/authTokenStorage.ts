import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH_TOKEN_STORAGE = "@jamesedu:authToken";

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
