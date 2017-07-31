import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ChartExample from 'components/finchart/src/example/ChartExample';

export class Page extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <ChartExample />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const component = styled(Page)`
  width: 360px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
