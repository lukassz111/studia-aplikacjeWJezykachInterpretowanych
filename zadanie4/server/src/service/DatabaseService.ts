import { ConnectionOptions, getConnectionManager, ConnectionManager, Connection } from "typeorm"
import { Product } from "../entity/Product"

const databaseConnectionOptions: ConnectionOptions = {
    name: "default",
    type: "sqlite",
    database: './db.sqlite',
    entities: [
        Product
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
}
const DatabaseService: _DatabaseService = new _DatabaseService
export default DatabaseService