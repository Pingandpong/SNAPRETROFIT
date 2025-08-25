export type RootTabParamList = {
  Home: undefined;
  List: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  RootTab: undefined;
  Detail: { itemId: number; otherParam?: string };
  CreateEdit: { itemId?: number };
  Payment: undefined;
  Profile: undefined;
};
