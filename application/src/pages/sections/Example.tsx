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
            {this.props.data.map((example, example_id) => {
              return (
                <div key={example_id}>
                  <div>{example.get_sentence()}</div>
                  <div>{example.get_sounds().map((sound, sound_id) => {
                    return (
                      <div key={sound_id}>
                        <span className="text-primary mr-2">[{sound.get_language()} Pronunciation]</span>
                        <span>{sound.get_sound()}</span>
                      </div>
                    );
                  })}</div>
                  <a href="#"><i className="fas fa-plus-square"></i> Add Pronunciation</a>
                  <div className="border-top my-3"></div>
                </div>
              );
            })}
            <a href="#" className="btn btn-primary btn-icon-split">
              <span className="icon text-white-50">
                <i className="fas fa-plus-square"></i>
              </span>
              <span className="text">Add Example</span>
            </a>
          </LLBasicCard>
        </div>
      </div>
    );
  }
}

export default LLExample;
