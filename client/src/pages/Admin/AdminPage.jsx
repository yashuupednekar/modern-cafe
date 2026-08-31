import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'

const statusColors = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dbeafe', color: '#1e40af' },
  preparing:          { bg: '#fce7f3', color: '#9d174d' },
  ready:              { bg: '#d1fae5', color: '#065f46' },
  'out-for-delivery': { bg: '#e0e7ff', color: '#3730a3' },
  delivered:          { bg: '#dcfce7', color: '#14532d' },
  cancelled:          { bg: '#fee2e2', color: '#991b1b' },
}

const orderStatuses = ['pending','confirmed','preparing','ready','out-for-delivery','delivered','cancelled']

function AdminPage() {
  const { user } = useAuth()
  const navigate  = useNavigate()

  const [activeTab, setActiveTab]     = useState('dashboard')
  const [dashboard, setDashboard]     = useState(null)
  const [orders, setOrders]           = useState([])
  const [products, setProducts]       = useState([])
  const [customers, setCustomers]     = useState([])
  const [loading, setLoading]         = useState(true)

  // Product form
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct]   = useState(null)
  const [productForm, setProductForm]         = useState({
    name: '', slug: '', description: '', price: '', emoji: '☕', stock: '', category: ''
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'admin') { navigate('/'); return }
    fetchDashboard()
    fetchCategories()
  }, [user])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const res  = await fetch('http://localhost:5000/api/admin/dashboard', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setDashboard(data.dashboard)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res  = await fetch('http://localhost:5000/api/admin/orders', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res  = await fetch('http://localhost:5000/api/admin/products', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setProducts(data.products)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const res  = await fetch('http://localhost:5000/api/admin/customers', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setCustomers(data.customers)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const res  = await fetch('http://localhost:5000/api/categories', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setCategories(data.categories)
    } catch (err) { console.error(err) }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') fetchDashboard()
    if (tab === 'orders')    fetchOrders()
    if (tab === 'products')  fetchProducts()
    if (tab === 'customers') fetchCustomers()
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderStatus: status })
      })
      fetchOrders()
    } catch (err) { console.error(err) }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await fetch(`http://localhost:5000/api/admin/products/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    fetchProducts()
  }

  const handleProductSubmit = async () => {
    const url    = editingProduct
      ? `http://localhost:5000/api/admin/products/${editingProduct._id}`
      : 'http://localhost:5000/api/admin/products'
    const method = editingProduct ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...productForm, price: Number(productForm.price), stock: Number(productForm.stock) })
    })
    setShowProductForm(false)
    setEditingProduct(null)
    setProductForm({ name: '', slug: '', description: '', price: '', emoji: '☕', stock: '', category: '' })
    fetchProducts()
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name:        product.name,
      slug:        product.slug,
      description: product.description,
      price:       product.price,
      emoji:       product.emoji,
      stock:       product.stock,
      category:    product.category?._id || ''
    })
    setShowProductForm(true)
  }

  const handleStockUpdate = async (id, stock) => {
    await fetch(`http://localhost:5000/api/admin/products/${id}/stock`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ stock: Number(stock) })
    })
    fetchProducts()
  }

  const sidebarStyle = {
    width: 220,
    backgroundColor: 'var(--espresso)',
    minHeight: '100vh',
    padding: '1.5rem 0',
    flexShrink: 0
  }

  const tabStyle = (tab) => ({
    display: 'block',
    width: '100%',
    padding: '0.85rem 1.5rem',
    backgroundColor: activeTab === tab ? 'var(--coffee)' : 'transparent',
    color: 'var(--cream)',
    border: 'none',
    textAlign: 'left',
    fontFamily: 'Inter, sans-serif',
    fontWeight: activeTab === tab ? 600 : 400,
    fontSize: '0.95rem',
    cursor: 'pointer',
    borderLeft: activeTab === tab ? '3px solid var(--caramel)' : '3px solid transparent'
  })

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '1.5rem',
    boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
  }

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 1rem',
    borderRadius: 8,
    border: '2px solid var(--beige)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box'
  }

  if (loading && !dashboard) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      Loading admin panel...
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--off-white)' }}>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: '0 1.5rem 1.5rem', borderBottom: '1px solid rgba(245,236,215,0.15)' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--cream)', fontSize: '1.2rem' }}>
            Modern Cafe
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--caramel)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Admin Panel
          </p>
        </div>

        <nav style={{ marginTop: '1rem' }}>
          {[
            { tab: 'dashboard', label: '📊 Dashboard' },
            { tab: 'orders',    label: '📦 Orders'    },
            { tab: 'products',  label: '☕ Products'  },
            { tab: 'customers', label: '👥 Customers' },
          ].map(({ tab, label }) => (
            <button key={tab} onClick={() => handleTabChange(tab)} style={tabStyle(tab)}>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: '1.5rem', padding: '0 1.5rem' }}>
          <a href="/" style={{ color: 'var(--cream)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', opacity: 0.7, textDecoration: 'none' }}>
            ← Back to Site
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

        {/* ── DASHBOARD ── */}
        {activeTab === 'dashboard' && dashboard && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1.5rem' }}>
              Dashboard
            </h1>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Orders',   value: dashboard.totalOrders,   icon: '📦' },
                { label: 'Active Orders',  value: dashboard.activeOrders,  icon: '🔥' },
                { label: 'Total Products', value: dashboard.totalProducts, icon: '☕' },
                { label: 'Customers',      value: dashboard.totalUsers,    icon: '👥' },
                { label: 'Revenue (Paid)', value: `₹${dashboard.totalRevenue}`, icon: '💰' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ ...cardStyle, textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', fontSize: '1.5rem', fontWeight: 700 }}>{value}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', fontSize: '0.85rem' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Low Stock */}
            {dashboard.lowStockProducts.length > 0 && (
              <div style={{ ...cardStyle, marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#dc2626', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  ⚠️ Low Stock Alert
                </h2>
                {dashboard.lowStockProducts.map(p => (
                  <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--beige)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                    <span>{p.emoji} {p.name}</span>
                    <span style={{ color: '#dc2626', fontWeight: 600 }}>Stock: {p.stock}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Orders */}
            <div style={cardStyle}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                Recent Orders
              </h2>
              {dashboard.recentOrders.map(order => (
                <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--beige)', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      {order.user?.name || 'Guest'}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      backgroundColor: statusColors[order.orderStatus]?.bg,
                      color: statusColors[order.orderStatus]?.color,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 20,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {order.orderStatus}
                    </span>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--espresso)' }}>
                      ₹{order.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab === 'orders' && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1.5rem' }}>
              Orders ({orders.length})
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map(order => (
                <div key={order._id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--text-dark)' }}>
                        {order.user?.name} — #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}{order.fulfillment} · ₹{order.total}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                        {order.items.map((item, i) => (
                          <span key={i} style={{ backgroundColor: 'var(--beige)', padding: '0.2rem 0.6rem', borderRadius: 20, fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
                            {item.emoji} {item.name} ×{item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status Selector */}
                    <div>
                      <select
                        value={order.orderStatus}
                        onChange={e => updateOrderStatus(order._id, e.target.value)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: 8,
                          border: '2px solid var(--beige)',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          backgroundColor: statusColors[order.orderStatus]?.bg,
                          color: statusColors[order.orderStatus]?.color
                        }}
                      >
                        {orderStatuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)' }}>
                Products ({products.length})
              </h1>
              <button
                onClick={() => { setShowProductForm(true); setEditingProduct(null); setProductForm({ name: '', slug: '', description: '', price: '', emoji: '☕', stock: '', category: '' }) }}
                style={{ backgroundColor: 'var(--espresso)', color: 'var(--cream)', border: 'none', borderRadius: 8, padding: '0.65rem 1.25rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                + Add Product
              </button>
            </div>

            {/* Product Form */}
            {showProductForm && (
              <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1rem' }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { label: 'Name',        key: 'name',        placeholder: 'Cappuccino' },
                    { label: 'Slug',        key: 'slug',        placeholder: 'cappuccino' },
                    { label: 'Price (₹)',   key: 'price',       placeholder: '180' },
                    { label: 'Stock',       key: 'stock',       placeholder: '50' },
                    { label: 'Emoji',       key: 'emoji',       placeholder: '☕' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>{label}</label>
                      <input
                        value={productForm[key]}
                        onChange={e => setProductForm({ ...productForm, [key]: e.target.value })}
                        placeholder={placeholder}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>Category</label>
                    <select
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Product description..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={handleProductSubmit} style={{ backgroundColor: 'var(--espresso)', color: 'var(--cream)', border: 'none', borderRadius: 8, padding: '0.65rem 1.5rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button onClick={() => setShowProductForm(false)} style={{ backgroundColor: 'transparent', color: 'var(--text-dark)', border: '2px solid var(--beige)', borderRadius: 8, padding: '0.65rem 1.5rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--beige)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-light)', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} style={{ borderBottom: '1px solid var(--beige)' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ marginRight: '0.5rem' }}>{product.emoji}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{product.name}</span>
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{product.category?.name}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--espresso)' }}>₹{product.price}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <input
                          type="number"
                          defaultValue={product.stock}
                          onBlur={e => handleStockUpdate(product._id, e.target.value)}
                          style={{ width: 70, padding: '0.3rem 0.5rem', borderRadius: 6, border: '2px solid var(--beige)', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditProduct(product)} style={{ backgroundColor: 'var(--caramel)', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 0.75rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
                          <button onClick={() => handleDeleteProduct(product._id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 0.75rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CUSTOMERS ── */}
        {activeTab === 'customers' && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1.5rem' }}>
              Customers ({customers.length})
            </h1>
            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--beige)' }}>
                    {['Name', 'Email', 'Phone', 'Joined'].map(h => (
                      <th key={h} style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-light)', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer._id} style={{ borderBottom: '1px solid var(--beige)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-dark)' }}>{customer.name}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{customer.email}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{customer.phone || '—'}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>
                        {new Date(customer.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminPage