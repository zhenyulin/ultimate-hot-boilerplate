import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import theme from 'theme';
import devices from 'utils/style/devices';
import { pagenameToRoute } from 'utils/parser/routes';

export class NavBar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    pages: [],
  };

  render() {
    const { className, pages } = this.props;
    return (
      <Navbar inverse collapseOnSelect className={className}>
        <Navbar.Header>
          <Navbar.Toggle className="toggle" />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {pages.map(p => (
              <LinkContainer key={p} to={pagenameToRoute(p)}>
                <NavItem>{p}</NavItem>
              </LinkContainer>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default styled(NavBar)`
  width: 100%;
  height: 100px;
  background: ${theme.dark};
  border-radius: 0;
  border: none;
  overflow: display;
  border-bottom: 1px solid ${theme.light};
  margin-bottom: 0;
  z-index: 2;

  .container {
    width: 100%;
    max-width: 820px;
    height: 100%;
    box-sizing: border-box;
    padding-top: 25px;
  }

  .toggle {
    padding-top: 10px;
    border: none;

    &:hover {
      background-color: transparent;
    }
  }

  .navbar-collapse {
    border: none;
    margin-top: 5px;
    padding: 0 8px;
    text-align: center;
    background: ${theme.dark};

    @media (${devices.tablet}) {
      padding-right: 20px;
    }

    .navbar-nav > li > a {
      color: white;
      padding: 15px 10px;

      &:hover {
        opacity: 0.8;
      }
    }

    .navbar-nav > li.active > a {
      background-color: transparent;
      text-decoration: underline;
    }
  }
`;
