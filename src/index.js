import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App.jsx';
import { reducers } from './reducers/reducers.js';

require('../asset/main.scss');

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
		<App />,
	</Provider>,
	document.getElementById('create-article-form')
);
