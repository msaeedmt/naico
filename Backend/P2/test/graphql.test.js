const expect = require('chai').expect;
const request = require('supertest')
const {ObjectId} = require('mongodb')

const enums = require('../database/enums')
const models = require('../database/models');
const {app} = require('../server')

const signals = [{
    _id: new ObjectId(),
    signalNumber: '1',
    status: enums.STATUS.OPEN
}, {
    _id: new ObjectId(),
    signalNumber: '2',
    status: enums.STATUS.OPEN
}, {
    _id: new ObjectId(),
    signalNumber: '3',
    status: enums.STATUS.TARGET
}, {
    _id: new ObjectId(),
    signalNumber: '4',
    status: enums.STATUS.STOP
}]

const decisions = [{
    _id: new ObjectId(),
    analyst: 'first',
    signal: signals[0]._id,
    analystDecision: enums.DECISION_TYPE.CONFIRM
}, {
    _id: new ObjectId(),
    analyst: 'first',
    signal: signals[1]._id,
    analystDecision: enums.DECISION_TYPE.CONFIRM
}, {
    _id: new ObjectId(),
    analyst: 'first',
    signal: signals[2]._id,
    analystDecision: enums.DECISION_TYPE.REJECT
}, {
    _id: new ObjectId(),
    analyst: 'second',
    signal: signals[3]._id,
    analystDecision: enums.DECISION_TYPE.CONFIRM
}]

beforeEach((done) => {

    models.Signal.deleteMany().then(() => {
        return models.Signal.insertMany(signals)
    }).then(() => {
        models.Decision.deleteMany().then(() => {
            return models.Decision.insertMany(decisions)
        }).then(() => {
            done()
        });
    });

})

describe('Database check', () => {
    it('database should return signal doc with correct id', (done) => {
        var hexId = signals[0]._id.toHexString()

        models.Signal.findById(hexId).then(foundedSignal => {
            expect(foundedSignal).to.be.an('object')
            expect(foundedSignal._id.toHexString()).to.equal(hexId)
            expect(foundedSignal.signalNumber).to.equal(signals[0].signalNumber)
            expect(foundedSignal.status).to.equal(signals[0].status)
            done()
        }).catch((e) => done(e))
    })

    it('database should return decision doc with correct id', (done) => {
        var hexId = decisions[0]._id.toHexString()

        models.Decision.findById(hexId).populate('signal').then(foundedDecisions => {
            expect(foundedDecisions).to.be.an('object')
            expect(foundedDecisions._id.toHexString()).to.equal(hexId)
            expect(foundedDecisions.analyst).to.equal(decisions[0].analyst)
            expect(foundedDecisions.analystDecision).to.equal(decisions[0].analystDecision)
            expect(foundedDecisions.signal._id.toHexString()).to.equal(decisions[0].signal._id.toHexString())
            done()
        }).catch((e) => done(e))
    })
})

describe('/graphql POST', () => {

    it('return all signals', (done) => {
        request(app).post('/graphql')
            .send({
                query: '{ allSignals { _id signalNumber status }}'
            })
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                allSignals = res.body.data.allSignals

                expect(allSignals).to.be.an('array')
                expect(allSignals).to.have.lengthOf(4);
                expect(allSignals[0]).to.have.property('signalNumber')
                expect(allSignals[0]).to.have.property('status')
                expect(allSignals[0].signalNumber).to.be.a('string')
                expect(allSignals[0].status).to.be.a('number')
                done()
            })
    })

    it('return all decisions', (done) => {
        request(app).post('/graphql')
            .send({
                query: '{ allDecisions { _id analyst analystDecision signal { signalNumber status } }}'
            })
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                allDecisions = res.body.data.allDecisions

                expect(allDecisions).to.be.an('array')
                expect(allDecisions).to.have.lengthOf(4);
                expect(allDecisions[0]).to.have.property('analyst')
                expect(allDecisions[0]).to.have.property('analystDecision')
                expect(allDecisions[0]).to.have.property('signal')
                expect(allDecisions[0].analyst).to.be.a('string')
                expect(allDecisions[0].analystDecision).to.be.a('number')
                expect(allDecisions[0].signal).to.be.a('object')
                expect(allDecisions[0].signal).to.have.property('signalNumber')
                expect(allDecisions[0].signal).to.have.property('status')
                expect(allDecisions[0].signal.signalNumber).to.be.a('string')
                expect(allDecisions[0].signal.status).to.be.a('number')
                done()
            })
    })

    it('return all analyst decisions', (done) => {
        request(app).post('/graphql')
            .send({
                query: '{ getAnalysts { _id allDecisions trueDecisions }}'
            })
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                allAnalysts = res.body.data.getAnalysts

                expect(allAnalysts).to.be.an('array')
                expect(allAnalysts).to.have.lengthOf(2);
                expect(allAnalysts[0]).to.have.property('_id')
                expect(allAnalysts[0]).to.have.property('allDecisions')
                expect(allAnalysts[0]).to.have.property('trueDecisions')
                expect(allAnalysts[0]._id).to.be.a('string')
                expect(allAnalysts[0].allDecisions).to.be.a('number')
                expect(allAnalysts[0].trueDecisions).to.be.a('number')
                done()
            })
    })
})