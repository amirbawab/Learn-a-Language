import * as React from 'react';
import {LLBorderCard} from '../../components/Card';
import LLSoundData from '../../models/SoundData';

export interface LLPronunciationProps {
  data: LLSoundData[];
}
export interface LLPronunciationState {}
class LLPronunciation extends React.Component<LLPronunciationProps, LLPronunciationState> {
  render() {
    return (
      <div>
        <div className="row">
          {this.props.data.map((val, id) => {
            return (<LLBorderCard  theme="success" key={id} title={val.get_language() + " Pronunciation"} 
                                  icon={"fas fa-microphone-alt"}>
              {val.get_sound()}
            </LLBorderCard>);
          })}
        </div>
      </div>
    );
  }
}

export default LLPronunciation;
