const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    searchSubmit: false,
    beforesearchSubmit: true,
    isVisible: true,
    filtredArr: [],
    searchproducts: '',
    imgCatalog: 'https://placehold.it/200x150'
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      console.log(product.id_product);
    },
    searchInput(event){
      return this.filtredArr = this.products.filter(el => el.product_name.toLowerCase().indexOf(this.searchproducts.toLowerCase()) !== -1)
    }
  },
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  }
});
