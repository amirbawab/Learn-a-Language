import LLWordData from '../models/WordData';

class LLStaticData {
  private word_key_map = new Map<string, LLWordData>();
  private word_alias_map = new Map<string, LLWordData>();
  get_words() {
    return this.word_key_map;
  }
  get_word(word: string) {
    let dummy = new LLWordData(word, undefined);
    return this.get_word_by_key(dummy.get_key());
  }
  get_word_by_key(key: string) {
    if(this.word_key_map.has(key)) {
      return this.word_key_map.get(key)!;
    }
    return null;
  }
  get_word_by_alias(alias: string) {
    if(this.word_alias_map.has(alias)) {
      return this.word_alias_map.get(alias)!;
    }
    return null;
  }
  private add_word(word: LLWordData) {
    this.word_key_map.set(word.get_key(), word);
    if(word.get_alias() !== "") {
      this.word_alias_map.set(word.get_alias(), word);
    }
  }
  init_data() {
    /* STATIC DATA */
  }
}

export default LLStaticData;
