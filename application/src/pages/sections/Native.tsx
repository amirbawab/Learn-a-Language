import * as React from 'react';
import {LLBorderCard, LLBasicCard} from '../../components/Card';

export interface LLNativeProps {
  data: string[];
  onAdd: (form : string) => void;
}
export interface LLNativeState {}
class LLNative extends React.Component<LLNativeProps, LLNativeState> {
  state = {
    form_hidden: true,
  }
  set_form_hidden(e: any, is_hidden : boolean) {
    e.preventDefault();
    this.setState({'form_hidden': is_hidden});
  }
  add_native() {
    let input = this.refs.native_form as HTMLInputElement;
    this.props.onAdd(input.value);
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
                <input type="text" className="form-control" ref="native_form"/>
              </div>
              <button className="btn btn-primary mr-2" onClick={(e) => this.add_native()}>Add</button>
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
            return <LLBorderCard  key={id} title="Native form" icon="fas fa-language">{val}</LLBorderCard>
          })}

          <div className="col-xl-4 col-md-6 mb-4">
            <a href="#" onClick={(e) => this.set_form_hidden(e, false)} className="btn btn-primary btn-icon-split">
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
