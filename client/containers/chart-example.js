import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ChartExample } from 'finchart';

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
  width: 100%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
