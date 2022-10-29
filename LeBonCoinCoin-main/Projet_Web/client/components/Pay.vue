<!-- Route Pay : user acess only -->
<template>
    <div class="d-flex justify-content-center">

    <form @submit.prevent="pay()"> 
      <fieldset>
              <legend class="deport-left">Check Out</legend>
        <div class="form-group">
          <label for="exampleInputEmail1">Email *</label>
          <input v-model="buy.email"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Name *</label>
          <input type="text" v-model="buy.name" class="form-control" id="exampleInputPassword1" placeholder="..." required>
        </div>  
        <div class="form-group">
          <label for="exampleInputPassword1">Surname *</label>
          <input type="text" v-model="buy.surname" class="form-control" id="exampleInputPassword1" placeholder="..." >
        </div> 
        <div class="form-group">
          <label for="exampleInputPassword1">Address Line 1 * </label>
          <input type="text" v-model="buy.address" class="form-control" id="exampleInputPassword1" placeholder="..." required>
        </div> 
         <div class="form-group">
          <label for="exampleInputPassword1">City *</label>
          <input type="text" v-model="buy.city" class="form-control" id="exampleInputPassword1" placeholder="..." required>
        </div> 
         <div class="form-group">
          <label for="exampleInputPassword1">Country * </label>
          <input type="text" v-model="buy.country" class="form-control" id="exampleInputPassword1" placeholder="..." required>
        </div> 
         <div class="form-group">
          <label for="exampleInputPassword1">Zip Code *</label>
          <input type="text" v-model="buy.zipcode" class="form-control" id="exampleInputPassword1" placeholder="..." required>
        </div> 
          <div class="form-group">
          <label for="exampleInputPassword1">Phone number </label>
          <input type="text" v-model="buy.phonenumber" class="form-control" id="exampleInputPassword1" placeholder="...">
        </div> 


      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Credit Card *</label>
          <input type="text" v-model="buy.creditcard" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter number"  required>
        </div>
        <div class="d-flex flex-row">
            <div class="p-2"> 
                <div class="form-group">
                <label for="exampleInputPassword1">Expiration Date * </label>
                <input v-model="buy.expiration" class="form-control" id="exampleInputPassword1" placeholder="MM/YY"  required>
            </div>
        </div>
            <div class="p-2">
                 <div class="form-group">
                    <label for="exampleInputPassword1">CVC *</label>
                    <input v-model="buy.cvc" class="form-control" id="exampleInputPassword1" placeholder="XXX"  required>
                 </div>
            </div>
        </div>
        <div class="container">
         <button type="Submit" class="btn btn-primary"> Pay </button>
         <router-link to="/panier" class="btn btn-primary" > Cancel</router-link>
         </div>
       
        </form>
       
    </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
    user: { type: Object },
    totalPrice: { type: Number },

  },
  data () {
    return {
        buy: {
      email: '',
      name: '',
      surname: '',
      address:'',
      city:'',
      country: '',
      zipcode:'',
      phonenumber:'',
      creditcard: '',
      cvc: '',
      expiration:''
        }
    }
  },
  async mounted () {
  },
  methods:{
      async pay() {

      this.$emit('pay', this.panier, this.user, this.totalPrice, this.buy)
      },
      test(){
          console.log("PANIER " + this.panier)
          console.log("USER" + this.user)
      }
  }
}
</script>

<style scoped>
.justify-content-center{
  padding-top: 40px;
}
.password{
  padding-top:10px;
  padding-left: 30px;

}
.deport-left{
    margin-left:40px;
}
</style>
