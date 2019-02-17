import { PUSH_SEARCH_RESULT } from '../actions/actions';

import { data } from '../../data/data';

const initialState = {
	histories: [],
	data: data.tours
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
