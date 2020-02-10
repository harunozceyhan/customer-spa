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
        this.router.get('/api/v1', this.getAllCustomers)
        this.router.post('/api/v1', this.addCustomer)
        this.router.put('/api/v1/:id', this.updateCustomer)
        this.router.delete('/api/v1/:id', this.deleteCustomer)
    }

    getAllCustomers = async (req: Request, res: Response) => {
        res.send(await Customer.query().select())
    }

    addCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await Customer.query().insert({ id: uuid(), ...req.body })
            res.status(201).send(customer)
        } catch (err) {
            next(err)
        }
    }

    updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Customer.query().patch(req.body).where('id', req.params.id)
            res.status(200).send()
        } catch (err) {
            next(err)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Customer.query().deleteById(req.params.id)
            res.status(200).send()
        } catch (err) {
            next(err)
        }
    }

}

export default CustomerController
