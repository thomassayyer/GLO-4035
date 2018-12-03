import TransactionManager from '../Manager/Transaction';
import CreationManager from '../Manager/Creation';
import UsageManager from '../Manager/Usage';
import DensityManager from '../Manager/Density';

const transactionName = 'transaction';
const creationName = 'create';
const usageName = 'usage';
const densityName = 'density';
const errorMsg = 'Bad Request';

function itemToArray(item) {
  const separators = [' - ', ' – ', ' — ']
  return item.split(new RegExp(separators.join('|'), 'g'));
}

class Dispatcher {

  constructor() {
    this.transactionSchema = {
      date: '',
      item: '',
      qte: '',
      unit: '',
      total: '',
      stotal: '',
      tax: '',
    };
    this.tranformationSchema = {
      date: '',
      item: '',
      qte: '',
      unit: '',
      job_id: '',
      type: ''
    };
    this.densitySchema = {
      Information: '',
      item: '',
      g: '',
      ml: ''
    };
  }

  async createTransaction(transaction) {
    const item = itemToArray(transaction.item);
    const payload = {
      date: new Date(transaction.date).toDateString(),
      name: item.pop(),
      category: item,
      qte: parseFloat(transaction.qte),
      unit: transaction.unit,
      total: parseFloat(transaction.total),
      stotal: parseFloat(transaction.stotal),
      tax: parseFloat(transaction.tax)
    };
    return await TransactionManager.create(payload);
  }

  async createCreation(creation) {
    const item = itemToArray(creation.item);
    const payload = {
      date: new Date(creation.date).toDateString(),
      name: item.pop(),
      category: item,
      qte: parseFloat(creation.qte),
      unit: creation.unit,
      job_id: parseInt(creation.job_id, 10),
      type: creationName,
    };
    return await CreationManager.create(payload);
  }

  async createUsage(usage) {
    const item = itemToArray(usage.item);
    const payload = {
      date: new Date(usage.date).toDateString(),
      name: item.pop(),
      category: item,
      qte: parseFloat(usage.qte),
      unit: usage.unit,
      job_id: parseInt(usage.job_id, 10),
      type: usageName,
    };
    return await UsageManager.create(payload);
  }

  async createDensity(density) {
    const item = itemToArray(density.item);
    const payload = {
      information: density.Information,
      name: item.pop(),
      category: item,
      g: density.g,
      ml: density.ml
    };
    return await DensityManager.create(payload);
  }

  filter(payload) {
    switch (JSON.stringify(Object.keys(payload)).toLocaleLowerCase()) {
      case JSON.stringify(Object.keys(this.transactionSchema)).toLocaleLowerCase():
        return transactionName;
      case JSON.stringify(Object.keys(this.tranformationSchema)).toLocaleLowerCase():
        if (payload.type === creationName) return creationName;
        else if (payload.type === usageName) return usageName;
        else return errorMsg;
      case JSON.stringify(Object.keys(this.densitySchema)).toLocaleLowerCase():
        return densityName;
      default:
        return errorMsg;
    }
  }

  async dispatch(payload) {
    var schema = this.filter(payload);
    switch (schema) {
      case transactionName:
        return await this.createTransaction(payload);
      case creationName:
        return await this.createCreation(payload);
      case usageName:
        return await this.createUsage(payload);
      case densityName:
        return await this.createDensity(payload);
      default:
        return errorMsg;
    }
  }

}

export default new Dispatcher();