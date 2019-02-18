import axios from "axios";

import { SET_CRYPTO_CURRENCY_DATA } from "../actions/actions";

const fetchCryptoCurrency = () => {
  return axios.get('/data');
}

export const fetchCryptoCurrencyThunk = () => {
  return dispatch => {
    return fetchCryptoCurrency().then(
      resp => dispatch({type: SET_CRYPTO_CURRENCY_DATA, payload: resp.data})
    );
  };
}
