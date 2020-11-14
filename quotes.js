

var app = new Vue({
    el: '#app',
    data() {
        return {
            info: null
          }
    },
  mounted () {
    axios
      .get('http://localhost:8080/api/quotes/')
      .then(response => (this.info = response.data.data))
  }
  })