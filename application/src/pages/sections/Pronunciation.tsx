import * as React from 'react';
import {LLBorderCard} from '../../components/Card';
import LLPronunciationData from '../../models/PronunciationData';

export interface LLPronunciationProps {
  data: LLPronunciationData[];
}
export interface LLPronunciationState {}
class LLPronunciation extends React.Component<LLPronunciationProps, LLPronunciationState> {
  render() {
    return (
      <div className="row">
        {this.props.data.map((val, id) => {
          return <LLBorderCard key={id} title={val.language} icon={val.icon}>{val.sound}</LLBorderCard>
        })}
      </div>
    );
  }
}

export default LLPronunciation;
