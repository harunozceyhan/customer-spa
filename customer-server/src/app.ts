import express from 'express'
import { Server } from 'http'
import exceptionMiddleware from './middleware/exception'

class App {
    public app: express.Application
    public port: number

    constructor(appInit: { middleWares: any; controllers: any }) {
        this.app = express()
        this.port = parseInt(process.env.PORT)
        // Initialize parser and logging middlewares before controller initialization
        this.middlewares(appInit.middleWares)
        // Initialize controllers
        this.routes(appInit.controllers)
        // Initialize error middleware after controller initialization. Otherwise not working
        this.app.use(exceptionMiddleware)
        this.template()
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private template() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    public listen(): Server {
        return this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App