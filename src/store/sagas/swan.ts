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
  linkSwanWalletFail,
} from '../actions/swan';

import {
  getSwanAuthToken,
  linkSwanWallet,
  syncSwanWallet,
} from '../../services/swan';

import { accountSync, getQuote, executeOrder } from '../../services/fbtc';

import { createWatcher } from '../utils/utilities';

export function* accountSyncWorker({ payload }) {
  console.log('payload', payload.data);
  try {
    let result = yield call(accountSync, payload.data);
    //   let result = {
    //     "data":{
    //     "redeem_vouchers": true,
    //       "exchange_balances": true,
    //       "sell_bitcoins": true
    //     }
    // }
    console.log('result', result);
    if (!result || result.status !== 200) {
      let data = {
        accountSyncFail: true,
        accountSyncFailMessage: 'Account sync fail',
      };
      yield put(accountSyncFail(data));
    } else {
      
      yield put(accountSyncSuccess(result.data));
      if (result.error) {
        let data = {
          accountSyncFail: true,
          accountSyncFailMessage: result.message
            ? result.message
            : 'The wallet account does not exist',
        };
        yield put(accountSyncFail(data));
      }
    }
  } catch (err) {
    console.log('err', err);
    let data = {
      accountSyncFail: true,
      accountSyncFailMessage: 'Account sync fail',
    };
    yield put(accountSyncFail(data));
  }
}

export const accountSyncWatcher = createWatcher(
  accountSyncWorker,
  ACCOUNT_SYNC,
);

function* linkSwanWalletWorker({ payload }) {
  console.log('linkSwanWallet payload.data', payload.data);
  /*
  Continue with this worker only if:
  condition 1: Swan Account is not present
  OR
  condition 2: Swan account is present but status is 'NOT_LINKED'
  */
  const condition1 = true;
  const condition2 = true;
  if (condition1 || condition2) {
    let data = {
      linkSwanWalletFail: true,
      linkSwanWalletFailMessage: 'Swan Account already available',
    };
    yield put(linkSwanWalletFail(data));
  }

  try {
    /*
    Option 1:
    Retrieve swan account
    retrieve swan auth token and swan xpub from swan acc data.
    replace swanAccount with retrieved swan Account

    Option 2:
    swan auth token and swan xpub will be passed as data from UI via action 
    */

    // below is required for Option 1 only and not for Option 2
    const swanAccount = {
      xpub: '',
      swanAuthToken: '',
    };

    payload.data.xpub = swanAccount.xpub;
    payload.data.swanAuthToken = swanAccount.swanAuthToken;

    // {"btcAddresses":["3PTECsh6bMhNVmDPYqkYkr3cro2Mo8q6fL"],"displayName":"wallet-test"}

    let result = yield call(linkSwanWallet, payload.data);

    if (!result || result.status !== 200) {
      let data = {
        linkSwanWalletFail: true,
        linkSwanWalletFailMessage: 'Swan wallet linking failed',
      };
      yield put(linkSwanWalletFail(data));
    } else {
      /*
      If its a success the response will be as follows:

      {
          "entity": "walletAddress",
          "item": {
              "id": "096cd43f-f1c5-47cb-9acb-6a29134c5262",
              "btcAddress": "2N6aLeRSg3p63BguHpjMf5CVcfYQtr7xoan",
              "isConfirmed": false,
              "displayName": "wallet-test"
          }
      }
      */
      result = {
        entity: 'walletAddress',
        item: {
          id: '096cd43f-f1c5-47cb-9acb-6a29134c5262',
          btcAddress: '2N6aLeRSg3p63BguHpjMf5CVcfYQtr7xoan',
          isConfirmed: false,
          displayName: 'wallet-test',
        },
      };

      /*
      The following properties needs to be updated in Swan Acc data:
      */
      const swanWalletId = result.item.id;
      const linkStatus = 'LINK_INITIATED';
      const isConfirmed = false;
      const displayName = result.item.displayName

      const data = {
        linkStatus, isConfirmed, displayName, swanWalletId
      }
      yield put(linkSwanWalletSuccess(data));

      if (result.error) {
        let data = {
          linkSwanWalletFail: true,
          linkSwanWalletFailMessage: result.message || 'Swan wallet linking failed',
        };
        yield put(linkSwanWalletFail(data));
      }
    }
  } catch (err) {
    console.log('err', err);
    let data = {
      linkSwanWalletFail: true,
      linkSwanWalletFailMessage: 'Swan wallet linking failed',
    };
    yield put(linkSwanWalletFail(data));
  }
}

export const linkSwanWalletWatcher = createWatcher(linkSwanWalletWorker, LINK_SWAN_WALLET);
