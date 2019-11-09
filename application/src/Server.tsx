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
    .then(json => callback(json.words))
    .catch(() => {
      callback(null);
    });
  }
  get_word(word: string, callback: any) {
    fetch(this.get_url('word', 'view', word), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      callback(LLWordData.from_json(json));
    }).catch(() => {
      callback(null);
    });
  }
  remove_word(word: string, callback: (success: boolean) => void) {
    fetch(this.get_url('word', 'remove', word), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      callback(json.success);
    }).catch(() => {
      callback(false);
    });
  }
  set_word(word: LLWordData, callback: (success: boolean) => void) {
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
    })
    .then(response => response.json())
    .then((json) => {
      callback(json.success);
    }).catch(() => {
      callback(false);
    });
  }
}

export default LLServer;
