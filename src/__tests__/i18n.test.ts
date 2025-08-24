import i18n from '../services/i18n';

describe('i18n', () => {
  it('영어 앱 제목을 반환한다', async () => {
    await i18n.changeLanguage('en');
    expect(i18n.t('app_title')).toBe('Hanhi');
  });
});
