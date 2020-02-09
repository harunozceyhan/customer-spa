import { Model } from 'objection'

class Customer extends Model {
    id!: string
    firstName!: string
    lastName!: string
    birthday!: Date
    gender!: string
    lastContact!: Date
    customerLifeTimeValue!: number

    static get tableName(): string {
        return 'customer'
    }

    static get idColumn(): string {
        return 'id'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'firstName', 'lastName', 'birthday', 'gender', 'lastContact', 'customerLifeTimeValue'],
        }
    }
}

export default Customer
