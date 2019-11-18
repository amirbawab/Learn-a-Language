import LLWordData from '../models/WordData';
import LLStaticData from '../data/StaticData';

class LLRemoteServer {
  private static_data: LLStaticData;
  private key_map_cache: Map<string, string> = new Map();
  constructor(private url: string, private port: string) {
    this.static_data = new LLStaticData();
    this.static_data.init_data();
  }

  get_url(...args: string[]) {
    let url = this.url + ":" + this.port;
    args.forEach((val) => {
      url += "/" + encodeURI(val);
    });
    return url;
  }
  is_read_only() {
    return false;
  }
  is_ok(callback: (success: boolean) => void) {
    fetch(this.get_url('ok'), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      callback(json.success || false);
    })
    .catch(() => {
      callback(false);
    });
  }
  get_words() : Map<string, LLWordData> {
    return this.static_data.get_words();
  }
  get_word(word: string) : LLWordData | null {
    return this.static_data.get_word(word)!;
  }
  get_word_string_from_key(key: string): string | null {
    if(this.key_map_cache.has(key)) {
      return this.key_map_cache.get(key)!;
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
  to_string() {
    return "URL: " + this.url + " and Port: " + this.port;
  }
}

export default LLRemoteServer;
