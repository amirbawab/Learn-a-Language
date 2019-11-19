import LLWordData from '../models/WordData';
import LLStaticData from '../data/StaticData';

class LLRemoteServer {
  private static_data: LLStaticData;
  private last_connected_check = false;
  constructor(private url: string | null, private port: string | null) {
    this.static_data = new LLStaticData();
    this.static_data.init_data();
  }

  private valid_url() {
    return this.url !== null && this.port !== null;
  }

  private make_url(...args: string[]) {
    let url = this.url + ":" + this.port;
    args.forEach((val) => {
      url += "/" + encodeURI(val);
    });
    return url;
  }

  public get_url() {
    return this.url;
  }

  public get_port() {
    return this.port;
  }

  public get_words() {
    return this.static_data.get_words();
  }
  
  public get_word(word: string) : LLWordData | null {
    return this.static_data.get_word(word)!;
  }
  
  public get_word_by_key(key: string): LLWordData | null {
    return this.static_data.get_word_by_key(key);
  }

  public was_ok() {
    return this.last_connected_check;
  }

  public to_string() {
    return "URL: " + this.get_url() + " PORT: " + this.get_port();
  }

  public is_ok(callback: () => void) {
    if(!this.valid_url()) {
      this.last_connected_check = false;
      callback();
      return;
    }
    fetch(this.make_url('ok'), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      this.last_connected_check = json.success || false;
      callback();
    })
    .catch(() => {
      this.last_connected_check = false;
      callback();
    });
  }
  
  public remove_word(word: string, callback: (success: boolean) => void) {
    if(!this.valid_url()) {
      callback(false);
      return;
    }
    fetch(this.make_url('word', 'remove', word), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      callback(json.success);
    }).catch(() => {
      callback(false);
    });
  }
  
  public set_word(word: LLWordData, callback: (success: boolean) => void) {
    if(!this.valid_url()) {
      callback(false);
      return;
    }
    fetch(this.make_url('word','set'), {
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
      let success_val = json.success || false;
      if(success_val) {
        this.static_data.add_word(word);
      }
      callback(success_val);
    }).catch(() => {
      callback(false);
    });
  }
}

export default LLRemoteServer;
