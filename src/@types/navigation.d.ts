export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      signUp: undefined;
      signIn: undefined;
      quiz: { id: string };
      history: undefined;
      finish: { total: string, points: string };
    }
  }
}
