import express from 'express'
import { Request, Response, NextFunction } from 'express'
import Customer from '../db/models/customer.model'
import uuid from 'uuid/v4'

class CustomerController {
    private router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.getAllCustomers)
        this.router.post('/', this.postCustomer)
    }

    getAllCustomers = async (req: Request, res: Response) => {
        res.send(await Customer.query().select())
    }

    postCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await Customer.query().insert({
                id: uuid(), firstName: 'Harun', lastName: 'Ozceyhan',
                gender: 'w',
                lastContact: new Date(),
                customerLifeTimeValue: 213.12
            })
            res.send(customer)
        } catch (err) {
            next(err)
        }
    }

}

export default CustomerController
