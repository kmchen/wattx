import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { reducers } from './reducers/reducers';

import Form from './containers/Form';
import { fetchCryptoCurrencyThunk } from './thunk/thunk';

require('../asset/main.scss');

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(
	fetchCryptoCurrencyThunk()
);
  
const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={Form}/>
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('app')
);
