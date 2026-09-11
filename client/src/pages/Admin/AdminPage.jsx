import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import API_URL from '../../services/config'

const statusColors = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dbeafe', color: '#1e40af' },
  preparing:          { bg: '#fce7f3', color: '#9d174d' },
  ready:              { bg: '#d1fae5', color: '#065f46' },
  'out-for-delivery': { bg: '#e0e7ff', color: '#3730a3' },
  delivered:          { bg: '#dcfce7', color: '#14532d' },
  cancelled:          { bg: '#fee2e2', color: '#991b1b' },
}

const statusOptions = [
  'pending', 'confirmed', 'preparing', 'ready',
  'out-for-delivery', 'delivered', 'cancelled'
]

function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [dashboard, setDashboard] = useState(null)
  const [orders, setOrders]       = useState([])
  const [products, setProducts]   = useState([])
  const [customers, setCustomers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]     = useState(false)

  // Product form
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct]   = useState(null)
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', stock: '', emoji: '☕',
    category: '', isFeatured: false, isAvailable: true
  })

  useEffect(() => {
    if (authLoading) return
    if (!user || user.role !== 'admin') {
      navigate('/login')
      return
    }
    fetchDashboard()
  }, [user, authLoading])

  useEffect(() => {
    if (activeTab === 'orders')    fetchOrders()
    if (activeTab === 'products')  { fetchProducts(); fetchCategories() }
    if (activeTab === 'customers') fetchCustomers()
    if (activeTab === 'dashboard') fetchDashboard()
  }, [activeTab])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${API_URL}/admin/dashboard`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setDashboard(data.dashboard)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${API_URL}/admin/orders`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${API_URL}/admin/products`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setProducts(data.products)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const res  = await fetch(`${API_URL}/categories`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setCategories(data.categories || data)
    } catch (err) { console.error(err) }
  }

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${API_URL}/admin/customers`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setCustomers(data.customers)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleStatusUpdate = async (orderId, orderStatus) => {
    await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ orderStatus })
    })
    fetchOrders()
    if (activeTab === 'dashboard') fetchDashboard()
  }

  const handleStockUpdate = async (id, stock) => {
    await fetch(`${API_URL}/admin/products/${id}/stock`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ stock: Number(stock) })
    })
    fetchProducts()
    if (activeTab === 'dashboard') fetchDashboard()
  }

  const adjustStock = (product, delta) => {
    const newStock = Math.max(0, (product.stock || 0) + delta)
    handleStockUpdate(product._id, newStock)
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    fetchProducts()
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || 0,
      emoji: product.emoji || '☕',
      category: product.category?._id || product.category || '',
      isFeatured: product.isFeatured || false,
      isAvailable: product.isAvailable !== false
    })
    setShowProductForm(true)
  }

  const handleProductSubmit = async () => {
    const url = editingProduct
      ? `${API_URL}/admin/products/${editingProduct._id}`
      : `${API_URL}/admin/products`

    const body = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      slug: productForm.name.toLowerCase().replace(/\s+/g, '-')
    }

    await fetch(url, {
      method: editingProduct ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    setShowProductForm(false)
    setEditingProduct(null)
    fetchProducts()
  }

  const tabStyle = (tab) => ({
    padding: '0.75rem 1.25rem',
    border: 'none',
    borderBottom: activeTab === tab ? '3px solid var(--espresso)' : '3px solid transparent',
    backgroundColor: 'transparent',
    color: activeTab === tab ? 'var(--espresso)' : 'var(--text-light)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: activeTab === tab ? 600 : 400,
    fontSize: '0.9rem',
    cursor: 'pointer'
  })

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '1.5rem',
    boxShadow: '0 2px 12px rgba(44,26,14,0.08)',
    marginBottom: '1rem'
  }

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.9rem',
    borderRadius: 8,
    border: '2px solid var(--beige)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box'
  }

  if (authLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Loading...</div>
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{
        width: 220,
        backgroundColor: 'var(--espresso)',
        color: 'var(--cream)',
        padding: '2rem 0',
        minHeight: '100vh',
        flexShrink: 0
      }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.3rem',
          fontWeight: 700,
          padding: '0 1.5rem',
          marginBottom: '2rem'
        }}>
          Admin Panel
        </div>
        {[
          { tab: 'dashboard', label: '📊 Dashboard' },
          { tab: 'orders',    label: '📦 Orders' },
          { tab: 'products',  label: '☕ Products' },
          { tab: 'customers', label: '👥 Customers' },
        ].map(({ tab, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '0.85rem 1.5rem',
              border: 'none',
              backgroundColor: activeTab === tab ? 'var(--coffee)' : 'transparent',
              color: 'var(--cream)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: activeTab === tab ? 600 : 400,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '0.85rem 1.5rem',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'var(--beige)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            cursor: 'pointer',
            marginTop: '2rem'
          }}
        >
          ← Back to Site
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>

        {/* ── DASHBOARD ── */}
        {activeTab === 'dashboard' && dashboard && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1.5rem' }}>
              Dashboard
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Orders',  value: dashboard.totalOrders },
                { label: 'Active Orders', value: dashboard.activeOrders },
                { label: 'Products',      value: dashboard.totalProducts },
                { label: 'Customers',     value: dashboard.totalUsers },
                { label: 'Revenue',       value: `₹${dashboard.totalRevenue}` },
              ].map(({ label, value }) => (
                <div key={label} style={cardStyle}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.4rem' }}>{label}</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--espresso)' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Low stock alerts */}
            {dashboard.lowStockProducts?.length > 0 && (
              <div style={{ ...cardStyle, borderLeft: '4px solid #dc2626' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#dc2626', marginBottom: '1rem' }}>
                  ⚠️ Low Stock Alerts
                </h3>
                {dashboard.lowStockProducts.map(p => (
                  <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                    <span>{p.emoji} {p.name}</span>
                    <span style={{ color: '#dc2626', fontWeight: 600 }}>{p.stock} left</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent orders */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1rem' }}>
                Recent Orders
              </h3>
              {dashboard.recentOrders?.map(order => (
                <div key={order._id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.75rem 0', borderBottom: '1px solid var(--beige)',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.9rem'
                }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{order.user?.name || 'Guest'}</span>
                    <span style={{ color: 'var(--text-light)', marginLeft: '0.75rem' }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: statusColors[order.orderStatus]?.bg,
                      color: statusColors[order.orderStatus]?.color,
                      padding: '0.25rem 0.6rem', borderRadius: 12, fontSize: '0.75rem', fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                      {order.orderStatus}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--espresso)' }}>₹{order.total}</span>
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

            {loading ? (
              <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>Loading...</p>
            ) : orders.map(order => (
              <div key={order._id} style={cardStyle}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                      Order #{order._id.slice(-8).toUpperCase()} · {new Date(order.createdAt).toLocaleString('en-IN')}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--espresso)', marginTop: '0.25rem' }}>
                      👤 {order.user?.name || 'Guest'} · {order.user?.email || '—'}
                    </p>
                  </div>
                  <select
                    value={order.orderStatus}
                    onChange={e => handleStatusUpdate(order._id, e.target.value)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: 8,
                      border: '2px solid var(--beige)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      backgroundColor: statusColors[order.orderStatus]?.bg,
                      color: statusColors[order.orderStatus]?.color,
                      cursor: 'pointer'
                    }}
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
                    ))}
                  </select>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {order.items.map((item, i) => (
                    <span key={i} style={{
                      backgroundColor: 'var(--beige)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 20,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem'
                    }}>
                      {item.emoji} {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>

                {/* Meta + Address */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--beige)', paddingTop: '0.75rem' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                    <span>{order.fulfillment === 'delivery' ? '🚀 Delivery' : '🏪 Pickup'}</span>
                    <span style={{ margin: '0 0.75rem' }}>·</span>
                    <span>💳 {order.paymentMethod?.toUpperCase()}</span>
                    <span style={{ margin: '0 0.75rem' }}>·</span>
                    <span style={{ color: order.paymentStatus === 'paid' ? 'green' : 'inherit', fontWeight: order.paymentStatus === 'paid' ? 600 : 400 }}>
                      {order.paymentStatus === 'paid' ? '✅ Paid' : order.paymentStatus}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--espresso)', fontSize: '1.1rem' }}>
                    ₹{order.total}
                  </p>
                </div>

                {order.address && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--off-white)', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                    📍 {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                    {order.address.phone && <span> · 📞 {order.address.phone}</span>}
                  </div>
                )}
              </div>
            ))}
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
                onClick={() => {
                  setEditingProduct(null)
                  setProductForm({ name: '', description: '', price: '', stock: 10, emoji: '☕', category: categories[0]?._id || '', isFeatured: false, isAvailable: true })
                  setShowProductForm(true)
                }}
                style={{
                  backgroundColor: 'var(--espresso)', color: 'var(--cream)',
                  border: 'none', borderRadius: 8, padding: '0.65rem 1.25rem',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600
                }}
              >
                + Add Product
              </button>
            </div>

            {showProductForm && (
              <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '1rem' }}>
                  {editingProduct ? 'Edit Product' : 'New Product'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>Name</label>
                    <input value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>Emoji</label>
                    <input value={productForm.emoji} onChange={e => setProductForm({ ...productForm, emoji: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>Price (₹)</label>
                    <input type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>Stock</label>
                    <input type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>Category</label>
                    <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} style={inputStyle}>
                      <option value="">Select</option>
                      {categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={handleProductSubmit} style={{
                    backgroundColor: 'var(--espresso)', color: 'var(--cream)',
                    border: 'none', borderRadius: 8, padding: '0.65rem 1.5rem',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600
                  }}>
                    {editingProduct ? 'Update' : 'Add Product'}
                  </button>
                  <button onClick={() => setShowProductForm(false)} style={{
                    backgroundColor: 'transparent', border: '2px solid var(--beige)',
                    borderRadius: 8, padding: '0.65rem 1.5rem', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

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
                  {products.map(product => {
                    const isLow = product.stock <= (product.lowStockThreshold || 5)
                    return (
                      <tr key={product._id} style={{ borderBottom: '1px solid var(--beige)', backgroundColor: isLow ? '#fef2f2' : 'transparent' }}>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ marginRight: '0.5rem' }}>{product.emoji}</span>
                          <span style={{ fontWeight: 600 }}>{product.name}</span>
                          {isLow && <span style={{ marginLeft: '0.5rem', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600 }}>LOW</span>}
                        </td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{product.category?.name || '—'}</td>
                        <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--espresso)' }}>₹{product.price}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <button
                              onClick={() => adjustStock(product, -1)}
                              style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--beige)', background: '#fff', cursor: 'pointer', fontWeight: 700 }}
                            >−</button>
                            <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 600, color: isLow ? '#dc2626' : 'inherit' }}>
                              {product.stock}
                            </span>
                            <button
                              onClick={() => adjustStock(product, 1)}
                              style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--beige)', background: '#fff', cursor: 'pointer', fontWeight: 700 }}
                            >+</button>
                            <button
                              onClick={() => adjustStock(product, 10)}
                              title="Restock +10"
                              style={{
                                marginLeft: '0.5rem', padding: '0.25rem 0.5rem',
                                borderRadius: 6, border: 'none', backgroundColor: 'var(--caramel)',
                                color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer'
                              }}
                            >
                              +10
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEditProduct(product)} style={{
                              backgroundColor: 'var(--caramel)', color: '#fff', border: 'none',
                              borderRadius: 6, padding: '0.4rem 0.75rem', cursor: 'pointer',
                              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600
                            }}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)} style={{
                              backgroundColor: '#dc2626', color: '#fff', border: 'none',
                              borderRadius: 6, padding: '0.4rem 0.75rem', cursor: 'pointer',
                              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600
                            }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
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
                  {customers.map(c => (
                    <tr key={c._id} style={{ borderBottom: '1px solid var(--beige)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{c.email}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{c.phone || '—'}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>
                        {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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