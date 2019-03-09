import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FormContainer from './containers/Form';

require('../asset/main.scss');


const Root = () => (
	<Router>
		<Route exact path="/" component={FormContainer}/>
	</Router>
);

ReactDOM.render(
	<Root />,
	document.getElementById('app')
);
