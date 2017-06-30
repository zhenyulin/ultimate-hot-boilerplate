import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'components/elements/basic-button';

export class Index extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    navigate: PropTypes.func,
  };

  static defaultProps = {

  };

  render() {
    const { className } = this.props;
    const { navigate } = this.props;
    return (
      <div className={className}>
        <BasicButton
          className="statusButton"
          func={() => navigate('/')}
          text="Back to Index"
        />
      </div>
    );
  }
}

const mapStateToProps = {};

const mapDispatchToProps = dispatch => ({
  navigate: location => dispatch(push(location)),
});

const component = styled(Index)`
  width: 360px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;

  .statusButton {
    background: grey;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
