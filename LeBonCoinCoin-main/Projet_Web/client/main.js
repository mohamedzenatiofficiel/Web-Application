const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Boutique = window.httpVueLoader('./components/Boutique.vue')
const Contact = window.httpVueLoader('./components/Contact.vue')
const FAQ = window.httpVueLoader('./components/FAQ.vue')
const Pay = window.httpVueLoader('./components/Pay.vue')
const Histo = window.httpVueLoader('./components/History.vue')
const Board = window.httpVueLoader('./components/Board.vue')
const Mailbox = window.httpVueLoader('./components/Mailbox.vue')

const routes = [
  { path: '/boutique', component: Boutique },
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/contact', component: Contact },
  { path: '/faq', component: FAQ },
  { path: '/pay', component: Pay },
  { path: '/history', component: Histo },
  { path: '/board', component: Board },
  { path: '/mailbox', component: Mailbox }

]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    orders: [],
    boards: [],
    mailbox: [],
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
    user: {},
    isConnected: false,
    userAdmin: false,
    isNotEmpty: false,
    totalPrice: 0 
  },
  async mounted () {
    const res = await axios.get('/api/articles') 
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    try {
      const res3 = await axios.get('/api/me')
      this.user = res3.data
      this.isConnected = true
      const res4 = await axios.get('/api/orders/' + this.user.id)
      this.orders = res4.data
      const res5 = await axios.get('/api/boards/')
      this.boards = res5.data
      const res6 = await axios.get('/api/mailbox/')
      this.mailbox = res6.data   
      if (res3.data.email == 'admin@admin.fr' )
      {
        this.userAdmin = true
      }

      if(this.panier.articles.length != 0)
      {
        this.isNotEmpty = true
      }
  
      for(var i = 0; i < this.panier.articles.length; i++)
      {
        this.totalPrice = this.totalPrice + parseInt(this.panier.articles[i].price)
      {

    }
  }
      

    } catch (err) {
      if (err.response?.status === 401) {
        this.isConnected = false
      } else {
        console.log('error', err)
      }
    }
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async pay (panier, user, totalPrice, buy) {
      await axios.post('/api/pay', {
        panier: panier,
        user: user,
        totalPrice: totalPrice,
        address: buy.address,
        city: buy.city,
        country: buy.country,
        phonenumber: buy.phonenumber,
        zipcode: buy.zipcode
    })

      const res2 = await axios.get('/api/orders/' + this.user.id)
      this.orders = res2.data 

      alert("Merci de votre achat " + user.name + " !")
      this.panier.articles = []
      this.totalPrice = 0
      this.$router.push('/')
    },
    async login (user) {
      const res = await axios.post('/api/login', user)
      this.user = res.data
      const res4 = await axios.get('/api/orders/' + this.user.id)
      this.orders = res4.data 
      const res5 = await axios.get('/api/boards/')
      this.boards = res5.data
      const res6 = await axios.get('/api/mailbox/')
      this.mailbox = res6.data  

      if (user.email == "admin@admin.fr")
      {
        this.userAdmin = true
      }
      this.isConnected = true
      if(this.panier.articles.length != 0)
      {
        this.isNotEmpty = true
      }
    
      this.$router.push('/boutique')
    },
    async logout (user) {
      const res = await axios.post('/api/logout', user)
      alert('Thanks for your visit ' + this.user.name + ' !')
      for(var i = 0; i < this.panier.articles.length; i++)
      {
        this.totalPrice = this.totalPrice + parseInt(this.panier.articles[i].price)
      }
      this.isConnected = false
      this.userAdmin = false
      this.totalPrice = 0
      this.panier.articles = []
      this.$router.push('/boutique')


    },
    async addToPanier (articleId, articlePrice, articleName, user) {
  
      const res = await axios.post('/api/panier/', 
      {
        id: articleId,
        price: articlePrice,
        name: articleName,
        user: this.user
      })
      this.panier.articles.push(res.data)
      this.isNotEmpty = true
    },
    async removeFromPanier (articleId, user) {
      const res = await axios.delete('/api/panier/',
      {
        data:{
          id: articleId,
          user: this.user

        },
      })

      const idx = this.panier.articles.findIndex(a => a.id === articleId)
      this.panier.articles.splice(idx, 1)
      if (this.panier.articles.length == 0)
      {
        this.isNotEmpty = false
      }
    },
    async updateTotalPriceUp (articlePrice){
      this.totalPrice = parseInt(articlePrice) + this.totalPrice
    },
    async updateTotalPriceDown (articlePrice){
      this.totalPrice = this.totalPrice - parseInt(articlePrice) 
    },
    async contact(cont){
      await axios.post('/api/contact', {
        user: this.user,
        email: cont.email,
        message: cont.message
    })

      alert("Thanks for your message !")
      this.$router.push('/boutique')

    }
  }
})
