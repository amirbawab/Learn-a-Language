import * as React from 'react';
import {LLBasicCard} from '../../components/Card';
import {LLSplitButton} from '../../components/Button';
import LLExampleData from '../../models/ExampleData';

export interface LLExampleProps {
  data: LLExampleData[];
  onAdd: (sentence: string) => void;
  onExampleUpdate: () => void;
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
  set_sentence_form_hidden(is_hidden : boolean) {
    this.setState({'sentence_form_hidden': is_hidden});
    return false;
  }
  set_pronunciation_form_hidden(e : any, id: number, is_hidden : boolean) {
    e.preventDefault();
    let new_array = Array.from(this.state.pronunciation_form_hidden)
    new_array[id] = is_hidden;
    this.setState({'pronunciation_form_hidden': new_array});
  }
  add_example() {
    let input = this.refs.sentence as HTMLInputElement;
    this.props.onAdd(input.value);
  }
  add_example_sound(id: number) {
    let language_input = this.refs["language_"+id] as HTMLInputElement;
    let sound_input = this.refs["sound_"+id] as HTMLInputElement;
    this.props.data[id].add_sound(language_input.value, sound_input.value);
    this.props.onExampleUpdate();
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
                <input type="text" className="form-control" ref="sentence"/>
              </div>
              <button className="btn btn-primary mr-2" onClick={(e) => this.add_example()}>Add</button>
              <button className="btn btn-secondary" onClick={(e) => this.set_sentence_form_hidden(true)}>Close</button>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    let sound_form = (id : number) => (
      <div className="small">
        <div className="form-group">
          <label>Language</label>
          <input type="text" className="form-control form-control-sm" ref={"language_"+id}/>
        </div>
        <div className="form-group">
          <label>Sound</label>
          <input type="text" className="form-control form-control-sm" ref={"sound_"+id}/>
        </div>
        <button className="btn btn-primary mr-2 btn-sm" onClick={(e) => this.add_example_sound(id)}>Add</button>
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
              
              <LLSplitButton theme="primary" icon="fas fa-plus-square" on_click={() => this.set_sentence_form_hidden(false)}>
                Add Example
              </LLSplitButton>
            </LLBasicCard>
          </div>
        </div>
        {sentence_form}
      </div>
    );
  }
}

export default LLExample;
