// ==================== EXAMPLE USAGE IN REACT COMPONENTS ====================

// ============================================================
// Example 1: Login Component
// ============================================================

import React, { useState } from 'react';
import { authAPI } from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authAPI.login({ email, password });
      console.log('Login successful:', data);
      // Redirect to dashboard or home page
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// ============================================================
// Example 2: Register Component
// ============================================================

import React, { useState } from 'react';
import { authAPI } from '../services/api';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client' // or 'admin'
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await authAPI.register(formData);
      console.log('Registration successful:', data);
      // Redirect to login or dashboard
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// ============================================================
// Example 3: Products List Component
// ============================================================

import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsAPI.getAllProducts();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <p className="stock">Stock: {product.stock}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Example 4: Create Order Component (Shopping Cart Checkout)
// ============================================================

import React, { useState } from 'react';
import { ordersAPI } from '../services/api';

function CheckoutPage({ cartItems }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Format cart items for API
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity
        }))
      };

      const data = await ordersAPI.createOrder(orderData);
      console.log('Order created:', data);
      alert('Order placed successfully!');
      // Clear cart and redirect
      window.location.href = '/orders';
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {error && <div className="error">{error}</div>}
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <h4>{item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}

// ============================================================
// Example 5: User Orders Component
// ============================================================

import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await ordersAPI.getAllOrders();
      setOrders(data.orders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleRateOrder = async (orderId) => {
    const rating = prompt('Rate this order (1-5):');
    const review = prompt('Leave a review:');
    
    if (rating && review) {
      try {
        await ordersAPI.rateOrder(orderId, parseInt(rating), review);
        alert('Thank you for your review!');
        fetchOrders(); // Refresh orders
      } catch (err) {
        alert('Error submitting review');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order #{order._id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index}>
                <p>{item.productId?.name} x {item.quantity}</p>
              </div>
            ))}
          </div>
          {order.status === 'delivered' && !order.rating && (
            <button onClick={() => handleRateOrder(order._id)}>
              Rate Order
            </button>
          )}
          {order.rating && (
            <div className="rating">
              <p>Rating: {order.rating}/5</p>
              <p>Review: {order.review}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Example 6: Protected Route Component
// ============================================================

import React from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function ProtectedRoute({ children }) {
  const isAuthenticated = authAPI.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage in App.js or Router:
// <Route path="/dashboard" element={
//   <ProtectedRoute>
//     <Dashboard />
//   </ProtectedRoute>
// } />

// ============================================================
// Example 7: Admin Product Management Component
// ============================================================

import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsAPI.getAllProducts();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      alert('Product created successfully!');
      setShowForm(false);
      setFormData({ name: '', price: '', stock: '', image: '', description: '' });
      fetchProducts();
    } catch (err) {
      alert('Error creating product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.deleteProduct(productId);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  return (
    <div className="admin-products">
      <h2>Manage Products</h2>
      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Product'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <button type="submit">Create Product</button>
        </form>
      )}

      <div className="products-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  LoginPage,
  RegisterPage,
  ProductsList,
  CheckoutPage,
  MyOrders,
  ProtectedRoute,
  AdminProducts
};
