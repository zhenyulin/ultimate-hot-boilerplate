import * as React from 'react';
import { default as styled } from 'styled-components';

interface Props {
  className?: string,
  title?: string,
  body?: string,
}

export class Paragraph extends React.PureComponent<Props> {
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
  .title {
    font-weight: bold;
  }
`;
