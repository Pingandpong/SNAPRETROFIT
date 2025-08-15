import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonText, ButtonIcon, ArrowLeftIcon, Heading } from '@gluestack-ui/themed';
import { RootStackParamList } from '../navigation/types';
import { getMockDataById } from './ListScreen'; // Import the function from ListScreen
import { useTheme } from '../context/ThemeContext';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
  // Get the item ID from route params
  const { itemId } = route.params;
  const item = getMockDataById(itemId);
  const { colorMode } = useTheme(); // Call useTheme hook

  return (
    <Box flex={1} bg={colorMode === 'dark' ? '$backgroundDark' : '$backgroundLight'}>
      <Box
        flexDirection="row"
        alignItems="center"
        px="$4"
        py="$3"
        bg={colorMode === 'dark' ? '$backgroundDark' : '$backgroundLight'}
        borderBottomWidth="$1"
        borderBottomColor={colorMode === 'dark' ? '$borderDark' : '$borderLight'}
      >
        <Button variant="link" onPress={() => navigation.goBack()} p="$0">
          <ButtonIcon as={ArrowLeftIcon} size="xl" color={colorMode === 'dark' ? '$textDark' : '$textLight'} />
        </Button>
        <GluestackText fontSize="$xl" fontWeight="$bold" color={colorMode === 'dark' ? '$textDark' : '$textLight'} ml="$3" isTruncated>
          {item ? item.title : '상세 정보'}
        </GluestackText>
      </Box>
      <Box flex={1} p="$5">
        {item ? (
          <Box>
            <Heading size="xl" mb="$4" color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{item.title}</Heading>
            <GluestackText fontSize="$lg" lineHeight="$xl" color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{item.content}</GluestackText>
          </Box>
        ) : (
          <GluestackText color={colorMode === 'dark' ? '$textDark' : '$textLight'}>항목을 찾을 수 없습니다.</GluestackText>
        )}
      </Box>
    </Box>
  );
};

export default DetailScreen;
