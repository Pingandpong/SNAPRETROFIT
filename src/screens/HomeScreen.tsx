import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper'; // React Native Paper에서 Card, Title, Paragraph, Button 임포트
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="home" size={28} color={theme.colors.onBackground} />
        <Text style={[styles.header, { color: theme.colors.onBackground, fontFamily: theme.fonts.titleLarge.fontFamily }]}>Home Screen</Text>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeTitle, { color: theme.colors.onBackground, fontFamily: theme.fonts.headlineMedium.fontFamily }]}>환영합니다!</Text>
        <Text style={[styles.welcomeText, { color: theme.colors.onBackground, fontFamily: theme.fonts.bodyLarge.fontFamily }]}>이 앱은 React Native와 Expo로 만들어진 샘플 앱입니다.</Text>
      </View>

      {/* React Native Paper의 Card 컴포넌트 사용 예시 */}
      <Card style={[styles.paperCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Title style={{ fontFamily: theme.fonts.titleMedium.fontFamily, color: theme.colors.onSurface }}>첫 번째 카드</Title>
          <Paragraph style={{ fontFamily: theme.fonts.bodyMedium.fontFamily, color: theme.colors.onSurfaceVariant }}>이것은 React Native Paper의 카드 컴포넌트입니다.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Detail')} style={{ marginHorizontal: 8 }}>상세 화면으로</Button>
        </Card.Actions>
      </Card>

      <Card style={[styles.paperCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Title style={{ fontFamily: theme.fonts.titleMedium.fontFamily, color: theme.colors.onSurface }}>두 번째 카드</Title>
          <Paragraph style={{ fontFamily: theme.fonts.bodyMedium.fontFamily, color: theme.colors.onSurfaceVariant }}>다양한 정보를 표시하는 데 활용할 수 있습니다.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Settings')} style={{ marginHorizontal: 8 }}>설정 화면으로</Button>
        </Card.Actions>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
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
    backgroundColor: '#EADDFF', // primaryContainer color
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
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
});

export default HomeScreen;
