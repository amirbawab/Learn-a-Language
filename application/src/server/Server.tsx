import LLWordData from '../models/WordData';

export interface LLServer {
  is_read_only: () => boolean;
  get_words: (callback: (words: string[] | null) => void) => void;
  get_word: (word: string, callback: (word: LLWordData | null) => void) => void;
  remove_word: (word: string, callback: (success: boolean) => void) => void;
  set_word: (word: LLWordData, callback: (success: boolean) => void) => void;
  get_word_string_from_key: (key: string) => string | null;
  is_ok: (callback: (success: boolean) => void) => void;
  to_string() : string;
}
