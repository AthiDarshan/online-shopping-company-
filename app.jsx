
import { useState } from 'react'
import './App.css'

function Product({ productName, price }) {
  return (
    <div className="product">
      <h2>{productName}</h2>
      <p>Price: ₹{price}</p>
    </div>
  )
}

function App() {
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [product, setProduct] = useState(null)
  const [message, setMessage] = useState('')

  const addProduct = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: Number(productId),
          productName,
          price: Number(price),
          category
        })
      })

      const data = await response.json()

      if (response.ok) {
        setProduct({
          productName,
          price: Number(price)
        })

        setMessage('Product saved successfully in MongoDB!')
        setProductId('')
        setProductName('')
        setPrice('')
        setCategory('')
      } else {
        setMessage(data.message || 'Product insertion failed')
      }
    } catch (error) {
      setMessage('Cannot connect to backend')
    }
  }

  return (
    <div className="container">
      <h1>Shopping Cart Management System</h1>

      <form onSubmit={addProduct}>
        <input
          placeholder="Enter Product ID"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          required
        />

        <input
          placeholder="Enter Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Product Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          min="0"
          required
        />

        <input
          placeholder="Enter Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>

      {product && (
        <Product
          productName={product.productName}
          price={product.price}
        />
      )}
    </div>
  )
}

export default App
