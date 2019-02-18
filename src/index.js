import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { reducers } from './reducers/reducers';
import thunk from 'redux-thunk';

import Liquidity from './containers/Liquidity';
import MarketOverview from './containers/MarketOverview';
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
				<Route exact path="/" component={MarketOverview}/>
				<Route exact path="/liquidity" component={Liquidity}/>
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('app')
);
