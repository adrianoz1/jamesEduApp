import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH_TOKEN_STORAGE = "@jamesedu:authToken";

export async function storageAuthTokenSave(token: string, refreshToken: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refreshToken }));
}

export async function storageAuthTokenGet() {
  const data = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  if (data) {
    const parsedData = JSON.parse(data) as { token: string, refreshToken: string };

    return parsedData;
  }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
