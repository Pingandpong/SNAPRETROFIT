export type RootTabParamList = {
  Home: undefined;
  Screen2: undefined;
  Screen3: undefined;
};

export type RootStackParamList = {
  RootTab: undefined;
  Home: undefined;
  List: undefined;
  Settings: undefined;
  ScreenPicker: undefined;
  Status: undefined;
  Detail: { itemId: number; otherParam?: string };
  CreateEdit: { itemId?: number };
  Payment: undefined;
  Profile: undefined;
};
