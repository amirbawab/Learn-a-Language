import * as React from 'react';
import LLTitle from '../components/Title';
import LLWordData from '../models/WordData';
import {LLBasicCard} from '../components/Card';
import {LLSplitButton} from '../components/Button';
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

export interface LLFlashcardProps {
  words_keys: string[];
  on_show_word: (word: string, callback: (word: LLWordData) => void) => void;
  on_resolve_keys: (keys: string[]) => Map<string, string>;
  on_word_select: (word: string) => void;
}
export interface LLFlashcardState {}
 
class LLFlashcard extends React.Component<LLFlashcardProps, LLFlashcardState> {
  index: number = -1;
  state: {
    word: LLWordData | null;
    hide_native: boolean;
    hide_pronunciation: boolean;
    hide_example: boolean;
  } = {
    word: null,
    hide_native: true,
    hide_pronunciation: true,
    hide_example: true
  }

  new_word(word: LLWordData) {
    this.setState({
      word: word,
      hide_native: true,
      hide_pronunciation: true,
      hide_example: true
    });
  }

  next() {
    if(this.props.words_keys.length > 0) {
      this.index = (this.index + 1) % this.props.words_keys.length;
      console.log(this.index);
      this.props.on_show_word(this.props.words_keys[this.index], (word: LLWordData) => {
        this.new_word(word);
      });
    }
    return false;
  }

  previous() {
    if(this.props.words_keys.length > 0) {
      this.index = (this.index + (this.props.words_keys.length - 1)) % this.props.words_keys.length;
      console.log(this.index);
      this.props.on_show_word(this.props.words_keys[this.index], (word: LLWordData) => {
        this.new_word(word);
      });
    }
    return false;
  }

  show_native() {
    this.setState({hide_native: false});
    return false;
  }

  show_pronunciation() {
    this.setState({hide_pronunciation: false});
    return false;
  }
  
  show_example() {
    this.setState({hide_example: false});
    return false;
  }

  render() {
    let btn_class = "";
    let main_page = undefined;
    if(this.state.word === null) {
      btn_class = "disabled";
      main_page = (
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <div className="col-xl-12 col-md-12 mb-4 text-center">
                <div className="mb-4">Click "Start" to begin the Flashcard exercise</div>
                <LLSplitButton theme="secondary" icon="fas fa-play" on_click={() => this.next()}>
                  Start
                </LLSplitButton>
              </div>
            </LLBasicCard>
          </div>
        </div>
      );
    } else {

      let native_section = undefined;
      let pronunciation_section = undefined;
      let example_section = undefined;
      if(!this.state.hide_native) {
        native_section = (
          <LLNative
                on_resolve_keys={this.props.on_resolve_keys}
                on_word_select={this.props.on_word_select}
                data={this.state.word.get_natives()}/>
        );
      }

      if(!this.state.hide_pronunciation) {
        pronunciation_section = <LLPronunciation data={this.state.word.get_pronunciations()}/>; 
      }

      if(!this.state.hide_example) {
        example_section = <LLExample data={this.state.word.get_examples()}/>;
      }

      main_page = (
        <React.Fragment>
          <LLTitle><i className="far fa-file-word"></i> <b>{this.state.word.get_word()}</b></LLTitle>
          <div className="row">
            <div className="col-lg-12 mb-4">
              <LLSplitButton 
                  theme="info" 
                  icon="fas fa-eye" 
                  extra_class={this.state.word.get_natives().length === 0 ? "disabled" : ""}
                  on_click={() => this.show_native()}>
                Show Native Form
              </LLSplitButton>
            </div>
          </div>
          {native_section}

          <div className="row">
            <div className="col-lg-12 mb-4">
              <LLSplitButton 
                  theme="success" 
                  icon="fas fa-eye" 
                  extra_class={this.state.word.get_pronunciations().length === 0 ? "disabled" : ""}
                  on_click={() => this.show_pronunciation()}>
                Show Pronunciation
              </LLSplitButton>
            </div>
          </div>
          {pronunciation_section}

          <div className="row">
            <div className="col-lg-12 mb-4">
              <LLSplitButton 
                  theme="primary" 
                  icon="fas fa-eye" 
                  extra_class={this.state.word.get_examples().length === 0 ? "disabled" : ""}
                  on_click={() => this.show_example()}>
                Show Example
              </LLSplitButton>
            </div>
          </div>
          {example_section}
        </React.Fragment>
      );
    }

    return (
      <div className="m-2">
        <LLTitle><i className="far afa-file-word"></i> <b>Flashcard</b></LLTitle>
        <div className="row">
          <div className="col-md-4 mb-4">
            <LLSplitButton 
                theme="secondary" 
                icon="fas fa-arrow-left" 
                extra_class={btn_class}
                on_click={() => this.previous()}>
              Previous
            </LLSplitButton>
          </div>
          <div className="col-md-4 mb-4 text-center">
            {
              (this.index >= 0) ? 
              (this.index+1 + " / " + this.props.words_keys.length) : 
              "Total words: " + this.props.words_keys.length
            }
          </div>
          <div className="col-md-4 mb-4 text-right">
            <LLSplitButton 
                theme="secondary" 
                icon="fas fa-arrow-right" 
                extra_class={btn_class}
                on_click={() => this.next()}>
              Next
            </LLSplitButton>
          </div>
        </div>
        {main_page}
      </div>
    );
  }
}

export default LLFlashcard;
