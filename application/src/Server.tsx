import LLWordData from './models/WordData';
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
      callback(LLWordData.from_json(json));
    });
  }
}

export default LLServer;
