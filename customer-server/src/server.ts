import App from './app'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'


// If env is not production, use .env file to get config
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// Create Express app and start listening
new App({
    controllers: [],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware]
}).listen()