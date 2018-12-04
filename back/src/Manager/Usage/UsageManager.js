import DBManager from '../Database';
import Config from '../../config';

const { db } = Config;

function priceQuantity(transaction) {
    return transaction.total / transaction.qte;
}

function restValue(transaction) {
  return transaction.pricequantity * transaction.rest;
}

function totalRest(usage) {
  let result = 0;
  usage.transactions.forEach(transaction => {
    result += transaction.rest;
  });
  return result;
}

function totalRestValue(usage) {
  let result = 0;
  usage.transactions.forEach(transaction => {
    result += transaction.restvalue;
  });
  return result;
}

function rest(usage) {
  let used;
  if (usage.unit === usage.transactions[0].unit) used = usage.qte;
  else if (usage.unit === 'g') used = usage.qte / usage.density[0].g;
  else if (usage.unit === 'ml') used = usage.qte * usage.density[0].g;
  usage.transactions.forEach(transaction => {
    if (transaction.qte >= used) {
      transaction.rest = transaction.qte - used;
      used = 0;
    }
    else if (transaction.qte < used) {
      used -= transaction.qte;
      transaction.rest = transaction.qte - used;
    }
  });
}

class UsageManager {

  async getAll() {
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('usages').find().toArray();
    client.close();
    return result;
  }

  async create(payload){
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('usages').insertOne(payload);
    client.close();
    return result;
  }

  async remove(payload) {
    const { password } = payload;
    const error = { errormsg:"Bad password", status: 1};
    if(password == db.pwd) {
      const client = await DBManager.getConnection();
      const result = await client.db(`${db.name}`).collection('usages').remove();
      client.close();
      return result;
    }
    return error;
  }

  async getAvgCostPurchase(material, date) {
    const client = await DBManager.getConnection();
    let result = await client.db(`${db.name}`).collection('usages').aggregate([
      { $match: { date: { $lte: date }, category: { $in: material } } },
      { $lookup: { from: "transactions", localField: "name", foreignField: "name", as: "transaction" } },
      { $unwind: "$transaction" },
      { $match: { "transaction.date": { $lte: date } } },
      {
        $group: {
          _id: "$_id",
          transactions: {
            $push: "$transaction"
          },
          qte: { $first: "$qte" },
          unit: { $first: "$unit" },
          name: { $first: "$name" }
        }
      },
      { $lookup: { from: "densities", localField: "name", foreignField: "name", as: "density" } }
    ]).toArray();
    client.close();
    result.forEach(usage => {
      rest(usage);
      usage.transactions.forEach(transaction => {
        transaction.pricequantity = priceQuantity(transaction);
        transaction.restvalue = restValue(transaction);
      });
      usage.totalrest = totalRest(usage);
      usage.totalrestvalue = totalRestValue(usage);
      usage.result = usage.totalrestvalue / usage.totalrest;
    });
    return result;
  }

  async getAvgCostUse(material, date) {
    const result = await this.getAvgCostPurchase(material, date);
    const res = [];
    result.forEach(usage => {
      res.push({
        _id: usage._id,
        name: usage.name,
        result: usage.unit === usage.transactions[0].unit ? usage.result : usage.unit === 'g' ? usage.result / usage.density[0].g : usage.result * usage.density[0].g
      });
    });
    return res;
  }

}

export default new UsageManager();