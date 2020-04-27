var store = new Vuex.Store({
	strict: true,
	state: {
	  	collections: []
	},
	mutations: {
		setCollections(state, collections){
		state.collections = collections
	  }
	},
	actions: {
		getCollections ({ commit }) {
		return new Promise((resolve, reject) => {
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET", "https://api.jsonbin.io/b/5ea0e49198b3d5375232e32c/1");
		  xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
			  commit('setCollections', JSON.parse(xhr.response))
			  resolve(xhr.response);
			} else {
			  reject({
				status: this.status,
				statusText: xhr.statusText
			  });
			}
		  };
		  xhr.oneerror = function () {
			reject({
			  status: this.status,
			  statusText: this.statusText
			});	
		  };
		  xhr.send();
		})
	  }
	},
	getters: {
		collections: state => state.collections
	}
})

export const CollectionComponent = {
	store,
	props:['id'],
	computed: {
		collection(){
			return this.$store.state.collections.filter((collection)=>{
				return collection.id === parseInt(this.id)
			})[0]
		}
	},
	created() {
	  store.dispatch('getCollections')
	},
	methods: {
        formatPrice(value) {
            let val = (value/1)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    },
    template: `
        <div class="product_image_area" style="margin-top:50px;">
          <div class="container" v-if="collection">
            <div class="row s_product_inner">
              <div class="col-lg-6">
                <div class="s_Product_carousel">
                  <div class="single-prd-item">
                    <img class="img-fluid" v-bind:src="'img/collection/' + collection.image" alt="">
                  </div>
                </div>
              </div>
              <div class="col-lg-5 offset-lg-1">
                <div class="s_product_text">
                  <h3>{{ collection.title }}</h3>
                  <h2>Rp. {{ collection.price }}</h2>
                  <ul class="list">
                    <li><a class="active" href="#"><span>Brand</span> : {{ collection.brand }}</a></li>
                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                  </ul>
                  
				  <p>{{ collection.description }}</p>
				  <router-link :to="'/checkout/' + collection.id">
					<div class="card_area d-flex align-items-center">
						<a class="primary-btn" href="#">Add to Cart</a>
					</div>
				  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
    `,
    beforeRouteLeave (to, from, next) {
        const answer = window.confirm('apakah anda yakin ingin keluar ?')
        if (answer) {
            next()
        }else {
            next(false)
        }
    }
}