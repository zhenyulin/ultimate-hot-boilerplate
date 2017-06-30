import React from 'react';
import { render, shallow } from 'enzyme';

import { BasicButton } from '../basic-button';

describe('basic-button', () => {
  it('renders', () => {
    const button = render(<BasicButton text="test" />);
    expect(button.text()).toEqual('test');
    expect(button).toMatchSnapshot();
  });

  it('clicks', () => {
    const onClick = jest.fn();
    const button = shallow(<BasicButton func={onClick} />);
    button.simulate('click');
    expect(onClick).toBeCalled();
  });
});
