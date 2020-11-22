import express, { NextFunction, Request, Response } from "express"
import { CategoriesController, OrdersController, ProductsController, RootController, StatesController }
    from "./controller/Controllers"
import DatabaseService from "./service/DatabaseService"

DatabaseService.initialize()

const app: express.Application = express()

// const products = new ProductsController(app, "products")
// const categories = new CategoriesController(app, "categories")
// const orders = new OrdersController(app, "orders")
// const ordersState = new OrdersStateController(app, "orders/:id/state")

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("[" + req.method + "] " + req.path)
    next()
})
const root = new RootController(app, "/")
const products = new ProductsController(app, "/products")
const categories = new CategoriesController(app, "/categories")
const orders = new OrdersController(app, "/orders")
const states = new StatesController(app, "/states")
app.listen(3000, () => {
    console.log("App is listening on port 3000")
})
