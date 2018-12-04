import Config from '../config';
import FetchApi from './FetchApi';

const transactionTotalService = new FetchApi(Config.api, '/transactions/total');
const transactionStockService = new FetchApi(Config.api, '/transactions/stock');
const usagePCostService = new FetchApi(Config.api, '/usages/pcost');
const usageUCostService = new FetchApi(Config.api, '/usages/ucost');

export default {
  transactionTotalService,
  transactionStockService,
  usagePCostService,
  usageUCostService,
};
