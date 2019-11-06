import * as React from 'react';
import {LLBorderCard, LLBasicCard} from '../../components/Card';
import LLPronunciationData from '../../models/PronunciationData';

export interface LLPronunciationProps {
  data: LLPronunciationData[];
}
export interface LLPronunciationState {}
class LLPronunciation extends React.Component<LLPronunciationProps, LLPronunciationState> {
  state = {
    form_hidden: true
  }
  set_form_hidden(e: any, is_hidden : boolean) {
    e.preventDefault();
    this.setState({'form_hidden': is_hidden});
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
                <input type="text" className="form-control" id="language"/>
              </div>
              <div className="form-group">
                <label>Sound</label>
                <input type="text" className="form-control" id="sound"/>
              </div>
              <button className="btn btn-primary mr-2">Add</button>
              <button className="btn btn-secondary" onClick={(e) => this.set_form_hidden(e, true)}>Close</button>
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
                                  icon={val.get_icon()}>{val.get_sound()}</LLBorderCard>
          })}

          <div className="col-xl-4 col-md-6 mb-4">
            <a href="#" onClick={(e) => this.set_form_hidden(e, false)} className="btn btn-primary btn-icon-split">
              <span className="icon text-white-50">
                <i className="fas fa-plus-square"></i>
              </span>
              <span className="text">Add Pronunciation</span>
            </a>
          </div>
        </div>
        {form}
      </div>
    );
  }
}

export default LLPronunciation;
