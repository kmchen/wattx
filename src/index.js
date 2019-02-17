import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { reducers } from './reducers/reducers';

import Liquidity from './Liquidity';
import MarketOverview from './MarketOverview';

require('../asset/main.scss');

const store = createStore(reducers, composeWithDevTools());

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
	document.getElementById('create-article-form')
);
