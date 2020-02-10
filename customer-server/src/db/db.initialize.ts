import Knex from 'knex'
import { Model } from 'objection'

class DBInitializer {
    private knex: Knex

    constructor() {
        // Create knex instance
        this.knex = Knex({
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }
        })
        Model.knex(this.knex)   // Let Model objects use the knex instance
        this.migrate()  // Make customer table migration

    }

    private migrate(): void {
        this.knex.migrate.latest({ directory: './src/migrations' })
    }

    public getKnex(): Knex {
        return this.knex
    }
}

export default DBInitializer
