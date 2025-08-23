import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('기본 테스트', () => {
  it('텍스트가 렌더링된다', () => {
    const { getByText } = render(<Text>테스트</Text>);
    expect(getByText('테스트')).toBeTruthy();
  });
});
