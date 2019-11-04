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
  public get_sounds() {
    return this.sounds;
  }
}

export default LLExampleData;
