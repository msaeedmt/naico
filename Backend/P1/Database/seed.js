const Binance = require('binance-api-node').default
const mongoose = require("mongoose");

const models = require('./models')
const db = require('./database')
const config = require('../config.json')

const client = Binance()

const seedTicker = config.database.seed.ticker

async function fetchData(symbol = seedTicker, interval = '1d', startTime = "2017-01-01") {
    var ticks = await client.candles({
        symbol,
        interval,
        startTime: new Date(startTime).getTime(),
        endTime: new Date().getTime()
    }).then(resp => {
        customized_resp = resp.map(element => {
            element.ticker = symbol
            return element
        });
        return customized_resp
    })

    return ticks
}

const seedDB = async () => {
    await models.Candle.deleteMany({});
    await fetchData().then(async ticks => {
        await models.Candle.insertMany(ticks)
    });
}

seedDB().then(() => {
    console.log('Database seeded successfully!');
    mongoose.connection.close()
})