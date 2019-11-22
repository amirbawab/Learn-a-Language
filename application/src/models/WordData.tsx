import LLExampleData from './ExampleData';
import LLSoundData from './SoundData';
import {md5} from '../Common';

class LLWordData {
  private pronunciations: LLSoundData[] = [];
  private examples: LLExampleData[] = [];
  private natives: string[] = [];
  private word: string;
  private alias: string;
  private referenced_by: LLWordData[] = [];
  constructor(word: string, alias: string = "") {
    this.word = word;
    this.alias = alias.match("^\\w+$") ? alias : "";
  }
  public add_pronunciation(language: string, sound: string) {
    this.pronunciations.push(new LLSoundData(language, sound));
  }
  public delete_pronunciation(id: number) {
    this.pronunciations.splice(id, 1);
  }
  public get_pronunciations() {
    return this.pronunciations;
  }
  public add_example(example: LLExampleData) {
    this.examples.push(example);
  }
  public delete_example(id: number) {
    this.examples.splice(id, 1);
  }
  public get_examples() {
    return this.examples;
  }
  public get_word() {
    return this.word;
  }
  public get_alias() {
    return this.alias;
  }
  public get_key() {
    return md5(this.get_word());
  }
  public add_native(native_form: string) {
    this.natives.push(native_form);
  }
  public delete_native(id: number) {
    this.natives.splice(id, 1);
  }
  public get_natives() {
    return this.natives;
  }
  public add_referenced_by(word: LLWordData) {
    this.referenced_by.push(word);
  }
  public get_referenced_by() {
    return this.referenced_by;
  }
  public static from_json(json: any) {
    let word_data = new LLWordData(json.word, json.alias);
    json.native_form.forEach((val: string) => {
      word_data.add_native(val);
    });
    json.pronunciation.forEach((val: any) => {
      word_data.add_pronunciation(val.language, val.sound);
    });
    json.example.forEach((val: any) => {
      let example = new LLExampleData(val.sentence);
      val.pronunciation.forEach((pval: any) => {
        example.add_sound(pval.language, pval.sound);
      });
      word_data.add_example(example);
    });
    return word_data;
  }
  public to_json() {
    let json : any = {};
    json.word = this.word;
    json.alias = this.alias;
    json.native_form = [];
    this.natives.forEach((val: string) => {
      json.native_form.push(val);
    });
    json.example = [];
    this.examples.forEach((val: LLExampleData) => {
      json.example.push(val.to_json());
    });
    json.pronunciation = [];
    this.pronunciations.forEach((val: LLSoundData) => {
      json.pronunciation.push(val.to_json());
    });
    return json;
  }
  public clone() {
    return LLWordData.from_json(this.to_json());
  }
}

export default LLWordData;
