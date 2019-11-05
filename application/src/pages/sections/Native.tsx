import * as React from 'react';
import {LLBorderCard, LLBasicCard} from '../../components/Card';

export interface LLNativeProps {
  data: string[];
}
export interface LLNativeState {}
class LLNative extends React.Component<LLNativeProps, LLNativeState> {
  state = {
    form_hidden: true,
  }
  set_form_hidden(is_hidden : boolean) {
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
                <label>Native Form</label>
                <input type="text" className="form-control" id="native"/>
              </div>
              <button className="btn btn-primary mr-2">Save</button>
              <button className="btn btn-secondary" onClick={() => this.set_form_hidden(true)}>Close</button>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          {this.props.data.map((val, id) => {
            return <LLBorderCard  key={id} title="Native form" icon="fas fa-language">{val}</LLBorderCard>
          })}

          <div className="col-xl-4 col-md-6 mt-4">
            <a href="#" onClick={() => this.set_form_hidden(false)} className="btn btn-primary btn-icon-split">
              <span className="icon text-white-50">
                <i className="fas fa-plus-square"></i>
              </span>
              <span className="text">Add Native Form</span>
            </a>
          </div>
        </div>
        {form}
      </div>
    );
  }
}

export default LLNative;
