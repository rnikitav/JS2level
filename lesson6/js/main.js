const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    err: false,

  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          this.err = true;
        })
    },
  },
  mounted() {
    console.log(this)
  }
});

