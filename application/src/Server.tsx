import LLWordData from './models/WordData';
import LLExampleData from './models/ExampleData';

class LLServer {
  constructor(private url: string, private port: number) {}
  get_url(...args: string[]) {
    let url = this.url + ":" + this.port;
    args.map((val) => {
      url += "/" + encodeURI(val);
    });
    return url;
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
  set_word(word: LLWordData, callback: any) {
    fetch(this.get_url('word','set'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: word.get_word(),
        json_data: JSON.stringify(word.to_json()),
      })
    }).then(response => {
      console.log(response)
    })
  }
}

export default LLServer;
