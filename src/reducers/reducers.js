import { PUSH_SEARCH_RESULT } from '../actions/actions';

import { data } from '../../data/data';

const initialState = {
	histories: [],
	data: data.data.reduce((acc, curr) => {
    const { price, volume_24h, percent_change_24h, market_cap }  = curr.quote.USD;
    acc.push({
      name: curr.name,
      price,
      volume: volume_24h,
      priceChange: percent_change_24h,
      marketCap: market_cap
    })
    return acc; 
  }, [])
};

export function reducers(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}
	switch(action.type) {
	case PUSH_SEARCH_RESULT:
		state.histories.unshift(action.payload);
		return state;
	default:
		return state;
	}
}
