import Config from '../config';
import FetchApi from './FetchApi';

const transactionService = new FetchApi(Config.api, '/transactions');

export default {
  transactionService,
};
