import * as React from 'react';
import LLPage from './Page';

// Components
import LLWordTitle from '../components/Title';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';

// Models
import LLWordData from '../models/WordData';
import LLPronunciationData from '../models/PronunciationData';

class LLWord extends LLPage {
    state = {}
    render() {
      let data = new LLWordData("Tea");
      data.add_pronunciations(new LLPronunciationData("English", "Chai"));
      data.add_pronunciations(new LLPronunciationData("Arabic", "تشاي"));

      return (
        <div className="m-2">
          <LLWordTitle title={data.get_word()}/>
          <LLPronunciation data={data.get_pronunciations()}/>
          <LLExample/>
        </div>
      );
    }
}

export default LLWord;
