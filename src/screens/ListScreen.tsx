import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getMockDataPage, MOCK_DATA } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import AppScreen from '../components/AppScreen';
import SectionHeader from '../components/SectionHeader';
import Divider from '../components/Divider';
import ListItem from '../components/ListItem';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: ListScreenProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<(typeof MOCK_DATA)[0][]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const loadData = (pageNumber: number, refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else if (pageNumber === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    setTimeout(() => {
      const newData = getMockDataPage(pageNumber);
      setData(prev => (pageNumber === 1 ? newData : [...prev, ...newData]));
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
      setPage(pageNumber);
    }, 500);
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleRefresh = () => {
    loadData(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && data.length < MOCK_DATA.length) {
      loadData(page + 1);
    }
  };

  const renderItem = ({ item, index }: { item: (typeof MOCK_DATA)[0]; index: number }) => (
    <Animated.View entering={FadeInUp.delay(Math.min(index, 20) * 40)}>
      <ListItem
        leftIcon="list"
        title={item.title}
        subtitle={`${item.content.substring(0, 60)}...`}
        onPress={() => navigation.navigate('Detail', { itemId: item.id })}
      />
    </Animated.View>
  );

  return (
    <AppScreen>
      <AppHeader
        title={t('list_card_title')}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <SectionHeader title={t('browse')} />
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={() => <Divider />}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.footer}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  footer: {
    paddingVertical: 16,
  },
});

export default ListScreen;
