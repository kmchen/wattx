import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { data } from '../../data/data.js';
import { MarketOverviewContainer } from '../containers/MarketOverview';
import { LiquidityContainer } from '../containers/Liquidity';

configure({ adapter: new Adapter() });

const initialState = {};

describe('App component', () => {
	let MarketOverview;
	let Liquidity;
  
	const parsedData = data.data.reduce((acc, curr) => {
		const { price, volume_24h, percent_change_24h, market_cap }  = curr.quote.USD;
		acc.push({
			name: curr.name,
			rank: curr.cmc_rank,
			price,
			volume: volume_24h,
			priceChange: percent_change_24h,
			marketCap: market_cap
		});
		return acc; 
	}, []).sort((a, b) => a.rank - b.rank);

	beforeEach(() => {
		const props = {
	    data: parsedData,
			topList: 0
		};
		MarketOverview = shallow(<MarketOverviewContainer {...props} />);
		Liquidity = shallow(<LiquidityContainer {...props} />);
	});

	it('should render Market Overview component', () => {
		expect(MarketOverview).toMatchSnapshot();
	});
  
	it('should render Liquidity component', () => {
		expect(Liquidity).toMatchSnapshot();
	});
});
