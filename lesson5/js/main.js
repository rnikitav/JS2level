const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    searchproducts: '',
    isVisible: true,
    filtredArr: [],
    products: [],
    imgCatalog: 'https://placehold.it/200x150'
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      console.log(product.id_product);
    }
  },
  computed: {
    searchInput() {
      console.log('comp');
      this.filtredArr = [...this.products];
      return this.filtredArr.filter(el => el.product_name.toLowerCase().indexOf(this.searchproducts.toLowerCase()) !== -1)

    },
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
      })

  }
});

