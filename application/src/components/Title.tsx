import * as React from 'react';

export interface LLTitleProps {}
export interface LLTitleState {}
 
class LLTitle extends React.Component<LLTitleProps, LLTitleState> {
  render() {
    return (
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 col-lg-12">
          {this.props.children}
        </h1>
      </div>
    );
  }
}

export default LLTitle;
