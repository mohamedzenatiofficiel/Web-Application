<template>
<div class="jumbotron">
  <h1 class="display-3"><span class="badge badge-pill badge-light">Welcome to LeBonCoinCoin !</span></h1>

  <p class="lead dist">This is a very unique website where you can find all the treasures you were always dreaming of !</p>

  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button"> Twitter </a>
  </p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button"> Instagram </a>
  </p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button"> Facebook </a>
  </p>
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
      password: ''
    }
  },
  async mounted () {
  },
  methods: {
    async loginUser() {
      this.$emit('login', {
        email: this.email,
        password: this.password
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
}
.password{
  padding-top:10px;
  padding-left: 30px;

}
.jumbotron{
    height: 730px;
}
.display-3{
    padding-bottom:10px;
}
.dist{
  padding-bottom:40px
}
</style>
