import LLExampleData from './ExampleData';
import LLSoundData from './SoundData';

class LLWordData {
  private pronunciations: LLSoundData[] = [];
  private examples: LLExampleData[] = [];
  private natives: string[] = [];
  constructor(private word: string) {}
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
  public add_native(native_form: string) {
    this.natives.push(native_form);
  }
  public delete_native(id: number) {
    this.natives.splice(id, 1);
  }
  public get_natives() {
    return this.natives;
  }
  public static from_json(json: any) {
    let word_data = new LLWordData(json.word);

    json.native_form.map((val: string) => {
      word_data.add_native(val);
    });
    json.pronunciation.map((val: any) => {
      word_data.add_pronunciation(val.language, val.sound);
    });
    json.example.map((val: any) => {
      let example = new LLExampleData(val.sentence);
      val.pronunciation.map((pval: any) => {
        example.add_sound(pval.language, pval.sound);
      });
      word_data.add_example(example);
    });
    
    return word_data;
  }
  public to_json() {
    let json : any = {};
    json.word = this.word;
    json.native_form = [];
    this.natives.map((val: string) => {
      json.native_form.push(val);
    });
    json.example = [];
    this.examples.map((val: LLExampleData) => {
      json.example.push(val.to_json());
    });
    json.pronunciation = [];
    this.pronunciations.map((val: LLSoundData) => {
      json.pronunciation.push(val.to_json());
    });
    return json;
  }
}

export default LLWordData;
