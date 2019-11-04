import * as React from 'react';
import {LLBasicCard} from '../../components/Card';
import LLExampleData from '../../models/ExampleData';

export interface LLExampleProps {
  data: LLExampleData[];
}
export interface LLExampleState {}
class LLExample extends React.Component<LLExampleProps, LLExampleState> {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <LLBasicCard title="Examples">
            {this.props.data.map((example, id) => {
              return (
                <div key={id}>
                  <p>{example.get_sentence()}</p>
                  <p>{example.get_sounds().map((sound) => {
                    return (
                      <div>
                        <span className="text-primary mr-2">[{sound.get_language()} Pronunciation]</span>
                        <span>{sound.get_sound()}</span>
                      </div>
                    );
                  })}</p>
                  <div className="border-top my-3"></div>
                </div>
              );
            })}
          </LLBasicCard>
        </div>
      </div>
    );
  }
}

export default LLExample;
