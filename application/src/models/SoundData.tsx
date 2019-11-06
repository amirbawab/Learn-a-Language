class LLSoundData {
  constructor(private language: string, private sound: string) {}
  public get_language() {
    return this.language;
  }
  public get_sound() {
    return this.sound;
  }
  public to_json() {
    return {language: this.language, sound: this.sound};
  }
}

export default LLSoundData;
