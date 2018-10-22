import Mongodb from 'mongodb';
import Config from '../../config';

let MongoClient = Mongodb.MongoClient;
const { db } = Config;

class DBManager {

  async getConnection() {
    try {
      return await MongoClient.connect(`mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`, { useNewUrlParser: true });
    }catch (e) {
      return e;
    }
  }
}

export default new DBManager();