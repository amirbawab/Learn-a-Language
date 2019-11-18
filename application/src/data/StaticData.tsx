import LLWordData from '../models/WordData';
const md5 = require('md5');

class LLStaticData {
  private words: Map<string,LLWordData> = new Map<string, LLWordData>();
  get_words() {
    return this.words;
  }
  get_word(word: string) {
    return this.get_word_by_key(md5(word));
  }
  get_word_by_key(key: string) {
    if(this.words.has(key)) {
      return this.words.get(key)!;
    }
    return null;
  }
  init_data() {
    let tea = new LLWordData("Tea");
    tea.add_native("茶");
    tea.add_pronunciation("english", "chai");
    this.words.set(tea.get_md5(), tea);
  }
}

export default LLStaticData;
