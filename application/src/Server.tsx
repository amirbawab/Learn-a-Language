import LLWordData from './models/WordData';

export interface LLServer {
  get_words: (callback: (words: string[] | null) => void) => void;
  get_word: (word: string, callback: (word: LLWordData | null) => void) => void;
  remove_word: (word: string, callback: (success: boolean) => void) => void;
  set_word: (word: LLWordData, callback: (success: boolean) => void) => void;
  get_word_string_from_key: (key: string) => string | null;
  is_ok: (callback: (success: boolean) => void) => void;
  to_string() : string;
}

export class LLLocalServer implements LLServer {
  private data: Map<string, LLWordData> = new Map();
  is_ok(callback: (success: boolean) => void) {
    callback(true);
  }
  get_words(callback: (words: string[] | null) => void) {
    let result: string[] = [];
    this.data.forEach((word: LLWordData, key: string) => {
      result.push(word.get_word());
    });
    result.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    callback(result);
  }
  get_word(word: string, callback: (word: LLWordData | null) => void) {
    let encode_word = new LLWordData(word).get_md5();
    if(this.data.has(encode_word)) {
      callback(this.data.get(encode_word)!.clone());
    } else {
      callback(null);
    }
  }
  get_word_string_from_key(key: string): string | null {
    return this.data.has(key) ? this.data.get(key)!.get_word() : null;
  }
  remove_word(word: string, callback: (success: boolean) => void): void {
    let encode_word = new LLWordData(word).get_md5();
    if(this.data.has(encode_word)) {
      this.data.delete(encode_word);
      callback(true);
    } else {
      callback(false);
    }
  }
  set_word(word: LLWordData, callback: (success: boolean) => void): void {
    this.data.set(word.get_md5(), word);
    callback(true);
  }
  to_string() {
    return "Local Storage";
  }
}

export class LLRemoteServer implements LLServer {
  constructor(private url: string, private port: string) {}
  private key_map_cache: Map<string, string> = new Map();
  get_url(...args: string[]) {
    let url = this.url + ":" + this.port;
    args.forEach((val) => {
      url += "/" + encodeURI(val);
    });
    return url;
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
  get_words(callback: (words: (string[] | null)) => void) {
    fetch(this.get_url('words'), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      this.key_map_cache.clear();
      json.words.forEach((word: string) => {
        this.key_map_cache.set(new LLWordData(word).get_md5(), word);
      });
      callback(json.words);
    })
    .catch(() => {
      callback(null);
    });
  }
  get_word(word: string, callback: (word: LLWordData | null) => void) {
    fetch(this.get_url('word', 'view', word), {mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      callback(LLWordData.from_json(json));
    }).catch(() => {
      callback(null);
    });
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
