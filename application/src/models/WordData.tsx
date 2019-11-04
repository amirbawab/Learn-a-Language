import LLPronunciationData from './PronunciationData';
import LLExampleData from './ExampleData';

class LLWordModel {
  private pronunciations: LLPronunciationData[] = [];
  private examples: LLExampleData[] = [];
  private native_form: string = "";
  constructor(private word: string) {}
  public add_pronunciation(pronunciation: LLPronunciationData) {
    this.pronunciations.push(pronunciation);
  }
  public get_pronunciations() {
    return this.pronunciations;
  }
  public add_example(example: LLExampleData) {
    this.examples.push(example);
  }
  public get_examples() {
    return this.examples;
  }
  public get_word() {
    return this.word;
  }
  public set_native(native_form: string) {
    this.native_form = native_form;
  }
  public get_native() {
    return this.native_form;
  }
}

export default LLWordModel;
