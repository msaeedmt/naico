const mongoose = require("mongoose");

const models = require('./models')
const db = require('./database')
const config = require('../config/config.json')
const enums = require('./enums')
const {ObjectId} = require('mongodb')

const seedDB = async () => {

    await models.Signal.deleteMany({});
    await models.Decision.deleteMany({});

    const signals = [{
        _id: new ObjectId(),
        signalNumber: '000A',
        status: enums.STATUS.OPEN
    }, {
        _id: new ObjectId(),
        signalNumber: '000B',
        status: enums.STATUS.STOP
    }, {
        _id: new ObjectId(),
        signalNumber: '000C',
        status: enums.STATUS.TARGET
    }, {
        _id: new ObjectId(),
        signalNumber: '000D',
        status: enums.STATUS.STOP
    }]

    const decisions = [{
        analyst: 'person1',
        signal: signals[0]._id,
        analystDecision: enums.DECISION_TYPE.CONFIRM
    }, {
        analyst: 'person1',
        signal: signals[1]._id,
        analystDecision: enums.DECISION_TYPE.CONFIRM
    }, {
        analyst: 'person1',
        signal: signals[2]._id,
        analystDecision: enums.DECISION_TYPE.REJECT
    }, {
        analyst: 'person2',
        signal: signals[3]._id,
        analystDecision: enums.DECISION_TYPE.CONFIRM
    }]

    await models.Signal.insertMany(signals)
    await models.Decision.insertMany(decisions)
}

seedDB().then(() => {
    console.log('Database seeded successfully!');
    mongoose.connection.close()
})