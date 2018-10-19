import DBManager from '../Database';

class TransactionManager {
  async getAll() {
    let client = await DBManager.getConnection();
    //Insérer nom de la db et de la collection
    let result = await client.db('test').collection('test_coll').find().toArray();
    client.close();
    return result;
  }

  async create(payload){
    let client = await DBManager.getConnection();
    //Insérer nom de la db et de la collection
    let result = await client.db('test').collection('test_coll').insertOne(payload);
    client.close();
    return result;
  }
}

export default new TransactionManager();