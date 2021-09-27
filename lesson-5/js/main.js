const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    searchLine: '',
    filtered: [],
    isVisibleCart: false,
    basketList: [],
    basketUrl: '/getBasket.json',
    imgBasket: 'https://via.placeholder.com/50x100',
    empty: true
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(good) {
      console.log(good);
    },
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      this.products.forEach(el => {
        if (!this.filtered.includes(el)) {
          el.isInvisible = true;
        } else {
          el.isInvisible = false;
        }
      });
      if (this.filtered.length != 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    }
  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          el.isInvisible = false;
          this.products.push(el);
        }
        if (this.products.length != 0)
          this.empty = false;
      });
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.basketList.push(el);
        }
      });
  },
});