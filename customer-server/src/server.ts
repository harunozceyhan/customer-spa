import App from './app'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

if (process.env.NODE_ENV !== 'production') dotenv.config()

const server = new App({
    controllers: [],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })]
}).listen()