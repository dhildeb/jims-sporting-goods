import { CartsController } from "./Controllers/CartsController.js";

class App {

  cartsController = new CartsController()

}

window["app"] = new App();
