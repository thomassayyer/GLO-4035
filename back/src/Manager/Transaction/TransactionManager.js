import DBManager from '../Database';
import Config from '../../config';

const { db } = Config;

function sumUsages(usages) {
  let result = 0;
  usages.forEach(usage => {
    result =+ usage.qte;
  });
  return result;
}

class TransactionManager {

  async getAll() {
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('transactions').find().toArray();
    client.close();
    return result;
  }

  async create(payload){
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('transactions').insertOne(payload);
    client.close();
    return result;
  }

  async remove(payload) {
    const { password } = payload;
    const error = { errormsg:"Bad password", status: 1};
    if(password == db.pwd) {
      const client = await DBManager.getConnection();
      const result = await client.db(`${db.name}`).collection('transactions').remove();
      client.close();
      return result;
    }
    return error;
  }

  async getTotalCost(material, date) {
    const client = await DBManager.getConnection();
    let result = await client.db(`${db.name}`).collection('transactions').aggregate([
      { $match: { date: { $lte: date }, category: { $all: material } } },
      { $group: { _id: null, cost: { $sum: "$total" } } }
    ]).next();
    client.close();
    return result;
  }

  async getStock(date) {
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('transactions').aggregate([
      { $match: { date: { $lte: date } } },
      { $lookup: { from: "usages", localField: "name", foreignField: "name", as: "usage" } },
      { $unwind: "$usage" },
      { $match: { "usage.date": { $lte: date } } },
      {
        $group: {
          _id: "$_id",
          usages: {
            $push: "$usage"
          },
          name: { $first: "$name" },
          unit: { $first: "$unit" },
          qte: { $sum: "$qte" }
        }
      },
      { $lookup: { from: "densities", localField: "name", foreignField: "name", as: "density" } }
    ]).toArray();
    client.close();
    result.forEach(transaction => {
      if (transaction.unit === transaction.usages[0].unit) transaction.result = transaction.qte - sumUsages(transaction.usages);
      else if (transaction.unit === 'g') transaction.result =  (transaction.qte / transaction.density[0].g) - sumUsages(transaction.usages);
      else transaction.result = (transaction.qte * transaction.density[0].g) - sumUsages(transaction.usages);
    });
    return result;
  }
  
}

export default new TransactionManager();