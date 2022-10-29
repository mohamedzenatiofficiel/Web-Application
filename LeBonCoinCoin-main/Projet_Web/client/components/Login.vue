<!-- Route Login : Access to everyone -->
<template>

    <div class="d-flex justify-content-center">
    <form @submit.prevent="loginUser()"> 
      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>  
        <div class="container">
         <button type="Submit" class="btn btn-primary">Submit</button>
         <button @click="route_register()" class="btn btn-primary">Register</button>
         </div>
         <div class="password">
           <p> <span class="badge badge-pill badge-light">Forgot password ? </span></p>
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

  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  async mounted () {
  },
  methods: {
    async loginUser() {
      this.$emit('login', {
        email: this.email,
        password: this.password,
      })
      },
    route_register() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.justify-content-center{
  padding-top: 40px;
  height:740px;
}
.password{
  padding-top:10px;
  padding-left: 30px;

}

</style>
