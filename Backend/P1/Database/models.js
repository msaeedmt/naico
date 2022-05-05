const mongoose = require("mongoose");

var CandleSchema = mongoose.Schema({
    ticker: String,
    openTime: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    closeTime: Number,
    trades: Number
});

var Candle = mongoose.model('Candle', CandleSchema, 'Candles');

models = {Candle}

module.exports = models;
