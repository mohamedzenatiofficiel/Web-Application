<!-- Route History : User access only -->
<template>
  <div class="d-flex justify-content-center top">
    <form>
        <legend class="dist"> History </legend>
    <article v-for="order in orders" :key="order.id">
        <div class="d-flex flex-column">
            <div class="p-2">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <p class="lead">{{ order.id_name }} - {{ order.email }} - {{ order.id_panier }} - <span class="badge badge-pill badge-danger">{{ order.total_price }}$ </span> - {{ order.address }} - {{ order.city }} - {{ order.country }} - {{ order.zipcode }} </p>
                    </li>
                </ul>
        </div>
        </div>
      <div class="article-content">
        <div class="article-title">
      </div>
    
    </article>
    </form>
  </div>


</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
    isConnected: { type: Boolean },
    userAdmin: { type: Boolean },
    user: { type: Object }, 
    orders: { type: Array, default: [] },


  }
}
</script>

<style scoped>
article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}

.top {
  margin-top: 20px;
  height:800px;

}

.deport {
  margin-left : 100px;
  padding-top: 10px;
}

.deport-right{
  margin-right: 60px;
}

.flex {
  margin-right:300px;
}
.jumbotron{
  margin-top:50px;
  padding-top:10;
  padding-bottom:10;
  border-color:red
}
.dist{
    font-size: 50px;
    margin-left:300px;
}
</style>
