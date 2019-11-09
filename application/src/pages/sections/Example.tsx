import * as React from 'react';
import {LLBasicCard} from '../../components/Card';
import {LLSplitButton, LLBasicButton} from '../../components/Button';
import {LLLabelInput} from '../../components/Input';
import {LLOkCancelForm} from '../../components/Form';
import LLExampleData from '../../models/ExampleData';

export interface LLExampleProps {
  data: LLExampleData[];
  on_add: (sentence: string) => void;
  on_delete: (id: number) => void;
  onExampleUpdate: () => void;
}
export interface LLExampleState {}
class LLExample extends React.Component<LLExampleProps, LLExampleState> {
  state = {
    sentence_form_hidden: true,
    pronunciation_form_hidden: Array()
  }
  set_sentence_form_hidden(is_hidden : boolean) {
    this.setState({'sentence_form_hidden': is_hidden});
    return false;
  }
  set_pronunciation_form_hidden(e : any, id: number, is_hidden : boolean) {
    if(e !== null) {
      e.preventDefault();
    }
    this.state.pronunciation_form_hidden[id] = is_hidden;
    this.setState(this.state);
  }
  add_example() {
    let input = this.refs.sentence as LLLabelInput
    this.props.on_add(input.value());
    return false;
  }
  delete_example(e: any, id: number) {
    e.preventDefault();
    this.props.on_delete(id);
  }
  add_example_sound(id: number) {
    let language_input = this.refs["language_"+id] as LLLabelInput;
    let sound_input = this.refs["sound_"+id] as LLLabelInput;
    this.props.data[id].add_sound(language_input.value(), sound_input.value());
    this.props.onExampleUpdate();
  }
  delete_example_sound(e: any, example_id: number, sound_id: number) {
    e.preventDefault();
    this.props.data[example_id].delete_sound(sound_id);
    this.props.onExampleUpdate();
  }
  render() {
    let sentence_form = undefined;
    if(!this.state.sentence_form_hidden) {
      sentence_form = (
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <LLOkCancelForm 
                  ok_name="Add" 
                  cancel_name="Close" 
                  on_ok={() => this.add_example()} 
                  on_cancel={() => this.set_sentence_form_hidden(true)}>
                <LLLabelInput ref="sentence" label="Sentence"/>
              </LLOkCancelForm>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    let sound_form = (id : number) => (
      <LLOkCancelForm 
          ok_name="Add" 
          cancel_name="Close" 
          on_ok={() => this.add_example_sound(id)} 
          on_cancel={() => this.set_pronunciation_form_hidden(null, id, true)}>
        <LLLabelInput ref={"language_"+id} label="Language"/>
        <LLLabelInput ref={"sound_"+id} label="Sound"/>
      </LLOkCancelForm>
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
                          <a href="#" onClick={(e) => {this.delete_example_sound(e, example_id, sound_id)}}>
                            <span className="text-danger mr-2">[Delete]</span>
                          </a>
                          <span>{sound.get_sound()}</span>
                        </div>
                      );
                    })}</div>
                    <a href="#" onClick={(e) => this.set_pronunciation_form_hidden(e, example_id, false)}>
                      <i className="fas fa-plus-square"></i> Add Pronunciation
                    </a>
                    {this.state.pronunciation_form_hidden[example_id] 
                      || example_id >= this.state.pronunciation_form_hidden.length ? 
                      undefined : sound_form(example_id)}
                    <a href="#" onClick={(e)=>{this.delete_example(e, example_id)}}>
                      <div className={"text-xs font-weight-bold text-danger text-uppercase mt-2"}>DELETE EXAMPLE</div>
                    </a>
                    <div className="border-top my-3"></div>
                  </div>
                );
              })}
              
            </LLBasicCard>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <LLSplitButton theme="primary" icon="fas fa-plus-square" on_click={() => this.set_sentence_form_hidden(false)}>
              Add Example
            </LLSplitButton>
          </div>
        </div>
        {sentence_form}
      </div>
    );
  }
}

export default LLExample;
