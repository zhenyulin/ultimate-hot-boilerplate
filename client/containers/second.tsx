import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { default as styled } from 'styled-components';

import BasicButton from 'components/elements/basic-button';

interface IProps {
  className: string,
  navigate: (location?: string) => void,
};

export class Page extends React.PureComponent<IProps> {
  public render() {
    const { className } = this.props;
    const { navigate } = this.props;
    const navigateToHome = () => navigate('/');
    return (
      <div className={className}>
        <BasicButton
          className="navButton"
          func={navigateToHome}
          text="Back to Index"
        />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  navigate: location => dispatch(push(location)),
});

const component = styled(Page)`
  width: 360px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
