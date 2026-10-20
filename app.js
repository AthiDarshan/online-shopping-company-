
import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)

async function startServer() {
  try {
    await client.connect()
    console.log('MongoDB connected successfully')

    const db = client.db('db_456qba72c')
    const products = db.collection('products')

    app.post('/products', async (req, res) => {
      try {
        const { productId, productName, price, category } = req.body

        const result = await products.insertOne({
          productId: Number(productId),
          productName,
          price: Number(price),
          category
        })

        res.status(201).json({
          message: 'Product inserted successfully',
          insertedId: result.insertedId
        })
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
    })

    app.get('/products', async (req, res) => {
      try {
        const data = await products.find().toArray()
        res.json(data)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
    })

    app.listen(5000, () => {
      console.log('Server running on port 5000')
    })
  } catch (error) {
    console.log('MongoDB connection error:', error.message)
  }
}

startServer()
