import * as marketActions from './marketActions';

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case marketActions.GET_HOLDINGS_BEGIN:
    case marketActions.GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.holdings,
      };
    case marketActions.GET_HOLDINGS_FAILURE:
    case marketActions.GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case marketActions.GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload.coins,
      };
    default:
      return state;
  }
};

export default marketReducer;
