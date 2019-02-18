import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { reducers } from './reducers/reducers';

import Liquidity from './containers/Liquidity';
import MarketOverview from './containers/MarketOverview';

require('../asset/main.scss');

const store = createStore(reducers, composeWithDevTools());

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={Liquidity}/>
				<Route exact path="/liquidity" component={MarketOverview}/>
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('app')
);
