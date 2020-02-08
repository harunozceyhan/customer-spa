import { Request, Response } from 'express'

// Simple Request Logger that logs info about requests to console
const loggerMiddleware = (req: Request, resp: Response, next: () => void) => {
    console.log('Request logged:', req.method, req.path)
    next()
}

export default loggerMiddleware