import React from 'react';
import { shallow, configure } from 'enzyme';
import { AppComponent } from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { data } from '../../data/data.js';

configure({ adapter: new Adapter() });

describe('App component', () => {
	let appComponent;
  
	beforeEach(() => {
		const props = {
			pushSearchResults: jest.fn(),
	    data: data.tours,
			histories: []
		};
		appComponent = shallow(<AppComponent {...props} />);
	});

	it('should render App component', () => {
		expect(appComponent).toMatchSnapshot();
	});
  
	it('should dislay special offers for the first time', () => {
		const specialOffers = appComponent.state('results');
		specialOffers.forEach(offer => {
			expect(offer.isSpecialOffer).toBeTruthy();
		});
	});
});
