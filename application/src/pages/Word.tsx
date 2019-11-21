import * as React from 'react';

// Components
import LLTitle from '../components/Title';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

// Models
import LLWordData from '../models/WordData';

export interface LLWordProps {
  word: LLWordData;
  on_resolve_aliases: (keys: string[]) => Map<string, string>;
  on_word_select: (word: string) => void;
}
 
export interface LLWordState {}
 
class LLWord extends React.Component<LLWordProps, LLWordState> {
  state = {
    word: this.props.word.clone(),
  }

  render() {
    let alias = undefined;
    if(this.state.word.get_alias() !== "") {
      alias = (
        <div>
          <small style={{fontSize:15}}className="text-secondary">
            <em>alias: {this.state.word.get_alias()}</em>
          </small>
        </div>
      );
    }
    return (
      <div className="m-2">
        <LLTitle>
          <div>
            <i className="far fa-file-word"></i> <b>{this.state.word.get_word()}</b>
          </div>
          {alias}
        </LLTitle>
        <LLNative
              on_resolve_aliases={this.props.on_resolve_aliases}
              on_word_select={this.props.on_word_select}
              data={this.state.word.get_natives()}/>
        <LLPronunciation data={this.state.word.get_pronunciations()}/>
        <LLExample data={this.state.word.get_examples()}/>
      </div>
    );
  }
}

export default LLWord;
