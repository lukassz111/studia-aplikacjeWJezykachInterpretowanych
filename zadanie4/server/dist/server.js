"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("./controller/Controllers");
const app = express_1.default();
const products = new Controllers_1.ProductsController(app, "products");
const categories = new Controllers_1.CategoriesController(app, "categories");
const orders = new Controllers_1.OrdersController(app, "orders");
const ordersState = new Controllers_1.OrdersStateController(app, "orders/:id/state");
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
//# sourceMappingURL=server.js.map