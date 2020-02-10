import { expect } from 'chai'
import request from 'supertest'
import assert from 'assert'
import app from '../server'

let id = ''
const mockData = {
    firstName: 'Test Name',
    lastName: 'Test Last name',
    gender: 'Woman',
    customerLifeTimeValue: 4.5,
    birthday: '1996-10-12',
    lastContact: '2017-06-01T23:28:56.782Z'
}

describe('Testing the post /api/v1 route', () => {

    it('should return Created status', () => {
        return request(app)
            .post('/api/v1')
            .send(mockData)
            .set('Accept', 'application/json')
            .then(response => {
                id = JSON.parse(response.text).id
                assert.equal(response.status, 201)
            })
    })

    it('should return 400 status', () => {
        return request(app)
            .post('/api/v1')
            .then(response => assert.equal(response.status, 400))
    })

})

describe('Testing the get /api/v1 route', () => {

    it('should return OK status', () => {
        return request(app)
            .get('/api/v1')
            .then(response => assert.equal(response.status, 200))
    })

    it('should return message on rendering', () => {
        return request(app)
            .get('/api/v1')
            .then(response => expect(response.text).to.contain('id'))
    })

})

describe('Testing the put /api/v1/:id route', () => {

    it('should return OK status', () => {
        return request(app)
            .put('/api/v1/' + id)
            .send(mockData)
            .set('Accept', 'application/json')
            .then(response => assert.equal(response.status, 200))
    })

})

describe('Testing the delete /api/v1/:id route', () => {

    it('should return OK status', () => {
        return request(app)
            .delete('/api/v1/' + id)
            .set('Accept', 'application/json')
            .then(response => assert.equal(response.status, 200))
    })

})