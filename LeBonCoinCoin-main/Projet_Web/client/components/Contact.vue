<!-- Route Contact : Access to everyone -->
<template>
<div class="jumbotron">
  <h1 class="display-3"><span class="badge badge-pill badge-light">Contact</span></h1>
  <p>If you want to contact us, feel free to use the form below :) We will answer you shortly !</p>

  <div class="d-flex">
    <form @submit.prevent="Send()"> 
      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address *</label>
          <input v-model="cont.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1"> Text *</label>
         <textarea v-model="cont.message" type="text"></textarea>
        </div>  
        <div class="container">
         <button type="Submit" class="btn btn-primary">Send</button>
         </div>
        
    </form>
    </div>

</div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      cont: {
      email: '',
      message: ''
      }
    }
  },
  async mounted () {
  },
  methods: {
    async Send() {
      this.$emit('contact', this.cont)
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
.jumbotron{
    height: 730px;
}
p{
    margin-top:40px;
}
textarea{
    height:250px;
    width: 500px;
}
</style>
