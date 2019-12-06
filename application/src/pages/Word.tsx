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
  on_resolve_aliases: (aliases: string[]) => Map<string, LLWordData>;
  on_word_select: (key: string) => void;
  word_from_alias: (alias: string) => LLWordData | null;
}
 
export interface LLWordState {}
 
class LLWord extends React.Component<LLWordProps, LLWordState> {
  state : {
    word: LLWordData,
    native_sub_word: LLWordData | null,
    ref_sub_word: LLWordData | null
  } = {
    word: this.props.word,
    native_sub_word: null,
    ref_sub_word: null,
  }

  alias_select(word: LLWordData) {
    this.setState({native_sub_word: word});
  }

  ref_select(word: LLWordData) {
    this.setState({ref_sub_word: word});
  }

  close_native_sub_word(that: any, e: any) {
    e.preventDefault();
    that.setState({native_sub_word: null})
  }

  open_native_sub_word(that: any, e: any) {
    e.preventDefault();
    that.props.on_word_select(that.state.native_sub_word!.get_key());
  }

  close_ref_sub_word(that: any, e: any) {
    e.preventDefault();
    that.setState({ref_sub_word: null})
  }

  open_ref_sub_word(that: any, e: any) {
    e.preventDefault();
    that.props.on_word_select(that.state.ref_sub_word!.get_key());
  }

  sub_word_window(sub_word: LLWordData | null, open: any, close: any, theme: string) {
    if(sub_word === null) {
      return undefined;
    }
    return (
      <div className={"border border-" + theme + " mb-4"}>
        <div className="row">
          <div className="col-md-6 text-center">
            <a href="#/" onClick={(e) => open(this, e)}><i className="far fa-file-word m-2"></i>Open</a>
          </div>
          <div className="col-md-6 text-center">
            <a href="#/" onClick={(e) => close(this, e)}><i className="fas fa-times m-2"></i>Close</a>
          </div>
        </div>
        <LLWord 
            key={sub_word.get_key()}
            word={sub_word!} 
            on_resolve_aliases={this.props.on_resolve_aliases} 
            on_word_select={this.props.on_word_select} 
            word_from_alias={this.props.word_from_alias} />
      </div>
    );
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
              on_word_select={(word) => this.alias_select(word)}
              data={this.state.word.get_natives()}/>
        {this.sub_word_window(this.state.native_sub_word, this.open_native_sub_word, this.close_native_sub_word, "info")}
        <LLPronunciation data={this.state.word.get_pronunciations()}/>
        <LLExample data={this.state.word.get_examples()}/>
        <LLReference 
              on_word_select={(word) => this.ref_select(word)} 
              word={this.state.word}/>
        {this.sub_word_window(this.state.ref_sub_word, this.open_ref_sub_word, this.close_ref_sub_word, "warning")}
      </div>
    );
  }
}

export default LLWord;
