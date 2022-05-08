const config = require('./config.json')

const env = process.env.NODE_ENV || 'development'
console.log('env ******', env)

if (env === 'development') {
  process.env.PORT = config.server.port
  process.env.MONGODB_URI = `mongodb://${config.database.host}/${config.database.dev_collection_name}`
} else if (env === 'test') {
  process.env.PORT = config.server.port
  process.env.MONGODB_URI = `mongodb://${config.database.host}/${config.database.test_collection_name}`
}
