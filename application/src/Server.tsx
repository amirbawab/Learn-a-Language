import LLWordData from './models/WordData';

class LLServer {
  constructor(private url: string, private port: string) {}
  key_map_cache: Map<string, string> = new Map();
  set_url(url: string, port: string) {
    this.url = url;
    this.port = port;
  }
  get_url(...args: string[]) {
    let url = this.url + ":" + this.port;
    args.forEach((val) => {
      url += "/" + encodeURI(val);
    });
    return url;
  }
  get_words(callback: any) {
    fetch(this.get_url('words'), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      json.words.forEach((word: string) => {
        this.key_map_cache.set(new LLWordData(word).get_md5(), word);
      });
      callback(json.words);
    })
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
  get_word_string_from_key(key: string) {
    if(this.key_map_cache.has(key)) {
      return this.key_map_cache.get(key);
    }
    return null;
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
