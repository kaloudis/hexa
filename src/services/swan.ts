import axios from 'axios';
import Config from "react-native-config";

const swanOAuchURL = Config.swanAuth || '';

export const accountSync = (data) =>
  axios({
    method: 'get',
    url: URL + 'account-sync/' + Config.WALLET_SLUG + '/' + data.userKey,,
  });

export const getQuote = (data) =>
  axios({
    method: 'post',
    url: URL + 'quote',
    data,
  });

export const executeOrder = (data) =>
  axios({
    method: 'post',
    url: URL + 'execute',
    data,
  });