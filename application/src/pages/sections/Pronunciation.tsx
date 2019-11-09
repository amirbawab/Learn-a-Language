import * as React from 'react';
import {LLBorderCard, LLBasicCard} from '../../components/Card';
import LLSoundData from '../../models/SoundData';
import {LLSplitButton} from '../../components/Button';
import {LLOkCancelForm} from '../../components/Form';
import {LLLabelInput} from '../../components/Input';

export interface LLPronunciationProps {
  data: LLSoundData[];
  on_add: (language: string, sound: string) => void;
  on_delete: (id: number) => void;
}
export interface LLPronunciationState {}
class LLPronunciation extends React.Component<LLPronunciationProps, LLPronunciationState> {
  state = {
    form_hidden: true
  }
  set_form_hidden(is_hidden : boolean) {
    this.setState({'form_hidden': is_hidden});
    return false;
  }
  add_pronunciation() {
    let language_input = this.refs.language as LLLabelInput;
    let sound_input = this.refs.sound as LLLabelInput;
    this.props.on_add(language_input.value(), sound_input.value());
  }
  delete_pronunciation(e: any, id: number) {
    e.preventDefault();
    this.props.on_delete(id);
  }
  render() {
    let form = undefined;
    if(!this.state.form_hidden) {
      form = (
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <LLOkCancelForm 
                  ok_name="Add" 
                  cancel_name="Close" 
                  on_ok={() => this.add_pronunciation()} 
                  on_cancel={() => this.set_form_hidden(true)}>
                <LLLabelInput ref="language" label="Language"/>
                <LLLabelInput ref="sound" label="Sound"/>
              </LLOkCancelForm>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          {this.props.data.map((val, id) => {
            return (<LLBorderCard  theme="success" key={id} title={val.get_language() + " Pronunciation"} 
                                  icon={"fas fa-microphone-alt"}>
              {val.get_sound()}
              <a href="#/" onClick={(e)=>{this.delete_pronunciation(e, id)}}>
                <div className={"text-xs font-weight-bold text-danger text-uppercase mt-2"}>DELETE</div>
              </a>
            </LLBorderCard>);
          })}
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <LLSplitButton theme="success" icon="fas fa-plus-square" on_click={() => this.set_form_hidden(false)}>
              Add Pronunciation
            </LLSplitButton>
          </div>
        </div>
        {form}
      </div>
    );
  }
}

export default LLPronunciation;
