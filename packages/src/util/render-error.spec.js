import renderError from './render-error';

describe('renderError', () => {
  it('renders', () => {
    const wrapper = renderError;
    expect(wrapper).toMatchSnapshot();
  });
});
