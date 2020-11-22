import { ConnectionOptions, getConnectionManager, ConnectionManager, Connection } from "typeorm"
import { Category } from "../entity/Category"
import { Order } from "../entity/Order"
import { Product } from "../entity/Product"
import { State } from "../entity/State"

const databaseConnectionOptions: ConnectionOptions = {
    name: "default",
    type: "sqlite",
    database: './db.sqlite',
    entities: [
        Category, Product, State, Order
    ],
    logging: true
}

class _DatabaseService {
    private get Ready(): boolean {
        if(this.initialized = 1) {
            return true
        } else {
            return false
        }
    }
    private initialized: number = -1
    private connectionManager: ConnectionManager
    private connection: Connection|null = null
    constructor() {
        this.connectionManager = getConnectionManager()
    }
    public initialize() {
        if(this.initialized > -1) {
            return
        }
        this.initialized = 0
        this.connection = this.connectionManager.create(databaseConnectionOptions)
        this.connection.connect().then((connection: Connection) => {
            this.initialized = 1
        })
    }
    public get Connection(): Connection {
        return this.connection
    }
    public get ConnectionManager(): ConnectionManager {
        return this.connectionManager
    }
}
const DatabaseService: _DatabaseService = new _DatabaseService
export default DatabaseService