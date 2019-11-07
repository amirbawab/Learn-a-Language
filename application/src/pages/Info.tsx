import * as React from 'react';
import LLTitle from '../components/Title';
import {LLBasicCard} from '../components/Card';

export interface LLInfoProps {}
export interface LLInfoState {}
 
class LLInfo extends React.Component<LLInfoProps, LLInfoState> {
  state = {}

  render() {
    return (
      <div className="m-2">
        <LLTitle>Welcome</LLTitle>
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <h5>Click on "New Word" or select an existing one</h5>
            </LLBasicCard>
          </div>
        </div>
      </div>
    );
  }
}

export default LLInfo;
