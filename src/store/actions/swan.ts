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

export const ADD_SWAN_METADATA = 'ADD_SWAN_METADATA';
export const ADD_SWAN_METADATA_FAIL = 'ADD_SWAN_METADATA_FAIL';
export const ADD_SWAN_METADATA_SUCCESS = 'ADD_SWAN_METADATA_SUCCESS';
export const ADD_SWAN_METADATA_CLEAR = 'ADD_SWAN_METADATA_CLEAR';

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
    payload: { getSwanTokenDetails: data }
  };
};

export const linkSwanWallet = (data) => {
  return {
    type: LINK_SWAN_WALLET,
    payload: { data },
  };
};

export const linkSwanWalletClear = (data) => {
  return {
    type: LINK_SWAN_WALLET_CLEAR,
    payload: { data },
  };
};

export const linkSwanWalletFail = (data) => {
  return {
    type: LINK_SWAN_WALLET_FAIL,
    payload: { data },
  };
};

export const linkSwanWalletSuccess = (data) => {
  return {
    type: LINK_SWAN_WALLET_SUCCESS,
    payload: { linkSwanWalletDetails: data },
  };
};

export const syncSwanWallet = (data) => {
  return {
    type: SYNC_SWAN_WALLET,
    payload: { data },
  };
};

export const syncSwanWalletClear = (data) => {
  return {
    type: SYNC_SWAN_WALLET_CLEAR,
    payload: { data },
  };
};

export const syncSwanWalletFail = (data) => {
  return {
    type: SYNC_SWAN_WALLET_FAIL,
    payload: { data },
  };
};

export const syncSwanWalletSuccess = (data) => {
  return {
    type: SYNC_SWAN_WALLET_SUCCESS,
    payload: { syncSwanWalletDetails: data },
  };
};

export const addSwanMetada = (data) => {
  return {
    type: ADD_SWAN_METADATA,
    payload: { data },
  };
};

export const addSwanMetadaClear = (data) => {
  return {
    type: ADD_SWAN_METADATA_CLEAR,
    payload: { data },
  };
};

export const addSwanMetadaFail = (data) => {
  return {
    type: ADD_SWAN_METADATA_FAIL,
    payload: { data },
  };
};

export const addSwanMetadaSuccess = (data) => {
  return {
    type: ADD_SWAN_METADATA_SUCCESS,
    payload: { addSwanMetadaDetails: data },
  };
};
