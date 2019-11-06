import * as React from 'react';
import {LLBasicCard} from '../../components/Card';
import LLExampleData from '../../models/ExampleData';

export interface LLExampleProps {
  data: LLExampleData[];
}
export interface LLExampleState {}
class LLExample extends React.Component<LLExampleProps, LLExampleState> {
  constructor(props: LLExampleProps) {
    super(props);
    this.props.data.map((example, example_id) => {
      this.state.pronunciation_form_hidden.push(true);
    });
  }
  state = {
    sentence_form_hidden: true,
    pronunciation_form_hidden: Array()
  }
  set_sentence_form_hidden(e : any, is_hidden : boolean) {
    e.preventDefault();
    this.setState({'sentence_form_hidden': is_hidden});
  }
  set_pronunciation_form_hidden(e : any, id: number, is_hidden : boolean) {
    e.preventDefault();
    let new_array = Array.from(this.state.pronunciation_form_hidden)
    new_array[id] = is_hidden;
    this.setState({'pronunciation_form_hidden': new_array});
  }
  render() {
    let sentence_form = undefined;
    if(!this.state.sentence_form_hidden) {
      sentence_form = (
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <div className="form-group">
                <label>Sentence</label>
                <input type="text" className="form-control" id="native"/>
              </div>
              <button className="btn btn-primary mr-2">Add</button>
              <button className="btn btn-secondary" onClick={(e) => this.set_sentence_form_hidden(e, true)}>Close</button>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    let sound_form = (id : number) => (
      <div className="small">
        <div className="form-group">
          <label>Language</label>
          <input type="text" className="form-control form-control-sm" id="language"/>
        </div>
        <div className="form-group">
          <label>Sound</label>
          <input type="text" className="form-control form-control-sm" id="sound"/>
        </div>
        <button className="btn btn-primary mr-2 btn-sm">Add</button>
        <button className="btn btn-secondary btn-sm" onClick={(e) => this.set_pronunciation_form_hidden(e, id, true)}>Close</button>
      </div>
    );

    return (
      <div>
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
                    <a href="#" onClick={(e) => this.set_pronunciation_form_hidden(e, example_id, false)}>
                      <i className="fas fa-plus-square"></i> Add Pronunciation
                    </a>
                    {this.state.pronunciation_form_hidden[example_id] ? undefined : sound_form(example_id)}
                    <div className="border-top my-3"></div>
                  </div>
                );
              })}
              <a href="#" onClick={(e) => this.set_sentence_form_hidden(e, false)} className="btn btn-primary btn-icon-split">
                <span className="icon text-white-50">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span className="text">Add Example</span>
              </a>
            </LLBasicCard>
          </div>
        </div>
        {sentence_form}
      </div>
    );
  }
}

export default LLExample;
