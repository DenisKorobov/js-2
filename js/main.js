const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*** Task №1 begin ***/

let getRequest = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error!');
        } else {
          resolve(xhr.responseText);
        }
      }
    }
    xhr.send();
  });
}

getRequest(`${API}/catalogData.json`)
  .then(data => console.log(data))
  .catch(err => console.log(err + '!!'));

/*** Task №1 end ***/

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products', basket) {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods().then((data) => {
      this.#goods = data;
      this.#render();
    });

    basket.render();
    this.#addToBasket(basket);
  }

  #fetchGoods() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch((err) => console.log(err));
  }

  sum() {
    return this.#allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  #addToBasket(basketObject) {
    const block = document.querySelector(this.container);

    block.addEventListener('click', event => {
      let target = event.target;
      if (target.tagName != 'BUTTON') return;
      const id = target.parentNode.parentNode.getAttribute('data-id');
      basketObject.items.push(this.#allProducts.find(element => element.id == id));
      basketObject.render();
    });
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

/*** Basket begin ***/

class BasketList {
  constructor(container = '.basket') {
    this.container = container;
    this.items = [];

    this.deleteFromBasket();
  }

  render() {
    const block = document.querySelector(this.container);
    block.innerHTML = '';
    for (let product of this.items) {
      const productObject = new BasketItem(product);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }

    this.renderSum();
  }

  getSum() {
    let sum = 0;
    for (let product of this.items) {
      sum += product.price;
    }
    return sum;
  }

  renderSum() {
    const block = document.querySelector(this.container);
    block.insertAdjacentHTML('beforeend', '<b>Итого:' + this.getSum() + '</b>');
  }

  deleteFromBasket() {
    const block = document.querySelector(this.container);

    block.addEventListener('click', event => {
      let target = event.target;
      if (target.tagName != 'BUTTON') return;
      const id = target.parentNode.getAttribute('data-id');
      const index = this.items.findIndex(element => element.id == id);
      this.items.splice(index, 1);
      this.render();
    });
  }
}

class BasketItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
  }

  render() {
    return `<div class="basket-item" data-id="${this.id}">${this.title} ${this.price} <button>Удалить</button></div>`;
  }
}

const basketBlock = new BasketList();
const page = new ProductList('.products', basketBlock);

/*** Basket end  ***/