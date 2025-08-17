// Mock Data for the application
export const MOCK_DATA = [
  { id: 1, title: '첫 번째 게시물', content: '이것은 첫 번째 목업 데이터의 상세 내용입니다. Gluestack UI와 React Navigation을 테스트하고 있습니다.' },
  { id: 2, title: '두 번째 아이템', content: '두 번째 아이템의 내용이 여기에 표시됩니다. 리스트 스크린의 예시입니다.' },
  { id: 3, title: '세 번째 항목', content: '세 번째 항목에 대한 상세 설명입니다. app_base 프로젝트의 일부입니다.' },
  { id: 4, title: '네 번째 리스트 아이템', content: '네 번째 목업 데이터입니다. 스크롤 기능을 테스트하기 위해 추가되었습니다.' },
  { id: 5, title: '다섯 번째 제목', content: '마지막 목업 데이터의 내용입니다. 누르면 상세 화면으로 이동합니다.' },
];

export const getMockDataById = (id: number) => MOCK_DATA.find(item => item.id === id);
