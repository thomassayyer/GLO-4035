export default {
  db: {
    host: process.env.DB_HOST || 'ds139243.mlab.com',
    port: process.env.DB_PORT || '39243',
    name: process.env.DB_NAME || 'glo-4035',
    user: process.env.DB_USER || 'admin',
    pwd: process.env.DB_PWD || 'team-9',
  },
  application: {
    env: process.env.NODE_ENV || 'development',
  }
}