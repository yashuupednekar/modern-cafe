import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import MenuPage from './pages/Menu/MenuPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import CartPage from './pages/Cart/CartPage'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import OrdersPage from './pages/Orders/OrdersPage'
import AccountPage from './pages/Account/AccountPage'
import AdminPage from './pages/Admin/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App