import {
  GET_SWAN_TOKEN,
  GET_SWAN_TOKEN_FAIL,
  GET_SWAN_TOKEN_SUCCESS,
  GET_SWAN_TOKEN_CLEAR,
  
  LINK_SWAN_WALLET,
  LINK_SWAN_WALLET_FAIL,
  LINK_SWAN_WALLET_SUCCESS,
  LINK_SWAN_WALLET_CLEAR,
  
  SYNC_SWAN_WALLET,
  SYNC_SWAN_WALLET_FAIL,
  SYNC_SWAN_WALLET_SUCCESS,
  SYNC_SWAN_WALLET_CLEAR,
  
  ADD_SWAN_METADATA,
  ADD_SWAN_METADATA_FAIL,
  ADD_SWAN_METADATA_SUCCESS,
  ADD_SWAN_METADATA_CLEAR,
  getSwanTokenSuccess,
  linkSwanWalletClear,
} from '../actions/swan';

const INITIAL_STATE = {
  getSwanTokenRequest: false,
  getSwanTokenDetails: null,
  linkSwanWalletRequest: false,
  linkSwanWalletDetails: null,
  syncSwanWalletRequest: false,
  syncSwanWalletDetails: null,
  addSwanMetadaRequest: false,
  addSwanMetadaDetails: null,
  getSwanTokenFail: false,
  getSwanTokenFailMessage: null,
  linkSwanWalletFail: false,
  linkSwanWalletFailMessage: null,
  syncSwanWalletFail: false,
  syncSwanWalletFailMessage: null,
  addSwanMetadaFail: false,
  addSwanMetadaFailMessage: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SWAN_TOKEN_FAIL:
      console.log(
        'action.payload.getSwanTokenFailMessage',
        action.payload.getSwanTokenFail,
        action.payload.getSwanTokenFailMessage,
      );
      return {
        ...state,
        getSwanTokenRequest: false,
        getSwanTokenFail: action.payload.data.getSwanTokenFail,
        getSwanTokenFailMessage: action.payload.data.getSwanTokenFailMessage,
      };
    case GET_SWAN_TOKEN_SUCCESS:
      console.log(
        'payload.getSwanTokenDetails',
        action.payload.getSwanTokenDetails,
      );
      return {
        ...state,
        getSwanTokenRequest: false,
        getSwanTokenDetails: action.payload.getSwanTokenDetails,
      };
    case GET_SWAN_TOKEN_CLEAR:
      return {
        ...state,
        getSwanTokenRequest: false,
        getSwanTokenDetails: null,
      };
      case LINK_SWAN_WALLET_FAIL:
        console.log(
          'action.payload.linkSwanWalletFailMessage',
          action.payload.linkSwanWalletFail,
          action.payload.linkSwanWalletFailMessage,
        );
        return {
          ...state,
          linkSwanWalletRequest: false,
          linkSwanWalletFail: action.payload.linkSwanWalletFail,
          linkSwanWalletFailMessage: action.payload.linkSwanWalletFailMessage,
        };
      case LINK_SWAN_WALLET_SUCCESS:
        console.log(
          'payload.linkSwanWalletDetails',
          action.payload.linkSwanWalletDetails,
        );
        return {
          ...state,
          linkSwanWalletRequest: false,
          linkSwanWalletDetails: action.payload.linkSwanWalletDetails,
        };
      case linkSwanWalletClear:
        return {
          ...state,
          linkSwanWalletRequest: false,
          linkSwanWalletDetails: null,
        };
      
  }
};
export default reducer;
