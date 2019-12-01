import * as React from 'react';

// Components
import LLTitle from '../components/Title';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';
import LLReference from './sections/Reference';

// Models
import LLWordData from '../models/WordData';

export interface LLWordProps {
  word: LLWordData;
  on_resolve_aliases: (keys: string[]) => Map<string, string>;
  on_word_select: (alias: string) => void;
  word_from_alias: (alias: string) => LLWordData | null;
}
 
export interface LLWordState {}
 
class LLWord extends React.Component<LLWordProps, LLWordState> {
  state : {
    word: LLWordData,
    sub_word: LLWordData | null
  } = {
    word: this.props.word,
    sub_word: null
  }

  alias_select(alias: string) {
    let sub_word = this.props.word_from_alias(alias);
    if(sub_word !== null) {
      this.setState({sub_word: sub_word});
    }
  }

  close_sub_word(e: any) {
    e.preventDefault();
    this.setState({sub_word: null})
  }

  open_sub_word(e: any) {
    e.preventDefault();
    this.props.on_word_select(this.state.sub_word!.get_word());
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
    let sub_word = undefined;
    if(this.state.sub_word !== null) {
      sub_word = (
        <div className="border border-warning mb-4">
          <div className="row">
            <div className="col-md-6 text-center">
              <a href="#/" onClick={(e) => this.open_sub_word(e)}><i className="far fa-file-word m-2"></i>Open</a>
            </div>
            <div className="col-md-6 text-center">
              <a href="#/" onClick={(e) => this.close_sub_word(e)}><i className="fas fa-times m-2"></i>Close</a>
            </div>
          </div>
          <LLWord 
              key={this.state.sub_word.get_key()}
              word={this.state.sub_word!} 
              on_resolve_aliases={this.props.on_resolve_aliases} 
              on_word_select={this.props.on_word_select} 
              word_from_alias={this.props.word_from_alias} />
        </div>
      )
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
              on_alias_select={(alias: string) => this.alias_select(alias)}
              data={this.state.word.get_natives()}/>
        {sub_word}
        <LLPronunciation data={this.state.word.get_pronunciations()}/>
        <LLExample data={this.state.word.get_examples()}/>
        <LLReference on_word_select={this.props.on_word_select} word={this.state.word}/>
      </div>
    );
  }
}

export default LLWord;
