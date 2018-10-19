import DBManager from '../Database';

class TransactionManager {

  async getAll() {
    let client = await DBManager.getConnection();
    //Insérer nom de la db et de la collection
    let result = await client.db('').collection('transactions').find().toArray();
    client.close();
    return result;
  }
  
  async remove(password) {
    let client = await DBManager.getConnection();
    try {
      await client.db('projet').auth({
        user: "admin",
        pwd: password
      });
      const result = await client.db('projet').collection('transactions').remove();
    } catch(e) {
      return e;
    }
    client.close();
    return result;
  }

}

export default new TransactionManager();