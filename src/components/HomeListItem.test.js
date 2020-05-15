import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import HomeListItem from './HomeListItem';

// unmount and cleanup DOM after the test is finished.
afterEach(() => cleanup());

describe('HomeListItem component functionality', () => {
  it('renders with provided data', () => {
    const props = {
      id: 1,
      address: '123 Fake St, Juneau, AL 99801',
      homeowner: 'Jane Doe',
      price: 12345,
      photoURL: 'https://placekitten.com/200/300'
    };

    render(<HomeListItem {...props} />);

    expect(screen.getByLabelText(/home-list-item-address/)).toHaveTextContent(props.address);
    expect(screen.getByLabelText(/home-list-item-homeowner/)).toHaveTextContent(props.homeowner);
    expect(screen.getByLabelText(/home-list-item-price/)).toHaveTextContent(new Intl.NumberFormat().format(props.price));

    expect(screen).toMatchSnapshot();
  })
})