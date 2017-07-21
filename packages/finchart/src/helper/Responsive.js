import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import autobind from 'autobind-decorator';
import debounce from 'lodash.debounce';

/**
 * TODO: WIP
 * Component Wrapper to make SVG responsive
 * pass the dimension of the upper level element to children SVGs
 */
export class Responsive extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    debounceTime: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    debounceTime: 300,
    children: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };

    this.handleResize = debounce(this.resize, props.debounceTime);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  @autobind
  resize() {
    if (this.container) {
      const { height, width } = this.container.getBoundingClientRect();
      this.setState({
        width,
        height,
      });
    }
  }

  render() {
    // const { width, height } = this.state;
    const { className, children } = this.props;
    return (
      <div ref={(ref) => { this.container = ref; }} {...{ className }}>
        {children}
      </div>
    );
  }
}

export default styled(Responsive)`
  > div {
    width: 100%;
    height: 100%;
  }
`;
