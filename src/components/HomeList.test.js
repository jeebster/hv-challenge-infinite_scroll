import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import HomeList from './HomeList';

// clear mocks, unmount and cleanup DOM after the test is finished.
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
})

describe('HomeList rendering', () => {
  // mock the state hooks
  let setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [
    {
      homes: [
        {
          0: {
            id: 1,
            address: '123 Fake St, Juneau, AL 99801',
            homeowner: 'Jane Doe',
            price: 12345,
            photoURL: 'https://placekitten.com/200/300'
          }
        }
      ],
      nextPage: 1,
      hasError: false,
      hasMore: false,
    },
    setState
  ]);

  // mock the http request
  const fetchHomes = jest.fn();
  fetchHomes.mockImplementation(() => {
    setState(prevState => ({
      ...prevState,
      hasError: true,
    }))
  })

  it('renders HomeListItem children components on successful data fetch', () => {
    render(<HomeList />);
    const homesListContainerElement = screen.getByLabelText(/homes-list/);

    expect(homesListContainerElement.children.length()).toBeGreaterThan(0);
  });
});

describe('Error handling UI', () => {
  // mock the state hooks
  let setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [
    {
      homes: [],
      nextPage: 1,
      hasError: false,
      hasMore: true,
    },
    setState
  ]);

  // mock the http request
  const fetchHomes = jest.fn();
  fetchHomes.mockImplementation(() => {
    setState(prevState => ({
      ...prevState,
      hasError: true,
    }));
  });

  it('renders error handling UI if data fetch fails', () => {
    render(<HomeList />);
    expect(fetchHomes).toHaveBeenCalledTimes(1);

    expect(screen.getByLabelText(/error-container/)).toBeDefined();
  });

  it('should call fetchHomes() when clicking on the button', () => {
    render(<HomeList />);
    const errorElement = screen.getByLabelText(/error-container/);
    fireEvent.click(errorElement);

    expect(fetchHomes).toHaveBeenCalledTimes(2);
  });
});