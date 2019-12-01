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
      if(this.word_alias_map.has(word.get_alias())) {
        console.warn("Duplicate alias", word.get_alias());
      }
      this.word_alias_map.set(word.get_alias(), word);
    }
  }
  private connect_words() {
    this.word_key_map.forEach((word_1: LLWordData) => {
      let alias = word_1.get_alias();
      if(alias !== "") {
        this.word_key_map.forEach((word_2: LLWordData) => {
          let natives = word_2.get_natives();
          for(let nid in natives) {
            if((new RegExp(".*#"+alias+"\\b.*")).test(natives[nid])) {
              word_1.add_referenced_by(word_2);
              break;
            }
          }
        });
      }
    })
  }
  init_data() {
    /* STATIC DATA */
    this.connect_words();
  }
}

export default LLStaticData;
