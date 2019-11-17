import LLWordData from '../models/WordData';
import {LLServer} from './Server';

class LLLocalServer implements LLServer {
  private data: Map<string, LLWordData> = new Map();
  is_read_only() {
    return false;
  }
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

export default LLLocalServer;
