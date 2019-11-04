import * as React from 'react';
import {LLBasicCard} from '../../components/Card';

export interface LLExampleProps {}
export interface LLExampleState {}
class LLExample extends React.Component<LLExampleProps, LLExampleState> {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <LLBasicCard title="Examples">
            <p>Example 1</p>
            <p>Example 2</p>
            <p>Example 3</p>
            <p>Example 4</p>
          </LLBasicCard>
        </div>
      </div>
    );
  }
}

export default LLExample;
