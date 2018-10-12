import DBManager from '../Database';

class TransactionManager {
  async getAll() {
    let client = await DBManager.getConnection();
    //Insérer nom de la db et de la collection
    let result = await client.db('').collection('').find().toArray();
    client.close();
    return result;
  }
}

export default new TransactionManager();