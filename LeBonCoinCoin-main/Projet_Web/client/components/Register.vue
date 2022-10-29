<!-- Route Register : Access to everyone -->
<template>
   <div class="d-flex justify-content-center">
    <form @submit.prevent="createUser()"> 
      <fieldset>
        <div class="form-group">
        <label class="col-form-label" for="inputDefault"> Name </label>
        <input type="text" class="form-control" placeholder="Enter Name" id="inputDefault" v-model="name">
      </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password">
        </div>  
              <fieldset>
        <legend> <span class="badge badge-pill badge-light">Newsletter ?</span> </legend>
        <div class="form-check">
        <label class="form-check-label">
          <input type="radio" v-model="news" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="Yes">
          <span class="badge badge-pill badge-light">Yes</span>
        </label>
      </div>

      <div class="form-check disabled">
        <label class="form-check-label">
          <input type="radio" v-model="news" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="No">
          <span class="badge badge-pill badge-light">No</span>
        </label>
      </div>
      </fieldset>
        <div class="container">
         <button type="submit" class="btn btn-primary">Submit</button>
         </div>


    </form>
    </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },

  },
  data () {
    return {
      email: '',
      password: '',
      news: '',
      name: ''
    }
  },
  async mounted () {
  },
  methods: {
    async createUser() {
      await axios.post('/api/register', {
        email: this.email,
        password: this.password,
        news: this.news,
        name: this.name
      })
      alert('Merci de votre inscription. Vous pouvez maintenant vous connecter.')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.justify-content-center{
  padding-top:40px;
  height: 800px;
}
.container{
  padding-top:10px;
  padding-left:20px;
}
legend{
  padding-left:10px;
}
</style>
