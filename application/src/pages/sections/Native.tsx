import * as React from 'react';
import {LLBorderCard} from '../../components/Card';

export interface LLNativeProps {
  data: string[];
  on_resolve_aliases: (array: string[]) => Map<string, string>;
  on_word_select: (word: string) => void;
}
export interface LLNativeState {}
class LLNative extends React.Component<LLNativeProps, LLNativeState> {
  on_word_select(e: any, word: string) {
    e.preventDefault();
    this.props.on_word_select(word);
  }
  resolve_aliases(val: string) {
    let regex = /(#\w+)/g;
    let match = undefined;
    let alias_array = [];
    let html = <React.Fragment>{val}</React.Fragment>;

    // find all keys
    while((match = regex.exec(val))) {
      alias_array.push(match[0].slice(1));
    }
    // resolve them
    if(alias_array.length > 0) {
      let result = this.props.on_resolve_aliases(alias_array);
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
    return (
      <div>
        <div className="row">
          {this.props.data.map((val, id) => {
            return (
              <LLBorderCard  key={id} theme="info" title="Native form" icon="fas fa-language">
                {this.resolve_aliases(val)}
              </LLBorderCard>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LLNative;
