const Binance = require('binance-api-node').default
const mongoose = require('mongoose')

const models = require('./models')
const config = require('../config.json')

require('./database')

const client = Binance()

const seedTicker = config.database.seed.ticker

async function fetchData (symbol = seedTicker, interval = '1d', startTime = '2017-01-01') {
  const ticks = await client.candles({
    symbol,
    interval,
    startTime: new Date(startTime).getTime(),
    endTime: new Date().getTime()
  }).then(resp => {
    const customizeResp = resp.map(element => {
      element.ticker = symbol
      return element
    })
    return customizeResp
  })

  return ticks
}

const seedDB = async () => {
  await models.Candle.deleteMany({})
  await fetchData().then(async ticks => {
    await models.Candle.insertMany(ticks)
  })
}

seedDB().then(() => {
  console.log('Database seeded successfully!')
  mongoose.connection.close()
})
