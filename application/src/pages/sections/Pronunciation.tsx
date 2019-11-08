import * as React from 'react';
import {LLBorderCard, LLBasicCard} from '../../components/Card';
import LLSoundData from '../../models/SoundData';
import {LLSplitButton} from '../../components/Button';

export interface LLPronunciationProps {
  data: LLSoundData[];
  onAdd: (language: string, sound: string) => void;
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
    let language_input = this.refs.language as HTMLInputElement;
    let sound_input = this.refs.sound as HTMLInputElement;
    this.props.onAdd(language_input.value, sound_input.value);
  }
  render() {
    let form = undefined;
    if(!this.state.form_hidden) {
      form = (
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <div className="form-group">
                <label>Language</label>
                <input type="text" className="form-control" ref="language"/>
              </div>
              <div className="form-group">
                <label>Sound</label>
                <input type="text" className="form-control" ref="sound"/>
              </div>
              <button className="btn btn-primary mr-2" onClick={(e) => this.add_pronunciation()}>Add</button>
              <button className="btn btn-secondary" onClick={(e) => this.set_form_hidden(true)}>Close</button>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          {this.props.data.map((val, id) => {
            return <LLBorderCard  key={id} title={val.get_language() + " Pronunciation"} 
                                  icon={"fas fa-microphone-alt"}>{val.get_sound()}</LLBorderCard>
          })}

          <div className="col-xl-4 col-md-6 mb-4">
            <LLSplitButton theme="primary" icon="fas fa-plus-square" on_click={() => this.set_form_hidden(false)}>
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
