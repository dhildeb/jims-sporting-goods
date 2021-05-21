import { ProxyState } from "../AppState.js"
import { CartItem } from "../Models/CartItem.js"

class CartsService {

  addToCart(product) {

    let itemInCart = ProxyState.cart.find(i => i.name == product.name)
    let stockItem = ProxyState.products.find(p => p.name == product.name)

    if (stockItem.stock > 0) {

      if (itemInCart) {
        itemInCart.qty++
        stockItem.stock--
        ProxyState.cart = ProxyState.cart
      } else {
        ProxyState.cart = [...ProxyState.cart, new CartItem(product)]
        stockItem.stock--

      }
    } else {
      window.alert("out stock bro")
    }
    console.log(stockItem)
  }

  purchase() {
    ProxyState.money -= ProxyState.cartTotal
    ProxyState.cart = []
  }

  delete(item) {

    let position = ProxyState.cart.indexOf(item)

    ProxyState.cart.splice(position, 1)

    ProxyState.cart = ProxyState.cart
  }

}

export const cartsService = new CartsService()