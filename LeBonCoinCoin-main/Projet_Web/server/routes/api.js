const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { Client } = require('pg')


const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: '123', /* CHANGE PASSWORD FOR YOUR DATABASE */
 database: 'test' /* CHANGE DATABASE FOR YOUR DATABASE */
})

client.connect()

const users = []

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}


/*
# Function : Creation of a new Panier for a user
# Para : Cookies
# Return : New instance of Panier if new user
*/
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
# Function : Login the user
# Para : Email, Password
# Return : log into his session
*/
router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  /* Check if the user is in the database */
  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  /* send error otherwise */
  if (result.rows.length === 0) {
    res.status(401).json({
      message: 'user does not exist'
    })
    return
  }

  /* Take the result data to create a new user */
  const user = result.rows[0]

  console.log(user.email)

  /* check if the password is the same as the bc password form the database */
  if (await bcrypt.compare(password, user.password)) {

    /* Connect the user */
    req.session.userId = user.id
    res.json({
      id: user.id,
      email: user.email,
      name: user.name
    })
  } 
  /* Throw an error otherwise */
  else {
    res.status(401).json({
      message: 'bad password'
    })
    return
  }
})

/*
# Function : Logout the user 
# Para : None
# Return : logout the session
*/
router.post('/logout', async(req, res) => {

  const panierId = req.session.id

  await client.query({
    text: `DELETE FROM panier WHERE id_panier=$1`,
    values: [panierId]
  })
  /* destroying the session as we do not want to have anything in Panier after logOut */
  req.session.destroy()

  /* Message from the server */
  res.status(200).json({ message: "Aurevoir" })


})

/*
# Function : Register new user
# Para : email, password, news, name
# Return : Enter everthing in the database
*/
router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const news = req.body.news
  const name = req.body.name
 
  /* SQL command to check if there is already a user */
  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  /* check if user is already present in the database, send an error otherwise */
  if (result.rows.length > 0) {
    res.status(401).json({
      message: 'user already exists'
    })
    return
  }

  /* bcrypt the password */
  const hash = await bcrypt.hash(password, 10)

  /* insert every data in the database */
  await client.query({
    text: `INSERT INTO users(email, password, news, name)
    VALUES ($1, $2, $3, $4)
    `,
    values: [email, hash, news, name]
  })

  res.send('ok')
})

/*
# Function : Check if user already connected
# Para : userId
# Return : logout the session
*/
router.get('/me', async (req, res) => {

  /* check if user is already conneced */
  if (typeof req.session.userId === 'undefined') {
    res.status(401).json({ message: 'not connected' })
    return
  }

  const result = await client.query({
    text: 'SELECT id, name, email FROM users WHERE id=$1',
    values: [req.session.userId]
  })

  console.log(result)
  res.json(result.rows[0])
})

/*
# Function : Return the panier of the user
# Para : None
# Return : Panier of the session
*/
router.get('/panier', (req, res) => {
  res.send(req.session.panier)
})

/*
# Function : add article to panier
# Para : articleId
# Return : panier of the user
*/
router.post('/panier/', async(req, res) => {

 
  const user_id = req.body.user.id
  const panier_id = req.session.id
  console.log("id" + user_id)
  const object_id = req.body.id
  console.log("OBJECT" + object_id)
  const price = req.body.price
  const name = req.body.name
  const finished = "No"

  console.log(name)

  var checkval = false;

  /* check if the id is already in the Panier */


  for(var i = 0; i < req.session.panier.articles.length; i++)
  {
    console.log("PANIER" + req.session.panier.articles[i].id)
    if(object_id === req.session.panier.articles[i].id)
    {
      checkval = true
    }
  }

  /* send an error otherwise */
  if(checkval)
  {
    res.status(501).json({ message: 'already in the panier' })
    return
  }
  
  /* check if the id is existing in the database */
  const check_id = await client.query({
    text: `SELECT MAX(id) FROM articles`
  })

  /* send an error otherwise */
  if (isNaN(object_id) || object_id > check_id) {
  res.status(400).json({ message: 'bad request' })
    return
}

await client.query({
  text: `INSERT INTO panier(id_user, id_object, id_panier, finished)
  VALUES ($1, $2, $3, $4)
  `,
  values: [user_id, object_id, panier_id, finished]
})


const panier = {
  id: object_id,
  price: price,
  name: name
}
  /* push the element in the Panier */
  req.session.panier.articles.push(panier)

  res.json(panier)

})

/*
# Function : Pay
# Para : None
# Return : logout the session
*/
router.post('/pay', async(req, res) => {

  const address = req.body.address
  const city = req.body.city
  const country = req.body.country
  const phonenumber = req.body.phonenumber
  const panierDate = req.body.panier.updatedAt
  const username = req.body.user.name
  const panierId = req.session.id
  const totalPrice = req.body.totalPrice
  const email = req.body.user.email
  const zipcode = req.body.zipcode
  const userId = req.body.user.id

  var object = ''
  const finished = "yes"

  for(var i = 0; i < req.session.panier.articles.length; i++)
  {
    object += req.body.panier.articles[i].name
  }

  console.log("OBJECT" + object)

  client.query({
    text: `INSERT INTO achat(id_name, date, id_panier, address, city, country, phonenumber, zipcode, email, total_price, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `,
    values: [username, panierDate, panierId, address, city, country, phonenumber, zipcode, email, totalPrice, userId]
  })

  client.query({
    text: `Update panier SET finished=$1 WHERE id_panier=$2`,
    values: [finished, panierId]
  })

  console.log("TOTPRICE " + totalPrice)
  console.log("ACHAT")
  req.session.panier = new Panier()
  res.send()
  
})


/*
# Function : Delete an element from the Panier
# Para : article.id
# Return : return the list of articles without the one selected
*/
router.delete('/panier/', async(req, res) => {
  
  const user_id = req.body.user.id
  console.log("id" + user_id)
  const object_id = req.body.id
  console.log("OBJECT" + object_id)
  const articleId = req.body.id

  const articleInPanier = req.session.panier.articles.findIndex(article => article.id === articleId)

  if (articleInPanier === -1) {
    res.status(400).json({ message: "The article is not currently in your cart"})
    return
  }

  await client.query({
    text: `DELETE FROM panier WHERE id_object=$1`,
    values: [object_id]
  })


  req.session.panier.articles.splice(articleInPanier, 1)
  res.send()
})




/*
# Function : return every articles from the database
# Para : userId
# Return : return every articles from the database
*/
router.get('/articles', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM articles'
  })
  res.json(result.rows)
})


/*
# Function : return every orders from a specific id
# Para : none
# Return : results.rows
*/
router.get('/orders/:id', async (req, res) => {

  const result = await client.query({
    text: `SELECT * FROM achat WHERE user_id = ${parseInt(req.params.id)}`

  })
  console.log(result.rows)
  res.json(result.rows)

})

/*
# Function : return commands from achat database
# Para : none
# Return : return every orders from the db
*/
router.get('/boards/', async (req, res) => {

  const result = await client.query({
    text: `SELECT * FROM achat`

  })
  console.log(result.rows)
  res.json(result.rows)

})

/*
# Function : return every messages from the contact db
# Para : none
# Return : return every 
*/
router.get('/mailbox/', async (req, res) => {

  const result = await client.query({
    text: `SELECT * FROM contact`

  })
  console.log(result.rows)
  res.json(result.rows)

})

/*
# Function : insert new contact form into contact db
# Para : Message
# Return : Ok
*/
router.post('/contact', async (req, res) => {
  const email = req.body.email
  const message = req.body.message
  const date = Date()
  const result = await client.query({
    text: `INSERT INTO contact(email, message, date)
    VALUES ($1, $2, $3)
    `,
    values: [email, message, date]
  })

  res.send()
}),


/*
# Function : insert element in the database
# Para : name, description, image, price
# Return : return every articles from the database
*/
router.post('/article', async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  /* Check validity of entry */
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  /* insert into bdd */
  const result = await client.query({
    text: `INSERT INTO articles(name, description, image, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    values: [name, description, image, price]
  })
  const id = result.rows[0].id

  // on envoie l'article ajouté à l'utilisateur
  res.json({
    id: id,
    name: name,
    description: description,
    image: image,
    price: price
  })
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */

 /*
# Function : return every articles from the database
# Para : userId
# Return : return every articles from the database
*/
async function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const result = await client.query({
    text: 'SELECT * FROM articles WHERE id=$1',
    values: [articleId]
  })
  // const article = articles.find(a => a.id === req.articleId)
  if (!result.rows.length) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = result.rows[0]
  next()
}

/*
# Function : Return a specific article
# Para : none
# Return : 
*/
router.route('/article/:articleId')

  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    await client.query({
      text: `UPDATE articles
              SET name=$1,
                  description=$2,
                  image=$3,
                  price=$4
            WHERE id=$5
            `,
      values: [name, description, image, price, req.articleId]
    })
    res.send()
  })

  .delete(parseArticle, async (req, res) => {
    await client.query({
      text: 'DELETE FROM articles WHERE id=$1',
      values: [req.articleId]
    })
    res.send()
  })


module.exports = router
