import Mongodb from 'mongodb';

let MongoClient = Mongodb.MongoClient;

class DBManager {

  async getConnection() {
    try {
      return await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
    }catch (e) {
      return e;
    }
  }
}

export default new DBManager();