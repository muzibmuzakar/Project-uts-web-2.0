export const CollectionsComponent = {
    data () {
      return {
        searchQuery: "",
        collections: ""
      }
  },
  mounted () {
      axios
      .get('https://api.jsonbin.io/b/5ea0e49198b3d5375232e32c/1')
      .then(response => this.collections = response.data)
  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.collections.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        return this.collections;
      }
    }
  },
    
    template: `
      <div>
          <h1 style="text-align: center; margin-top:50px;">Collection List</h1>
        <div class="container" style="margin-top:30px">
            <div class="row mb-2">
                <div class="search-wrapper panel-heading col-sm-12" style="margin-bottom:50px;">
                     <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" /> 
                     <hr>
                </div>
                <div class="col-md-6" v-for="collection in resultQuery">
                <router-link :to="'/collection/'+collection.id">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-md h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                            <strong class="d-inline-block mb-2 text-primary">{{ collection.brand }}</strong>
                            <h3 class="mb-0">{{ collection.title }}</h3>
                            <div class="mb-1 text-muted">Rp.{{ collection.price }}</div>                            
                            <router-link :to="'/collection/'+collection.id" type="button" class="btn btn-warning stretched-link" style="margin-top:50px;">View</router-link>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <img class="card-img-top" v-bind:src="'img/collection/' + collection.image" alt="image" style="width:200px; height:250px;">
                        </div>
                    </div></router-link>
                </div>
            </div>
        </div>
    </div>
    `
}