import { call, put } from 'redux-saga/effects';

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

import { createWatcher } from '../utils/utilities';

export function* getSwanTokenWorker({ payload }) {
  console.log('getSwanTokenWorker payload', payload.data);
  try {
    let result = yield call(getSwanAuthToken, payload.data);

    console.log('result', result);
    if (!result || result.status !== 200) {
      let data = {
        getSwanTokenFail: true,
        getSwanTokenFailMessage: 'Swan authentication failed',
      };
      yield put(getSwanTokenFail(data));
    } else {
      /*
      If we are here that means authentication was succesful with Swan
      there are 2 options to consider

      Option 1:
      User is now athenticated with Swan so they really do have a Swan account
      we can now create a Swan Account and save:
      swan xpub,
      The returned auth token
      initial linkingStatus as 'NOT_LINKED'
      isConfirmed  as false

      Option 2:
      Create the swan account shell as a separate action and reducer
      and update it when we get the auth token.
      */

      yield put(getSwanTokenSuccess(result.data));
      if (result.error) {
        let data = {
          getSwanTokenFail: true,
          getSwanTokenFailMessage: result.message || 'Swan authentication failed',
        };
        yield put(getSwanTokenFail(data));
      }
    }
  } catch (err) {
    console.log('err', err);
    let data = {
      getSwanTokenFail: true,
      getSwanTokenFailMessage: 'Swan authentication failed',
    };
    yield put(getSwanTokenFail(data));
  }
}

export const getSwanTokenWatcher = createWatcher(
  getSwanTokenWorker,
  GET_SWAN_TOKEN,
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
