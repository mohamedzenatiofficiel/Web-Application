<template>
    <div class="d-flex justify-content-center">
         
    <form @submit.prevent="loginUser()"> 
        <h1 class="display-3"><span class="badge badge-pill badge-light">FAQ</span></h1>
        <div class="card border-primary mb-3" style="max-width: 50rem;">
            <div class="card-header">I would like to place an order, how do I go about it?</div>
            <div class="card-body">

                <p class="card-text">LeBonCoinCoin is an online store, you can find your favorite pieces directly on the eshop : leboncoicoin.com !

Some "flash sales" are proposed on Instagram where the purchase is made directly via private message.

If needed you can contact me on Instagram or via the "contact" section of the site.</p>
            </div>
        </div>
        <div class="card border-primary mb-3" style="max-width: 50rem;">
            <div class="card-header">What are the modes of proposed payment ?</div>
            <div class="card-body">

                <p class="card-text">When you shop on the site you pay by credit card. For Paris residents a hand delivery is possible on Lyon 3, on site you can pay in cash or with the Lydia application.

A bank transfer is also available on request.</p>
            </div>
        </div>
        <div class="card border-primary mb-3" style="max-width: 50rem;">
            <div class="card-header">What are the delivery times?</div>
            <div class="card-body">

                <p class="card-text">For the sending of your parcel count a delay of 48h to 72h as of reception of the payment of the article. An email of confirmation of sending will be sent to you with the tracking number of your package so that you can follow its routing.

The shipments are made with Mondial Relay, your package will be received in the relay point of your choice (to be indicated when you order on the site, otherwise a default relay point will be assigned). If you wish it is possible to pass by the Post office for a delivery at home, on request.</p>
            </div>
        </div>
        <div class="card border-primary mb-3" style="max-width: 50rem;">
            <div class="card-header">My package was damaged during transport, is a refund possible?</div>
            <div class="card-body">

                <p class="card-text">LeBonCoinCoin does everything possible to pack your treasures (newspapers, bubble wrap, polystyrene, cardboard etc.) and will not be held responsible for accidents or incidents during transport: damage, breakage, loss or delay of package.

Concerning the most fragile items, I propose you an insurance taken in charge with the post office (additional costs) Without insurance no refund will be possible.</p>
            </div>
        </div>
        <div class="card border-primary mb-3" style="max-width: 50rem;">
            <div class="card-header">I've changed my mind,
do you accept returns?</div>
            <div class="card-body">

                <p class="card-text">Because of the risks of deterioration incurred during transport, LeBonCoinCoin reserves the right to refuse any request for return.</p>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
    boards: { type: Array, default: [] }
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
h1{
    margin-left:300px;
    padding-bottom: 40px
}
.card-header{
    font-size:2rem;
}
</style>
