import App from './app'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'
import corsMiddleware from './middleware/cors'
import DBInitializer from './db/db.initialize'
import CustomerController from './controllers/customer.controller'


// If env is not production, use .env file to get config
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// Create Express app and start listening
const app = new App({
    controllers: [new CustomerController()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware, corsMiddleware]
}).listen()

// Initialize Database connection
new DBInitializer()

export default app // exported express app to use in tests
