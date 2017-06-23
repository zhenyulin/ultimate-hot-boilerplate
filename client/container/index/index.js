import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'component/basic-button';
import CountAction from 'action/count';

export class Index extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    add: PropTypes.func,
    navigate: PropTypes.func,
  };

  static defaultProps = {
    count: 0,
  };

  render() {
    const { className, count } = this.props;
    const { add, navigate } = this.props;
    return (
      <div className={className}>
        <BasicButton
          className="statusButton"
          func={add}
          text={count.toString()}
        />
        <BasicButton
          className="navButton"
          func={() => navigate('/second')}
          text="To Second Page"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.get('count'),
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(CountAction.add),
  navigate: location => dispatch(push(location)),
});

const component = styled(Index)`
  width: 360px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;

  .statusButton {
    background: lightblue;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
