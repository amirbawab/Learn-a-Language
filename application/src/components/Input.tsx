import * as React from 'react';

export interface LLLabelInputProps {
  label: string;
  text?: string;
}
export interface LLLabelInputState {}

class LLLabelInput extends React.Component<LLLabelInputProps, LLLabelInputState> {
  value() {
    let input = this.refs.input as HTMLInputElement
    return input.value;
  }
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input type="text" className="form-control" ref="input" defaultValue={this.props.text}/>
      </div>
    );
  }
}

export {LLLabelInput};
