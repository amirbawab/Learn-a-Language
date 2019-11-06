import * as React from 'react';

// Components
import LLWordTitle from '../components/Title';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

// Models
import LLWordData from '../models/WordData';

export interface LLWordProps {
  word: LLWordData;
}
 
export interface LLWordState {}
 
class LLWord extends React.Component<LLWordProps, LLWordState> {
    state = {}
    render() {
      return (
        <div className="m-2">
          <div className="alert alert-warning" role="alert">
            Click "Save" after done editing 
            <button className="btn btn-primary btn-sm float-right ml-2">Save</button>
          </div>
          <LLWordTitle title={this.props.word.get_word()}/>
          <LLNative data={this.props.word.get_natives()}/>
          <LLPronunciation data={this.props.word.get_pronunciations()}/>
          <LLExample data={this.props.word.get_examples()}/>
          <div className="alert alert-warning" role="alert">
            Click "Delete" to remove the word
            <button className="btn btn-danger btn-sm float-right ml-2">Delete</button>
          </div>
        </div>
      );
    }
}

export default LLWord;
