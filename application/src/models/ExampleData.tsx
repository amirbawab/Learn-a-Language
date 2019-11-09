import LLSoundData from './SoundData';

class LLExampleData {
  private sounds: LLSoundData[] = [];
  constructor(private sentence: string) {}
  public get_sentence() {
    return this.sentence;
  }
  public add_sound(language: string, sound: string) {
    this.sounds.push(new LLSoundData(language, sound));
  }
  public delete_sound(id: number) {
    this.sounds.splice(id, 1);
  }
  public get_sounds() {
    return this.sounds;
  }
  public to_json() {
    let json: any = {};
    json.sentence = this.sentence;
    json.pronunciation = [];
    this.sounds.forEach((val) => {
      json.pronunciation.push(val.to_json());
    });
    return json;
  }
}

export default LLExampleData;
