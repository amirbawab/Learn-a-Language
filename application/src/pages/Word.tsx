import * as React from 'react';
import LLPage from './Page';

// Components
import LLWordTitle from '../components/Title';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

// Models
import LLWordData from '../models/WordData';
import LLPronunciationData from '../models/PronunciationData';
import LLExampleData from '../models/ExampleData';

class LLWord extends LLPage {
    state = {}
    render() {
      let data = new LLWordData("Tea");
      data.add_native("茶");
      data.add_pronunciation(new LLPronunciationData("English", "Chai"));
      data.add_pronunciation(new LLPronunciationData("Arabic", "تشاي"));

      let example = new LLExampleData("I want to drink tea");
      example.add_sound("English", "wo yao chai");
      example.add_sound("French", "wo yao tchay");
      data.add_example(example);
      data.add_example(example);

      return (
        <div className="m-2">
          <LLWordTitle title={data.get_word()}/>
          <LLNative data={data.get_natives()}/>
          <LLPronunciation data={data.get_pronunciations()}/>
          <LLExample data={data.get_examples()}/>
        </div>
      );
    }
}

export default LLWord;
