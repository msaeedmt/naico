const mongoose = require('mongoose')

const CandleSchema = mongoose.Schema({
  ticker: String,
  openTime: Number,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  closeTime: Number,
  trades: Number
})

const Candle = mongoose.model('Candle', CandleSchema, 'Candles')

const models = { Candle }

module.exports = models
