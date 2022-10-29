<!-- Route Home : Access to everyone -->
<template>
  <div class="d-flex justify-content-center">
    <form>
    <h2 class ="d-flex">My Cart</h2>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="article of panier.articles" :key="article.id">
          {{ find(article.id).name}} - {{ find(article.id).price}} $
        <button type="button" class="btn btn-primary dec" @click.prevent="removeFromPanier(article.id), updateTotalPriceDown(find(article.id).price)" >Remove </button>
      </li>
    </ul>
    <a class="nav-link"  v-if="isConnected && !isNotEmpty"> Your panier is empty. Add articles from the <router-link to='/Boutique'>shop</router-link></a>
   
    <a class="nav-link" href="#"><router-link to="/login" v-if="!isConnected"> Connect to pay </router-link></a>
    <div class="d-flex flex-row">
      <div class="p-2"><router-link to="/pay" class="btn btn-primary " v-if="isConnected && isNotEmpty"> Pay </router-link></div>
      <div class="p-2 deport-right"><h4><span class="badge badge-pill badge-light">Total : {{ totalPrice }} $</span>  </h4></div>
    </div>
    </form>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
    isConnected: { type: Boolean },
    isNotEmpty: { type: Boolean },
    totalPrice: { type: Number },

  }, 
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
    find (articleId) {
      return this.articles.find(article => article.id === articleId)
    },
    pay () {
      this.$emit('pay')
    },
    removeFromPanier(articleId){
      console.log("article id from panier " + articleId)
      this.$emit('remove-from-panier', articleId, this.user)
    },
    updateTotalPriceDown(articlePrice){
      this.$emit('update-total-price-down', articlePrice)

    }
  }
}
</script>

<style scoped>
.justify-content-center{
  padding-top: 40px;
  height: 740px;
}
.dec{
  margin-left: 50px
}

.adjust{
  margin-top:40px;
}

.deport-right{
  margin-left:100px;
}


</style>
