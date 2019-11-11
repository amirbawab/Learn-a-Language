import * as React from 'react';
import LLTitle from '../components/Title';
import LLWordData from '../models/WordData';
import {LLBasicCard} from '../components/Card';
import {LLSplitButton} from '../components/Button';
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

export interface LLFlashcardProps {
  words: string[];
  on_show_word: (word: string, callback: (word: LLWordData) => void) => void;
}
export interface LLFlashcardState {}
 
class LLFlashcard extends React.Component<LLFlashcardProps, LLFlashcardState> {
  index: number = 0;
  state: {word: LLWordData | null} = {
    word: null
  }

  next() {
    if(this.props.words.length > 0) {
      this.props.on_show_word(this.props.words[this.index++], (word: LLWordData) => {
        this.setState({word: word});
      });
      this.index %= this.props.words.length;
    }
    return false;
  }

  previous() {
    if(this.props.words.length > 0) {
      this.props.on_show_word(this.props.words[this.index--], (word: LLWordData) => {
        this.setState({word: word});
      });
      if(this.index === -1) {
        this.index = this.props.words.length - 1;
      }
    }
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
                <LLSplitButton theme="primary" icon="fas fa-play" on_click={() => this.next()}>
                  Start
                </LLSplitButton>
              </div>
            </LLBasicCard>
          </div>
        </div>
      );
    } else {
      main_page = (
        <React.Fragment>
          <LLTitle><i className="far fa-file-word"></i> <b>{this.state.word.get_word()}</b></LLTitle>
          <LLNative
                read_only={true}
                on_add={() => {}} 
                on_delete={() => {}} 
                data={this.state.word.get_natives()}/>
        <LLPronunciation  
              read_only={true}
              on_add={() => {}} 
              on_delete={() => {}} 
              data={this.state.word.get_pronunciations()}/>
        <LLExample 
              read_only={true}
              on_add={() => {}}
              on_delete={() => {}}
              onExampleUpdate={() => {}}
              data={this.state.word.get_examples()}/>
        </React.Fragment>
      );
    }

    return (
      <div className="m-2">
        <LLTitle><i className="far afa-file-word"></i> <b>Flashcard</b></LLTitle>
        <div className="row">
          <div className="col-xl-6 col-md-6 mb-4">
            <LLSplitButton 
                theme="primary" 
                icon="fas fa-arrow-left" 
                extra_class={btn_class}
                on_click={() => this.previous()}>
              Previous
            </LLSplitButton>
          </div>
          <div className="col-xl-6 col-md-6 mb-4 text-right">
            <LLSplitButton 
                theme="primary" 
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
