import express from "express"
import { NextFunction, Request, Response } from "express"
import { CategoriesController, OrdersController, ProductsController, RootController, StatesController }
    from "./controller/Controllers"
import DatabaseService from "./service/DatabaseService"

DatabaseService.initialize()

const app: express.Application = express()

// const products = new ProductsController(app, "products")
// const categories = new CategoriesController(app, "categories")
// const orders = new OrdersController(app, "orders")
// const ordersState = new OrdersStateController(app, "orders/:id/state")

app.use(express.static('../client/dist/',{
    dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "index.html",
  maxAge: '1d',
  redirect: false
}))

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("[" + req.method + "] " + req.path)
    next()
})
const root = new RootController(app, "/api/")
const products = new ProductsController(app, "/api/products")
const categories = new CategoriesController(app, "/api/categories")
const orders = new OrdersController(app, "/api/orders")
const states = new StatesController(app, "/api/states")
app.listen(80, () => {
    console.log("App is listening on port 80")
})
