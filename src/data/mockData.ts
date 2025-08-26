// Mock Data for the application
export const MOCK_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `목업 아이템 ${i + 1}`,
  content: `목업 아이템 ${i + 1}의 내용입니다. 리스트와 상세 화면 이동을 테스트합니다.`,
}));

export const getMockDataPage = (page: number, pageSize = 10) => {
  const start = (page - 1) * pageSize;
  return MOCK_DATA.slice(start, start + pageSize);
};

export const getMockDataById = (id: number) =>
  MOCK_DATA.find((item) => item.id === id);
