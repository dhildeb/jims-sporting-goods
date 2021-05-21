import { CartItem } from "./Models/CartItem.js"
import { Product } from "./Models/Product.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {

  /** @type {Product[]} */
  products = [
    new Product("https://freepngimg.com/thumb/axe/32846-4-firefighter-axe-transparent-image.png", "axe", 25, 10),
    new Product("https://www.freeiconspng.com/thumbs/basketball-png/basketball-png-7.png", "basketball", 15, 25),
    new Product("https://img2.pngio.com/longbow-recurve-bow-archery-arrow-traditional-archery-equipment-archery-bow-png-1429_1162.png", "bow", 55, 8),
    new Product("https://upload.wikimedia.org/wikipedia/commons/2/2d/Spectacles-SG2001-transparent.png", "glasses", 35, 3),
    new Product("https://lh3.googleusercontent.com/proxy/xdeRwWZIuDu1LE6nEKx4V6754S0XTif0AZJytuVtYWC4O2668ONrUamcwmLc7ljHS2HfDL7a-eI6Hcriot5w6WXqvdQHqpG0OK6n5IzfoQvsD56S0VNiamIdXNgeMTdA-A", "fireball", 150, 1),
    new Product("https://sb.kaleidousercontent.com/800x533/9e7eebd2c6/animals-0b6addc448f4ace0792ba4023cf06ede8efa67b15e748796ef7765ddeb45a6fb-removebg.png", "dog", 99, 9),
    new Product("https://www.freeiconspng.com/uploads/blood-png-4.png", "blood", 66, 6),
    new Product("https://www.freepnglogos.com/uploads/tree-plan-png/tree-plan-tree-png-image-purepng-transparent-png-image-12.png", "tree", 50, 7),
  ]

  /**@type {CartItem[]} */
  cart = []

  money = 200
  cartTotal = 0


}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
