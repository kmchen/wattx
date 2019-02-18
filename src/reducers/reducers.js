import { SET_CRYPTO_CURRENCY_DATA, TOP_LIST } from '../actions/actions';

import { data } from '../../data/data';

const initialState = {
  topList: 0,
	data: []
};

export function reducers(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}
	switch(action.type) {
    case SET_CRYPTO_CURRENCY_DATA:
      return {...state, data: action.payload}
      //return Object.assign({}, state, {
        //data: action.payload
      //})
    case TOP_LIST:
      return {...state, topList: action.payload}
      //return Object.assign({}, state, {
        //topList: action.payload
      //})
	default:
		return state;
	}
}
