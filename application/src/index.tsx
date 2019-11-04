import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLWord from './pages/Word';

ReactDOM.render(<LLWord/>, document.getElementById('page-content'));

serviceWorker.unregister();
