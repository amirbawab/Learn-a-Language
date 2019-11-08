import * as React from 'react';
import {LLBasicButton} from './Button'
import {LLBasicCard} from './Card'

export interface LLOkCancelFormProps {
  ok_name: string;
  cancel_name: string;
  on_ok: () => void;
  on_cancel: () => void;
}
export interface LLOkCancelFormState {}

class LLOkCancelForm extends React.Component<LLOkCancelFormProps, LLOkCancelFormState> {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <LLBasicButton theme="primary" extra_class="mr-2" on_click={this.props.on_ok}>{this.props.ok_name}</LLBasicButton>
        <LLBasicButton theme="secondary" on_click={this.props.on_cancel}>{this.props.cancel_name}</LLBasicButton>
      </React.Fragment>
    );
  }
}

export {LLOkCancelForm};
