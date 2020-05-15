import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from './App';

// unmount and cleanup DOM after the test is finished.
afterEach(() => cleanup());

test('renders HomeList', () => {
  // mock the HomeList component
  jest.Mock('./components/HomeList', () => {
    const HomeListMock = () => <div aria-label="mock-component"></div>;
    return HomeListMock;
  });

  const { getByLabelText } = render(<App />);
  const mockElement = getByLabelText(/mock-component/);
  expect(mockElement).toBeInTheDocument();
});
