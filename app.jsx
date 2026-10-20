
import { useState, useEffect } from 'react'
import './App.css'

function Product({ productName, price }) {
  const [productPrice, setProductPrice] = useState(price)

  useEffect(() => {
    console.log("Shopping Cart System Loaded")
  }, [])

  return (
    <div className="product">
      <h2>{productName}</h2>
      <p>Price: ₹{productPrice}</p>

      <button onClick={() => setProductPrice(Math.max(0, productPrice - 200))}>
        Apply ₹200 Discount
      </button>
    </div>
  )
}

function App() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [product, setProduct] = useState(null)

  const addProduct = (e) => {
    e.preventDefault()

    setProduct({
      productName: name,
      price: Number(price)
    })
  }

  return (
    <div className="container">
      <h1>Shopping Cart Management System</h1>

      <form onSubmit={addProduct}>
        <input
          placeholder="Enter Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Product Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          min="200"
          required
        />

        <button type="submit">Add Product</button>
      </form>

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
