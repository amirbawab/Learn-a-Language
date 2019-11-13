import * as React from 'react';
import {LLBorderCard, LLBasicCard} from '../../components/Card';
import {LLSplitButton} from '../../components/Button';
import {LLOkCancelForm} from '../../components/Form';
import {LLLabelInput} from '../../components/Input';

export interface LLNativeProps {
  read_only: boolean;
  data: string[];
  on_add: (form : string) => void;
  on_delete: (index: number) => void;
  on_resolve_keys: (array: string[]) => Map<string, string>;
  on_word_select: (word: string) => void;
}
export interface LLNativeState {}
class LLNative extends React.Component<LLNativeProps, LLNativeState> {
  state = {
    form_hidden: true
  }
  set_form_hidden(is_hidden : boolean) {
    this.setState({'form_hidden': is_hidden});
    return false;
  }
  add_native() {
    let input = this.refs.native_form as LLLabelInput;
    this.props.on_add(input.value());
    this.set_form_hidden(true);
  }
  delete_native(e: any, id: number) {
    e.preventDefault();
    this.props.on_delete(id);
  }
  on_word_select(e: any, word: string) {
    e.preventDefault();
    this.props.on_word_select(word);
  }
  resolve_keys(val: string) {
    let regex = /(#\w{32})/g;
    let match = undefined;
    let md5_array = [];
    let html = <React.Fragment>{val}</React.Fragment>;

    // find all keys
    while((match = regex.exec(val))) {
      md5_array.push(match[0].slice(1));
    }
    // resolve them
    if(md5_array.length > 0) {
      let result = this.props.on_resolve_keys(md5_array);
      let regex_val = ""
      // build regex
      result.forEach((word: string, key: string) => {
        if(regex_val.length !== 0) {
          regex_val += "|";
        }
        regex_val += "#" + key;
      });
      // construct new html
      let split = val.split(new RegExp("("+regex_val+")", "g"));
      html = (
        <React.Fragment>
          {split.map((part: string, id) => {
            let slice: string;
            if(part.startsWith("#") && result.has(slice = part.slice(1))) {
              let word_of_key = String(result.get(slice));
              return <a 
                  key={id} 
                  onClick={(e) => this.on_word_select(e, word_of_key)} 
                  href="#/">{word_of_key}</a>
            }
            return <React.Fragment key={id}>{part}</React.Fragment>
          })}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {html}
      </React.Fragment>
    );
  }
  render() {
    let form = undefined;
    let delete_btn: any = () => {};
    let add_btn = undefined;
    if(!this.props.read_only) {
      // form
      if(!this.state.form_hidden) {
        form = (
          <div className="row">
            <div className="col-lg-12">
              <LLBasicCard>
                <LLOkCancelForm 
                    ok_name="Add" 
                    cancel_name="Close" 
                    on_ok={() => this.add_native()} 
                    on_cancel={() => this.set_form_hidden(true)}>
                  <LLLabelInput ref="native_form" label="Native Form"/>
                </LLOkCancelForm>
              </LLBasicCard>
            </div>
          </div>
        );
      }

      // delete button
      delete_btn = (id: number) => {
        return (
          <a href="#/" onClick={(e)=>{this.delete_native(e, id)}}>
            <div className={"text-xs font-weight-bold text-danger text-uppercase mt-2"}>DELETE</div>
          </a>
        );
      };
    
      // add button
      add_btn = (
        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <LLSplitButton theme="info" icon="fas fa-plus-square" on_click={() => this.set_form_hidden(false)}>
              Add Native Form
            </LLSplitButton>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          {this.props.data.map((val, id) => {
            return (
              <LLBorderCard  key={id} theme="info" title="Native form" icon="fas fa-language">
                {this.resolve_keys(val)}
                {delete_btn(id)}
              </LLBorderCard>
            );
          })}
        </div>
        {add_btn}
        {form}
      </div>
    );
  }
}

export default LLNative;
