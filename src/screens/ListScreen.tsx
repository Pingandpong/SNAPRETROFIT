import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MOCK_DATA } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { commonStyles } from '../styles/commonStyles';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import AnimatedCard from '../components/AnimatedCard';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: ListScreenProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = MOCK_DATA.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }: { item: (typeof MOCK_DATA)[0] }) => (
    <AnimatedCard>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { itemId: item.id })}
        style={styles.itemContainer}
      >
        <View style={styles.itemIcon}>
          <Feather name="list" size={24} color="#fff" />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemContent}>{item.content.substring(0, 60)}...</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>
    </AnimatedCard>
  );

  return (
    <LinearGradient
      colors={['#0b0e23', '#151929']}
      style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safe}>
        <AppHeader
          title={t('list_card_title')}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={t('search_placeholder')}
        />
        {loading && (
          <View className="px-6">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </View>
        )}
        {!loading && filteredData.length === 0 && (
          <EmptyState message={t('empty_list')} />
        )}
        {!loading && filteredData.length > 0 && (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  listContentContainer: {
    paddingHorizontal: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#7d5cff',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  itemContent: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ListScreen;