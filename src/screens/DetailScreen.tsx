import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonText, ButtonIcon, ArrowLeftIcon } from '@gluestack-ui/themed';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ navigation }: DetailScreenProps) => {
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
          상세 화면
        </GluestackText>
      </Box>
      <Box flex={1} justifyContent="center" alignItems="center" p="$5">
        <GluestackText fontSize="$xl" mb="$5">
          여기는 상세 화면입니다.
        </GluestackText>
        <Button onPress={() => navigation.navigate('Home')}>
          <ButtonText>홈으로 이동</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};



export default DetailScreen;
