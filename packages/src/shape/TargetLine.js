import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Line from './Line';

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    targets: PropTypes.array.isRequired,
  };

  static defaultProps = {

  };

  render() {
    const {
      className,
      xScale,
      yScale,
      height,
      targets,
    } = this.props;

    let data = targets.map(d => [
        { x: d.start, y: d.target },
        { x: d.end, y: d.target },
    ]);

    // TODO: add data format check
    data = [].concat(...data);

    const fields = {
      x: 'x',
      y: 'y',
    };

    // TODO: add label
    return (
      <Line {...{ className, xScale, yScale, height, data, fields }} />
    );
  }
}

export default styled(Component)`
  stroke: grey;
  stroke-dasharray: 2, 2;
`;
