<!-- Route Boutique : Access to everyone -->
<template>
     <div class="d-flex justify-content-center top">
        <form> 
          <legend class="deport-left"><span class="badge badge-pill badge-light"> Store </span></legend>
              <article v-for="article in articles" :key="article.id">
                <div class="d-flex flex-column">
                  <div class="p-2">
                    <ul class="list-group">
                       <li class="list-group-item d-flex justify-content-between align-items-center">
                          <div class="article-img deport">
                            <div :style="{ backgroundImage: 'url(' + article.image + ')', height: 150, width: 150}"></div>
                            </div>
                          <div class="article-content" v-if="editingArticle.id !== article.id">
                            <div class="article-title">
                              <h2>{{ article.name }} - <span class="badge badge-pill badge-danger">{{ article.price }}$</span></h2>
                            <div v-if="isConnected && userAdmin">
                              <button type="button" class="btn btn-danger" @click="editArticle(article)">Modify</button>
                              <button type="button" class="btn btn-danger" @click="deleteArticle(article.id)">Delete</button>
                          </div>
                        <div class="d-flex  deport-right">
                          <button type ="button" class="btn btn-primary" @click="addToPanier(article.id, article.price, article.name), updateTotalPriceUp(article.price)">Add to Panier</button>
                        </div>
                  </div>
                <p class ="flex"><span class="badge badge-pill badge-light">{{ article.description }}</span></p>
            </div>
      <div class="article-content" v-else>
        <div class="article-title">
          <h2><input type="text" v-model="editingArticle.name"> - <input type="number" v-model="editingArticle.price"></h2>
          <div>
            <button type="button" class="btn btn-outline-primary " @click="sendEditArticle()">Ok</button>
            <button type="button" class="btn btn-outline-primary deport-right" @click="abortEditArticle()">Cancel</button>
          </div>
        </div>
        <p><textarea class="deport-right" v-model="editingArticle.description"></textarea></p>
        <input type="text" v-model="editingArticle.image" placeholder="Link">
      </div>
  </li>
  </ul>
  </div>
  </div>
  </article>
  </form>
    <form @submit.prevent="addArticle" v-if="userAdmin" class="jumbotron" >
      <h2>Add new articles</h2>
      <input type="text" v-model="newArticle.name" placeholder="Product name" required>
      <input type="number" v-model="newArticle.price" placeholder="Price" required>
      <textarea type="text" v-model="newArticle.description" required></textarea>
      <input type="text" v-model="newArticle.image" placeholder="Url to img">
      <button type="submit">Ajouter</button>
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
  },
  data() {
    return {
      newArticle: {
        name: "",
        description: "",
        image: "",
        price: 0,
      },
      editingArticle: {
        id: -1,
        name: "",
        description: "",
        image: "",
        price: 0,
      },
      totalPrice: 0,
    };
  },
  methods: {
    addArticle() {
      this.$emit("add-article", this.newArticle);
    },
    deleteArticle(articleId) {
      this.$emit("delete-article", articleId);
    },
    editArticle(article) {
      this.editingArticle.id = article.id;
      this.editingArticle.name = article.name;
      this.editingArticle.description = article.description;
      this.editingArticle.image = article.image;
      this.editingArticle.price = article.price;
    },
    sendEditArticle() {
      this.$emit("update-article", this.editingArticle);
      this.abortEditArticle();
    },
    abortEditArticle() {
      this.editingArticle = {
        id: -1,
        name: "",
        description: "",
        image: "",
        price: 0,
      };
    },
    addToPanier(articleId, articlePrice, articleName) {
      console.log("articleId", articleId);
      this.$emit(
        "add-to-panier",
        articleId,
        articlePrice,
        articleName,
        this.user
      );
    },
    updateTotalPriceUp(articlePrice) {
      this.$emit("update-total-price-up", articlePrice);
    },
  },
};
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
}

.deport {
  margin-right: 100px;
  padding-top: 10px;
}

.deport-right {
  margin-right: 60px;
}

.flex {
  margin-right: 300px;
}
.jumbotron {
  margin-top: 50px;
  padding-top: 10;
  padding-bottom: 10;
  border-color: red;
}
.img {
  display: block;
  max-width: 100%;
  height: auto;
  background-size: 400px;
}
.deport-left{
  margin-left:400px;
  font-size: 80px;
}

</style>
