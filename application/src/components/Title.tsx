import * as React from 'react';

export interface LLProps {
  title?: string;
}
 
export interface LLState {}
 
class LLTitle extends React.Component<LLProps, LLState> {}

class LLWordTitle extends LLTitle {
  render() {
    return (
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <i className="far fa-file-word"></i> <b>{this.props.title}</b>
        </h1>
      </div>
    );
  }
}

export default LLWordTitle;
