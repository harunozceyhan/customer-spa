import { NextFunction, Request, Response } from 'express'
import { ValidationError, NotFoundError, DBError, NotNullViolationError, CheckViolationError, DataError } from 'objection'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exceptionMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        switch (err.type) {
            case 'ModelValidation':
                res.status(400).send({
                    message: err.message,
                    type: err.type,
                    data: err.data
                })
                break
            default:
                res.status(400).send({
                    message: err.message,
                    type: 'UnknownValidationError',
                    data: {}
                })
                break
        }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: err.message,
            type: 'NotFound',
            data: {}
        })
    } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'NotNullViolation',
            data: {
                column: err.column,
                table: err.table
            }
        })
    } else if (err instanceof CheckViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'CheckViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        })
    } else if (err instanceof DataError) {
        res.status(400).send({
            message: err.message,
            type: 'InvalidData',
            data: {}
        })
    } else if (err instanceof DBError) {
        res.status(500).send({
            message: err.message,
            type: 'UnknownDatabaseError',
            data: {}
        })
    } else {
        res.status(500).send({
            message: err.message,
            type: 'UnknownError',
            data: {}
        })
    }
}

export default exceptionMiddleware