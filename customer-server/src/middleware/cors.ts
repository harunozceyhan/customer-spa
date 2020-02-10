import { Request, Response } from 'express'

// Simple Request Logger that logs info about requests to console
const corsMiddleware = (req: Request, res: Response, next: () => void) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
    next()
}

export default corsMiddleware