import * as React from 'react';
import {LLBorderCard} from '../../components/Card';

export interface LLNativeProps {
  data: string[];
}
export interface LLNativeState {}
class LLNative extends React.Component<LLNativeProps, LLNativeState> {
  render() {
    return (
      <div className="row">
        {this.props.data.map((val, id) => {
          return <LLBorderCard  key={id} title="Native form" icon="fas fa-language">{val}</LLBorderCard>
        })}
        <LLBorderCard title="" icon="fas fa-plus-square">
          <a href="#"> Add Native Form</a>
        </LLBorderCard>
      </div>
    );
  }
}

export default LLNative;
