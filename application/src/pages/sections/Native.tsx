import * as React from 'react';
import {LLBorderCard} from '../../components/Card';
import LLWordData from '../../models/WordData';

export interface LLNativeProps {
  data: string[];
  on_resolve_aliases: (aliases: string[]) => Map<string, LLWordData>;
  on_word_select: (word: LLWordData) => void;
}
export interface LLNativeState {}
class LLNative extends React.Component<LLNativeProps, LLNativeState> {
  on_word_select(e: any, word: LLWordData) {
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
      result.forEach((word: LLWordData, key: string) => {
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
            let alias: string;
            if(part.startsWith("#") && result.has(alias = part.slice(1))) {
              let word = result.get(alias);
              return <a 
                  key={id} 
                  onClick={(e) => this.on_word_select(e, word!)} 
                  href="#/">{word!.get_word()}</a>
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
