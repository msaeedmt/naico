const Binance = require('binance-api-node').default
const mongoose = require('mongoose')
const moment = require('moment')

const models = require('./models')
const config = require('../config.json')

require('./database')

const client = Binance()

const seedTicker = config.database.seed.ticker

async function fetchData (symbol = seedTicker, interval = '1d', startTime = '2017-01-01') {
  const limit = 1000
  const currnetTimeMs = new Date().getTime()
  let allTickes = []

  do {
    var nextTwoYearMs = new Date(moment(startTime).add(2, 'year').format('YYYY-MM-DD')).getTime()

    const ticks = await client.candles({
      symbol,
      interval,
      startTime: new Date(startTime).getTime(),
      endTime: nextTwoYearMs,
      limit
    }).then(resp => {
      const customizeResp = resp.map(element => {
        element.ticker = symbol
        return element
      })
      return customizeResp
    })

    allTickes = allTickes.concat(ticks)
    startTime = moment(startTime).add(2, 'year').format('YYYY-MM-DD')
  } while (nextTwoYearMs < currnetTimeMs)

  return allTickes
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
