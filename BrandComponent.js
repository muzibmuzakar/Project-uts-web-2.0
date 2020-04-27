export const BrandComponent = {
    data () {
      return {
      brands: ""
      }
  },
  mounted () {
      axios
      .get('https://api.jsonbin.io/b/5ea0d31a2940c704e1dcf049')
      .then(response => this.brands = response.data)
  },
    
    template: `
      <div>
        <div class="container" style="margin-top:30px">          
          <h1 style="text-align: center">Brand List</h1>
          <hr>
          <div class="row">
            <div class="col-md-4" v-for="brand of brands">
              <div class="card mb-4 shadow-sm" style="width:3S0px; height:350px;">
              <img class="card-img-top" v-bind:src="'img/brand/' + brand.logo" alt="Card image" style="width:100%;">
                <hr><div class="card-body">
                  <h2 style="text-align: center">{{ brand.brand }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    `
}