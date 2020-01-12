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
  on_resolve_aliases: (aliases: string[]) => Map<string, LLWordData>;
  on_alias_select: (word: LLWordData) => void;
}
export interface LLFlashcardState {}
 
class LLFlashcard extends React.Component<LLFlashcardProps, LLFlashcardState> {
  props_index: number = 0;
  review_index: number = 0;
  index: number = -1;
  props_words_keys: string[] = this.props.words_keys;
  review_words_keys: string[] = [];
  words_keys: string[] = this.props.words_keys;
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

  review_word() {
    if(!this.review_words_keys.includes(this.state.word!.get_key())) {
      this.review_words_keys.push(this.state.word!.get_key())
      this.setState(this.state)
    }
    return false;
  }

  remove_word_from_review() {
    if(this.review_words_keys.includes(this.state.word!.get_key())) {
      this.review_words_keys.splice(this.review_words_keys.indexOf(this.state.word!.get_key()), 1);
      if(this.review_words_keys.length === 0) {
        this.show_all_words();
      } else {
        this.show_review_words();
      }
    }
    return false;
  }

  show_all_words() {
    this.review_index = this.index;
    this.words_keys = this.props_words_keys;
    this.index = this.props_index % this.words_keys.length;
    this.props.on_show_word(this.words_keys[this.index], (word: LLWordData) => {
      this.new_word(word);
    });
    return false;
  }

  show_review_words() {
    if(this.review_words_keys.length !== 0) {
      this.props_index = this.index;
      this.words_keys = this.review_words_keys;
      this.index = this.props_index % this.words_keys.length;
      this.props.on_show_word(this.words_keys[this.index], (word: LLWordData) => {
        this.new_word(word);
      });
    }
    return false;
  }

  next() {
    if(this.words_keys.length > 0) {
      this.index = (this.index + 1) % this.words_keys.length;
      this.props.on_show_word(this.words_keys[this.index], (word: LLWordData) => {
        this.new_word(word);
      });
    }
    return false;
  }

  previous() {
    if(this.words_keys.length > 0) {
      this.index = (this.index + (this.words_keys.length - 1)) % this.words_keys.length;
      this.props.on_show_word(this.words_keys[this.index], (word: LLWordData) => {
        this.new_word(word);
      });
    }
    return false;
  }

  toggle_native() {
    this.setState({hide_native: !this.state.hide_native});
    return false;
  }

  toggle_pronunciation() {
    this.setState({hide_pronunciation: !this.state.hide_pronunciation});
    return false;
  }
  
  toggle_example() {
    this.setState({hide_example: !this.state.hide_example});
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
                on_resolve_aliases={this.props.on_resolve_aliases}
                on_word_select={this.props.on_alias_select}
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
          <LLTitle><i className="far fa-file-word"></i> <b>{this.state.word.get_word()}</b> 
            {this.words_keys === this.review_words_keys ? <small className="ml-2"><i>(Review)</i></small> : ""}
          </LLTitle>

          <div className="row">
            <div className="col-md-12 mb-4 text-right">
              <LLSplitButton 
                  theme="warning" 
                  icon="far fa-clock" 
                  extra_class="btn-sm"
                  on_click={() => {
                    return !this.review_words_keys.includes(this.state.word!.get_key()) ? 
                      this.review_word() : this.remove_word_from_review()
                  }}>
                {!this.review_words_keys.includes(this.state.word!.get_key()) ? 
                  "Mark for Review" : "Don't Review"}
              </LLSplitButton>
              <LLSplitButton 
                  theme="danger" 
                  icon="fas fa-bullseye" 
                  extra_class="btn-sm ml-2"
                  on_click={() => {
                    return this.words_keys === this.props_words_keys ? 
                      this.show_review_words() : this.show_all_words()
                  }}>
                {this.words_keys === this.props_words_keys ? 
                  "Show Words to Review" : "Show All Words"}
              </LLSplitButton>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-4">
              <LLSplitButton 
                  theme="info" 
                  icon="fas fa-eye" 
                  extra_class={this.state.word.get_natives().length === 0 ? "disabled" : ""}
                  on_click={() => this.toggle_native()}>
                {this.state.hide_native ? "Show" : "Hide"} Native Form
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
                  on_click={() => this.toggle_pronunciation()}>
                {this.state.hide_pronunciation ? "Show" : "Hide"} Pronunciation
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
                  on_click={() => this.toggle_example()}>
                {this.state.hide_example ? "Show" : "Hide"} Example
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
          <div className="col-md-2 mb-4 text-center">
            <LLSplitButton 
                theme="secondary" 
                icon="fas fa-arrow-left" 
                extra_class={btn_class}
                on_click={() => this.previous()}>
              Previous
            </LLSplitButton>
          </div>
          <div className="col-md-8 mb-4 text-center">
            {
              (this.index >= 0) ? 
              (this.index+1 + " / " + this.words_keys.length + " (" + 
                this.review_words_keys.length + " to review)") : 
              "Total words: " + this.words_keys.length
            }
          </div>
          <div className="col-md-2 mb-4 text-center">
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
