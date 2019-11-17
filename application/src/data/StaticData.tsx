import LLWordData from '../models/WordData';

class LLStaticData {
  words: LLWordData[] = [];
  init_data() {
    let tea = new LLWordData("Tea");
    this.words.push(tea);
  }
}

export default LLStaticData;
