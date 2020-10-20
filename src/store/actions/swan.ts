export const GET_SWAN_TOKEN = 'GET_SWAN_TOKEN';
export const GET_SWAN_TOKEN_FAIL = 'GET_SWAN_TOKEN_FAIL';
export const GET_SWAN_TOKEN_SUCCESS = 'GET_SWAN_TOKEN_SUCCESS';
export const GET_SWAN_TOKEN_CLEAR = 'GET_SWAN_TOKEN_CLEAR';

export const LINK_SWAN_WALLET = 'LINK_SWAN_WALLET';
export const LINK_SWAN_WALLET_FAIL = 'LINK_SWAN_WALLET_FAIL';
export const LINK_SWAN_WALLET_SUCCESS = 'LINK_SWAN_WALLET_SUCCESS';
export const LINK_SWAN_WALLET_CLEAR = 'LINK_SWAN_WALLET_CLEAR';

export const SYNC_SWAN_WALLET = 'SYNC_SWAN_WALLET_WALLET';
export const SYNC_SWAN_WALLET_FAIL = 'SYNC_SWAN_WALLET_FAIL';
export const SYNC_SWAN_WALLET_SUCCESS = 'SYNC_SWAN_WALLET_SUCCESS';
export const SYNC_SWAN_WALLET_CLEAR = 'SYNC_SWAN_WALLET_CLEAR';

export const getSwanToken = (data) => {
  return {
    type: GET_SWAN_TOKEN,
    payload: { data },
  };
};

export const getSwanTokenClear = () => {
  return { type: GET_SWAN_TOKEN_CLEAR };
};

export const getSwanTokenFail = data => {
  return {
    type: GET_SWAN_TOKEN_FAIL,
    payload: { data },
  };
};

export const getSwanTokenSuccess = (data) => {
  return {type: GET_SWAN_TOKEN_SUCCESS,
    payload: { data }
  };
};
