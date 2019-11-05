import LLSoundData from './SoundData';

class LLPronunciationData {
  private sound: LLSoundData;
  constructor(language: string, sound: string, private icon: string = "fas fa-microphone-alt") {
    this.sound = new LLSoundData(language, sound);
  }
  public get_language() {
    return this.sound.get_language();
  }
  public get_icon() {
    return this.icon;
  }
  public get_sound() {
    return this.sound.get_sound();
  }
}

export default LLPronunciationData;
