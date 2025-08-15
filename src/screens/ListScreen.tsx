import React from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonIcon, ArrowLeftIcon, Pressable, VStack, Heading, Text } from '@gluestack-ui/themed';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

// Mock Data
const MOCK_DATA = [
  { id: 1, title: '첫 번째 게시물', content: '이것은 첫 번째 목업 데이터의 상세 내용입니다. Gluestack UI와 React Navigation을 테스트하고 있습니다.' },
  { id: 2, title: '두 번째 아이템', content: '두 번째 아이템의 내용이 여기에 표시됩니다. 리스트 스크린의 예시입니다.' },
  { id: 3, title: '세 번째 항목', content: '세 번째 항목에 대한 상세 설명입니다. app_base 프로젝트의 일부입니다.' },
  { id: 4, title: '네 번째 리스트 아이템', content: '네 번째 목업 데이터입니다. 스크롤 기능을 테스트하기 위해 추가되었습니다.' },
  { id: 5, title: '다섯 번째 제목', content: '마지막 목업 데이터의 내용입니다. 누르면 상세 화면으로 이동합니다.' },
];

export const getMockDataById = (id: number) => MOCK_DATA.find(item => item.id === id);

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: ListScreenProps) => {
  const { colorMode } = useTheme(); // Call useTheme hook

  const renderItem = ({ item }: { item: typeof MOCK_DATA[0] }) => (
    <Pressable
      onPress={() => navigation.navigate('Detail', { itemId: item.id })}
      bg={colorMode === 'dark' ? '$cardDark' : '$cardLight'}
      p="$4"
      borderBottomWidth="$1"
      borderBottomColor={colorMode === 'dark' ? '$borderDark' : '$borderLight'}
    >
      <VStack>
        <Heading size="md" color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{item.title}</Heading>
        <Text color={colorMode === 'dark' ? '$textDark' : '$textLight'} mt="$1">{item.content.substring(0, 40)}...</Text>
      </VStack>
    </Pressable>
  );

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
        <GluestackText fontSize="$xl" fontWeight="$bold" color={colorMode === 'dark' ? '$textDark' : '$textLight'} ml="$3">
          목록 화면
        </GluestackText>
      </Box>
      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
};

export default ListScreen;
