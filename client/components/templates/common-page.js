import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from 'components/widgets/nav-bar';
import CenterView from 'utils/style/center-view';

export class CommonPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    pages: [],
  };

  render() {
    const { className, pages, children } = this.props;
    return (
      <div className={className}>
        <NavBar {...{ pages }} />
        <CenterView className="children">{children}</CenterView>
      </div>
    );
  }
}

export default styled(CommonPage)`
  font-family: 'Helvetica';
  line-height: 30px;

  .children {
    padding-top: 60px;
  }
`;
