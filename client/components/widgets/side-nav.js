import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BasicButton from 'components/elements/basic-button';

export class SideNav extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    func: PropTypes.func,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {};

  render() {
    const { className, list } = this.props;
    const { func } = this.props;
    return (
      <ul className={className}>
        {list.map(item => (
          <li key={item.id}>
            <BasicButton
              className="navButton"
              func={() => func(item.id)}
              text={item.value}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default styled(SideNav)`
  list-style-type: none;
  padding: 0;
  width: 160px;

  li {
    border-bottom: 1px solid lightgrey;
  }

  .navButton {
    background: none;
    text-align: left;

    &:hover {
      text-decoration: underline;
    }
  }
`;
