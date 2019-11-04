import LLPronunciationData from './PronunciationData';

class LLWordModel {
  private pronunciations: LLPronunciationData[] = [];
  constructor(private word: string) {}
  public add_pronunciations(pronunciation: LLPronunciationData) {
    this.pronunciations.push(pronunciation);
  }
  public get_pronunciations() {
    return this.pronunciations;
  }
  public get_word() {
    return this.word;
  }
}

export default LLWordModel;
