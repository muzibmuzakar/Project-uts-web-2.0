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
		  xhr.open("GET", "https://api.jsonbin.io/b/5ea0e49198b3d5375232e32c/2");
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

export const CheckoutComponent = {
    store,
    props:['id'],
    computed: {
		collection(){
			return this.$store.state.collections.filter((collection)=>{
				return collection.id === parseInt(this.id)
			})[0]
		}
	},
    data() {
        return {
            quantity:1,
            total:0
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
        btnProses(value){
            if(this.quantity < 1){
                Swal.fire({
                    icon: 'error',
                    text: 'Quantity tidak boleh kurang dari 1',
                    showConfirmButton: false,
                    timer: 2000
                })
            }else{
                this.total = value
            }
        }
    },
	template: `
	<div v-if="collection">
        <h1 style="text-align: center; margin-top:50px;">Collection List</h1>

        <section class="section-name bg-white padding-y-sm">
			<div class="container">
				<div class="row mb-4">
					<div class="col-12">
						<router-link :to="'/collection/' + id" class="btn shadow-sm"><i class="fa fa-angle-left"></i> Back</router-link>
				  	</div>
				</div>
				<div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header bg-white font-weight-bold">
                                Detail Belanja
                            </div>
                            <div class="card-body">
                                <img :src=" 'img/collection/' + collection.image" class="w-25 float-left">
                                <div class="float-left">
                                    <h4>{{ collection.title }}</h4>
                                    <p>Jumlah : <input type="number" v-model="quantity" class="form-control shadow-none w-40"></p>
                                </div>
                                <span class="float-right">Rp. {{ formatPrice(collection.price) }}</span>
                            </div>
                            <div class="card-body">
                                <button @click="btnProses(quantity*collection.price)" data-toggle="modal" data-target="#myModal" class="btn btn-primary float-right">Total Bayar<i class="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <transition name="fade" mode="out-in">
                        <div class="container">
                        <div class="" v-if="total > 0">
                            <div class="card">
                                <div class="card-header bg-white font-weight-bold">
                                    Ringkasan Belanja
                                </div>
                                <div class="card-body">
                                    Total Pembayaran : <b>Rp{{ formatPrice(total) }}</b>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            
                        </div>
                        </div>
                    </transition>
				</div>
			</div>	
		</section>
		
	</div>
	`,
}