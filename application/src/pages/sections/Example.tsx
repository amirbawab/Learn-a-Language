import * as React from 'react';
import {LLBasicCard} from '../../components/Card';
import {LLSplitButton} from '../../components/Button';
import {LLLabelInput} from '../../components/Input';
import {LLOkCancelForm} from '../../components/Form';
import LLExampleData from '../../models/ExampleData';

export interface LLExampleProps {
  read_only: boolean;
  data: LLExampleData[];
  on_add: (sentence: string) => void;
  on_delete: (id: number) => void;
  onExampleUpdate: () => void;
}
export interface LLExampleState {}
class LLExample extends React.Component<LLExampleProps, LLExampleState> {
  pronunciation_form_hidden: boolean[] = [];
  state = {
    sentence_form_hidden: true,
    example: {}
  }
  set_sentence_form_hidden(is_hidden : boolean) {
    this.setState({'sentence_form_hidden': is_hidden});
    return false;
  }
  set_pronunciation_form_hidden(e : any, id: number, is_hidden : boolean) {
    if(e !== null) {
      e.preventDefault();
    }
    this.pronunciation_form_hidden[id] = is_hidden;
    this.setState(this.state);
  }
  add_example() {
    let input = this.refs.sentence as LLLabelInput
    this.props.on_add(input.value());
    this.set_sentence_form_hidden(true);
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
    this.set_pronunciation_form_hidden(null, id, true);
  }
  delete_example_sound(e: any, example_id: number, sound_id: number) {
    e.preventDefault();
    this.props.data[example_id].delete_sound(sound_id);
    this.props.onExampleUpdate();
  }
  render() {
    let sentence_form = undefined;
    let add_example = undefined;
    let delete_example: any = () => {};
    let sound_form: any = () => {};
    let add_sound: any = () => {};
    let delete_sound: any = () => {};
    let example_card = undefined; 

    if(!this.props.read_only) {
      // example form
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

      // sound form
      sound_form =(id : number) => { 
        if(this.pronunciation_form_hidden[id] || id >= this.pronunciation_form_hidden.length) {
          return <React.Fragment/>
        }
        return (
          <LLOkCancelForm 
              ok_name="Add" 
              cancel_name="Close" 
              on_ok={() => this.add_example_sound(id)} 
              on_cancel={() => this.set_pronunciation_form_hidden(null, id, true)}>
            <LLLabelInput ref={"language_"+id} label="Language"/>
            <LLLabelInput ref={"sound_"+id} label="Sound"/>
          </LLOkCancelForm>
        )
      };

      // add sound button
      add_sound = (id: number) => {
        return (
          <a href="#/" onClick={(e) => this.set_pronunciation_form_hidden(e, id, false)}>
            <i className="fas fa-plus-square"></i> Add Pronunciation
          </a>
        );
      };

      // delete sound button
      delete_sound = (example_id: number, sound_id: number) => {
        return (
          <a href="#/" onClick={(e) => {this.delete_example_sound(e, example_id, sound_id)}}>
            <span className="text-danger mr-2">[Delete]</span>
          </a>
        );
      };

      // delete example button
      delete_example = (id: number) => {
        return (
          <a href="#/" onClick={(e)=>{this.delete_example(e, id)}}>
            <div className={"text-xs font-weight-bold text-danger text-uppercase mt-2"}>DELETE EXAMPLE</div>
          </a>
        );
      };

      // add eample button
      add_example = (
        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <LLSplitButton theme="primary" icon="fas fa-plus-square" on_click={() => this.set_sentence_form_hidden(false)}>
              Add Example
            </LLSplitButton>
          </div>
        </div>
      );
    }

    if(this.props.data.length > 0) {
      example_card = (
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
                          {delete_sound(example_id, sound_id)}
                          <span>{sound.get_sound()}</span>
                        </div>
                      );
                    })}</div>
                    {add_sound(example_id)}
                    {sound_form(example_id)}
                    {delete_example(example_id)}
                    <div className="border-top my-3"></div>
                  </div>
                );
              })}
            </LLBasicCard>
          </div>
        </div>
      );
    }   

    return (
      <div>
        {example_card}
        {add_example}
        {sentence_form}
      </div>
    );
  }
}

export default LLExample;
