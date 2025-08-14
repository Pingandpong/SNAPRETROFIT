import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonIcon, ArrowLeftIcon } from '@gluestack-ui/themed';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
  List: undefined;
};

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: ListScreenProps) => {
  return (
    <Box flex={1}>
      <Box
        flexDirection="row"
        alignItems="center"
        px="$4"
        py="$3"
        bg="$backgroundLight0"
        borderBottomWidth="$1"
        borderBottomColor="$borderLight200"
      >
        <Button variant="link" onPress={() => navigation.goBack()} p="$0">
          <ButtonIcon as={ArrowLeftIcon} size="xl" color="$textLight900" />
        </Button>
        <GluestackText fontSize="$xl" fontWeight="$bold" color="$textLight900" ml="$3">
          목록 화면
        </GluestackText>
      </Box>
      <Box flex={1} justifyContent="center" alignItems="center" p="$5">
        <GluestackText fontSize="$xl">
          여기는 목록 화면입니다.
        </GluestackText>
      </Box>
    </Box>
  );
};

export default ListScreen;
