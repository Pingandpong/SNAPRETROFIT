import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonIcon, ArrowLeftIcon } from '@gluestack-ui/themed';
import { RootStackParamList } from '../navigation/types'; // Import from types.ts
import { Feather } from '@expo/vector-icons'; // Use Feather for consistency

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      {/* Header */}
      <Box className="flex-row items-center px-4 py-3 pt-8 bg-backgroundLight dark:bg-backgroundDark border-b border-borderLight dark:border-borderDark">
        <Button variant="link" onPress={() => navigation.goBack()} p="$0">
          <ButtonIcon as={Feather} name="arrow-left" size={24} className="text-textLight dark:text-textDark text-shadow-neumo-icon" />
        </Button>
        <GluestackText className="text-xl font-bold text-textLight dark:text-textDark ml-3">
          프로필 화면
        </GluestackText>
      </Box>
      <Box className="flex-1 justify-center items-center p-5">
        <GluestackText className="text-xl text-textLight dark:text-textDark">
          여기는 프로필 화면입니다.
        </GluestackText>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
