

export class Product {

  constructor(img, name, price, stock) {
    this.img = img
    this.name = name
    this.price = price
    this.stock = stock
  }


  get Template() {
    return `${this.stock}`
  }

}

