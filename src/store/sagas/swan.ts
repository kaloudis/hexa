import { call, put } from 'redux-saga/effects';

import {
  accountSyncSuccess,
  accountSyncFail,
  getQuoteSuccess,
  getQuoteFail,
  executeOrderSuccess,
  executeOrderFail,
  getBalancesSuccess,
  getBalancesFail,
  ACCOUNT_SYNC,
  GET_QUOTE,
  EXECUTE_ORDER,
  GET_BALANCES,
} from '../actions/fbtc';

import {
  GET_SWAN_TOKEN,
  getSwanTokenSuccess,
  getSwanTokenFail,
  LINK_SWAN_WALLET,
  linkSwanWalletSuccess,
  linkSwanWalletFail
} from '../actions/swan'
