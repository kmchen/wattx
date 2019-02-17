import { TOP_LIST } from '../actions/actions';

import { data } from '../../data/data';

const initialState = {
  topList: 0,
	data: data.data.reduce((acc, curr) => {
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
	}, []).sort((a, b) => a.rank - b.rank)
};

export function reducers(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}
	switch(action.type) {
    case TOP_LIST:
      return Object.assign({}, state, {
        topList: action.payload
      })
	default:
		return state;
	}
}
