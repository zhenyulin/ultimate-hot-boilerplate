import * as React from 'react';
import { default as styled } from 'styled-components';

interface IProps {
  className?: string,
  title?: string,
  body?: string,
}

export class Paragraph extends React.PureComponent<IProps> {
  public render() {
    const { className, title, body } = this.props;
    return (
      <div className={className}>
        <div className="title">
          {title}
        </div>
        <div className="body">
          {body}
        </div>
      </div>
    );
  }
}

export default styled(Paragraph)`
  width: 420px;
  padding: 5px;
  margin-top: 20px;

  .title {
    font-weight: bold;
  }
`;
