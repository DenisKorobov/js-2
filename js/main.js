/*** Добавил метод addToBasket - добавление товара в корзину. Также сделал вывод товаров корзины и подсчет их суммарной стоимости. ***/

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods();
    this.#render();
    this.#addToBasket();
  }

  #fetchGoods() {
    this.#goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  #addToBasket() {
    const buttons = document.querySelectorAll('.buy-btn');
    const _this = this;
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const id = this.parentNode.parentNode.getAttribute('data-id');
        basket.items.push(_this.#goods[id - 1]);
        basket.render();
      });
    });
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
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

const list = new ProductList();



/*** Basket begin ***/

class BasketList {
  constructor(container = '.basket') {
    this.container = container;
    this.items = [];
  }

  render() {
    const block = document.querySelector(this.container);
    block.innerHTML = '';
    for (let product of this.items) {
      const productObject = new BasketItem(product);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }

    this.sum();
  }

  sum() {
    let sum = 0;
    const block = document.querySelector(this.container);
    for (let product of this.items) {
      sum += product.price;
    }
    block.insertAdjacentHTML('beforeend', '<b>Итого:' + sum + '</b>');
  }
}

class BasketItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
  }

  render() {
    return `<div class="basket-item">${this.title} ${this.price}</div>`;
  }
}

const basket = new BasketList();

/*** Basket end  ***/



/*

const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
  { id: 5 },
];

const renderProduct = (title = 'Товар', price = 0) =>
  `<div class="product-item">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="by-btn">Добавить</button>
  </div>`;

const renderProducts = list => {
  const productList = list.map(item => renderProduct(item.title, item.price));
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);

*/