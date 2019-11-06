import LLWordData from './models/WordData';
import LLPronunciationData from './models/PronunciationData';
import LLExampleData from './models/ExampleData';

class LLServer {
  constructor(private url: string, private port: number) {}
  get_url(...args: string[]) {
    return this.url + ":" + this.port + "/" + args.join("/");
  }
  get_words(callback: any) {
    fetch(this.get_url('words'), {mode: 'cors'})
    .then(response => response.json())
    .then(json => callback(json.words));
  }
  get_word(word: string, callback: any) {
    fetch(this.get_url('word', 'view', word), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      let word_data = new LLWordData(json.word);

      // Native formats
      json.native_form.map((val: string) => {
        word_data.add_native(val);
      });

      // Pronunciation
      json.pronunciation.map((val: any) => {
        word_data.add_pronunciation(new LLPronunciationData(val.language, val.sound));
      });

      // Examples
      json.example.map((val: any) => {
        let example = new LLExampleData(val.sentence);
        val.pronunciation.map((pval: any) => {
          example.add_sound(pval.language, pval.sound);
        });
        word_data.add_example(example);
      });

      // Pass word
      callback(word_data);
    });
  }
}

export default LLServer;
