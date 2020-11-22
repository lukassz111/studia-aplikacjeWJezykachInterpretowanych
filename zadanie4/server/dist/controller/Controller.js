"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(app, controllerName) {
        this.app = app;
        this.controllerName = controllerName;
        app.get(controllerName, this.getList);
        app.get(controllerName + '/:id', this.getElement);
        app.post(controllerName, this.addElement);
        app.put(controllerName + '/:id', this.updateElement);
    }
    getList(req, res) {
        res.sendStatus(404);
    }
    getElement(req, res) {
        res.sendStatus(404);
    }
    addElement(req, res) {
        res.sendStatus(404);
    }
    updateElement(req, res) {
        res.sendStatus(404);
    }
}
exports.default = Controller;
//# sourceMappingURL=Controller.js.map