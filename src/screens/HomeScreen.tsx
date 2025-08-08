import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'; // SafeAreaView 임포트
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons name="home" size={28} color={theme.colors.onBackground} />
          <Text style={[styles.header, { color: theme.colors.onBackground, fontFamily: theme.fonts.titleLarge.fontFamily }]}>Home Screen</Text>
        </View>

        <View style={[styles.welcomeSection, { backgroundColor: theme.colors.primaryContainer }]}>
          <Text style={[styles.welcomeTitle, { color: theme.colors.onPrimaryContainer, fontFamily: theme.fonts.headlineMedium.fontFamily }]}>환영합니다!</Text>
          <Text style={[styles.welcomeText, { color: theme.colors.onPrimaryContainer, fontFamily: theme.fonts.bodyLarge.fontFamily }]}>이 앱은 React Native와 Expo로 만들어진 샘플 앱입니다.</Text>
        </View>

        {/* React Native Paper의 Card 컴포넌트 사용 예시 */}
        <Card style={[styles.paperCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ fontFamily: theme.fonts.titleMedium.fontFamily, color: theme.colors.onSurface }}>첫 번째 카드</Title>
            <Paragraph style={{ fontFamily: theme.fonts.bodyMedium.fontFamily, color: theme.colors.onSurfaceVariant }}>이것은 React Native Paper의 카드 컴포넌트입니다.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('Detail')} style={styles.cardButton}>상세 화면으로</Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.paperCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ fontFamily: theme.fonts.titleMedium.fontFamily, color: theme.colors.onSurface }}>두 번째 카드</Title>
            <Paragraph style={{ fontFamily: theme.fonts.bodyMedium.fontFamily, color: theme.colors.onSurfaceVariant }}>다양한 정보를 표시하는 데 활용할 수 있습니다.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('Settings')} style={styles.cardButton}>설정 화면으로</Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // paddingTop을 줄여서 SafeAreaView와 조화롭게
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 28,
    marginLeft: 10,
  },
  welcomeSection: {
    width: '90%',
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    // backgroundColor는 theme에서 동적으로 적용
  },
  welcomeTitle: {
    fontSize: 22,
    // fontWeight는 theme의 폰트 설정(headlineMedium)에 따름
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
  },
  paperCard: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 12,
    elevation: 4,
  },
  cardButton: {
    marginHorizontal: 8,
  }
});

export default HomeScreen;
