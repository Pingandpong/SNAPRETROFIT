import React from 'react';
import { FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Pressable, VStack, Heading, Text, HStack } from '@gluestack-ui/themed';
import { RootStackParamList } from '../navigation/types';
import { MOCK_DATA } from '../data/mockData';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: ListScreenProps) => {
  const { t } = useTranslation();

  const images = [
    require('../../sample_image/sample_IMAGE2.png'),
    require('../../sample_image/sample_IMAGE3.png'),
    require('../../sample_image/sample_IMAGE4.png'),
    require('../../sample_image/sample_IMAGE5.png'),
  ];

  const renderItem = ({ item, index }: { item: (typeof MOCK_DATA)[0]; index: number }) => (
    <Pressable
      onPress={() => navigation.navigate('Detail', { itemId: item.id })}
      className="rounded-xl mx-4 my-2 p-5 shadow-soft-2 dark:shadow-neumo-dark bg-cardLight dark:bg-cardDark hover:bg-cardHoverLight dark:hover:bg-cardHoverDark"
    >
      <HStack className="items-center space-x-4">
        <Image
          source={images[index % images.length]}
          className="w-12 h-12 rounded-lg"
          resizeMode="cover"
        />
        <VStack className="flex-1">
          <Heading size="md" className="text-textLight dark:text-textDark font-semibold">
            {item.title}
          </Heading>
          <Text size="sm" className="mt-1 text-textLight dark:text-textDark opacity-80">
            {item.content.substring(0, 60)}...
          </Text>
        </VStack>
        <Feather name="chevron-right" size={20} className="text-textLight dark:text-textDark opacity-60 text-shadow-neumo-icon" />
      </HStack>
    </Pressable>
  );

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      {/* Header */}
      <HStack className="items-center border-b p-4 pt-8 border-borderLight dark:border-borderDark justify-between bg-backgroundLight dark:bg-backgroundDark">
        <Pressable onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={20} className="text-textLight dark:text-textDark text-shadow-neumo-icon" />
        </Pressable>
        <Heading size="lg" className="text-textLight dark:text-textDark">
          {t('list_card_title')}
        </Heading>
      </HStack>

      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      />
    </Box>
  );
};

export default ListScreen;