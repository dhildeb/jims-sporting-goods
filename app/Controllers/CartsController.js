import { ProxyState } from "../AppState.js";
import { cartsService } from "../Services/CartsService.js";

function _drawCarts() {
  let cartTotal = 0
  let template = `
  <div class="row justify-content-end my-5">
    <div class="col-2"><b>Product</b></div>
    <div class="col-2"><b>Price</b></div>
    <div class="col-2"><b>QTY</b></div>
    <div class="col-2"><b>Total</b></div>
    <div class="col-2"><b>Actions</b></div>
  </div>
  `

  ProxyState.cart.forEach(ci => {
    let total = ci.price * ci.qty
    cartTotal += total
    template += `
    <div class="row">
    <div class="col-2">
        <img src="${ci.img}" alt="">
    </div>
    <div class="col-2">
        <h3>${ci.name}</h3>
    </div>
    <div class="col-2"><b>${ci.price}</b></div>
    <div class="col-2">${ci.qty}</div>
    <div class="col-2">${total.toFixed(2)}</div>
    <div class="col-2">
    <button class="btn btn-danger" onclick="app.cartsController.delete('${ci.name}')">delete</button>
    </div>
</div>
    `
  })
  template += `
  <div class="row justify-content-end">
    <div class="m-auto">
      <span>cart total: $${cartTotal.toFixed(2)}</span>
      <button class="btn btn-primary m-5" onclick="app.cartsController.purchase()" >purchase</button>
    </div>
  </div>
  `
  document.getElementById('cart').innerHTML = template
  ProxyState.cartTotal = cartTotal
}

function _drawStock() {
  let template = ''
  ProxyState.products.forEach(p => {
    template += p.Template
    document.getElementById('axe').innerText = template
  })
}

function _drawMoney() {
  document.getElementById("money").innerText = ProxyState.money.toFixed(2)
}

export class CartsController {

  constructor() {
    ProxyState.on('cart', _drawCarts)
    ProxyState.on('cart', _drawStock)
    ProxyState.on('cart', _drawMoney)
    _drawMoney()
    _drawCarts()
    _drawStock()
  }


  addToCart(productName) {

    let store = ProxyState.products
    let cartItem = {}

    store.forEach(p => {
      if (p.name == productName) {
        cartItem = p
      }
    })
    cartsService.addToCart(cartItem)
  }

  toggleCart() {
    document.getElementById("cart").classList.toggle("d-none")
    document.getElementById("store").classList.toggle("d-none")

  }

  purchase() {

    if (ProxyState.money >= ProxyState.cartTotal) {
      cartsService.purchase()
    } else {
      window.alert("aint enough money bro")
    }
  }

  delete(item) {

    let removeItem = {}

    ProxyState.cart.forEach(ci => {
      if (ci.name == item) {
        removeItem = ci
      }
    })
    cartsService.delete(removeItem)
  }
}