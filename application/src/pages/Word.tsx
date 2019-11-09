import * as React from 'react';

// Components
import LLTitle from '../components/Title';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

// Models
import LLWordData from '../models/WordData';
import LLExampleData from '../models/ExampleData';

export interface LLWordProps {
  word: LLWordData;
  onDelete: (word: LLWordData) => void;
  onEdit: (word: LLWordData) => void;
}
 
export interface LLWordState {}
 
class LLWord extends React.Component<LLWordProps, LLWordState> {
  state = {
    word: this.props.word
  }

  update_word() {
    this.setState(this.state);
    this.props.onEdit(this.state.word);
  }

  add_native_handler(form: string) {
    this.state.word.add_native(form);
    this.update_word();
  }

  delete_native_handler(id: number) {
    this.state.word.delete_native(id);
    this.update_word();
  }

  add_pronunciation_handler(language: string, sound: string) {
    this.state.word.add_pronunciation(language, sound);
    this.update_word();
  }

  delete_pronunciation_handler(id: number) {
    this.state.word.delete_pronunciation(id);
    this.update_word();
  }

  add_example_handler(sentence: string) {
    let example = new LLExampleData(sentence);
    this.state.word.add_example(example);
    this.update_word();
  }

  delete_example_handler(id: number) {
    this.state.word.delete_example(id);
    this.update_word();
  }

  update_example_handler() {
    this.update_word();
  }

  render() {
    return (
      <div className="m-2">
        <LLTitle><i className="far fa-file-word"></i> <b>{this.state.word.get_word()}</b></LLTitle>
        <LLNative
              on_add={(form) => this.add_native_handler(form)} 
              on_delete={(id) => this.delete_native_handler(id)} 
              data={this.state.word.get_natives()}/>
        <LLPronunciation  
              on_add={(language, sound) => this.add_pronunciation_handler(language, sound)} 
              on_delete={(id) => this.delete_pronunciation_handler(id)} 
              data={this.state.word.get_pronunciations()}/>
        <LLExample 
              on_add={(sentence) => this.add_example_handler(sentence)}
              on_delete={(id) => this.delete_example_handler(id)}
              onExampleUpdate={() => this.update_example_handler()}
              data={this.state.word.get_examples()}/>
        <div className="alert alert-warning" role="alert">
          Click "Delete" to remove the word
          <button className="btn btn-danger btn-sm float-right ml-2" onClick={() => {this.props.onDelete(this.state.word)}}>Delete</button>
        </div>
      </div>
    );
  }
}

export default LLWord;
