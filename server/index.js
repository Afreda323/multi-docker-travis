const express = require('express')
const redis = require('redis')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Pool } = require('pg')
const keys = require('./keys')

// Express setup
const app = express()
app.use(bodyParser.json())
app.use(cors())

// PG setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  port: keys.pgPort,
})

pgClient.on('error', () => {
  console.log('Lost contact with PG')
})

pgClient
  .query(`CREATE TABLE IF NOT EXISTS values(number INT)`)
  .catch(console.log)

// Redis setup
const redisClient = redis.createClient({
  port: keys.redisPort,
  host: keys.redisHost,
  retry_strategy: () => 1000,
})
const redisPublisher = redisClient.duplicate()

// Express routes
app.get('/', () => {
  resizeBy.send('suhh')
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query(`SELECT * FROM values`)
  res.json(values.rows)
})

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.json(values)
  })
})

app.post('/values', async (req, res) => {
  const { index } = req.body

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high')
  }

  redisClient.hset('values', index, 'Nothing yet')
  redisPublisher.publish('insert', index)

  pgClient.query(`INSERT INTO values(number) VALUES($1)`, [index])

  res.send('Working on it')
})

app.listen(5000, () => {
  console.log('Up on 5000!')
})
