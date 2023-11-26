import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Pages
import MainPagePage from './pages/MainPage'
// breeder
import LoginPage from './pages/breeder/LoginPage'
import EditProfilePage from './pages/breeder/EditProfilePage'
// cattle
import RegisterCattlePage from './pages/cattle/RegisterCattlePage'
import EditCattleInfoPage from './pages/cattle/EditCattleInfoPage'
import BreederCattleListPage from './pages/cattle/BreederCattleListPage'
// transaction
import ForSaleCattleListPage from './pages/transaction/ForSaleCattleListPage'
import SellRequestPage from './pages/transaction/SellRequestPage'
import BuyRequestPage from './pages/transaction/BuyRequestPage'
import TransactionCompletePage from './pages/transaction/TransactionCompletePage'
// UI
import Layout from './components/UI/Layout'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPagePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/edit-profile/:userId" element={<EditProfilePage />} />
          <Route path="/registerCattle" element={<RegisterCattlePage />} />
          <Route
            path="/edit-cattle/:cattleId"
            element={<EditCattleInfoPage />}
          />
          <Route
            path="/cattle-list/:userId"
            element={<BreederCattleListPage />}
          />
          <Route path="/sale-cattle-list" element={<ForSaleCattleListPage />} />
          <Route path="/sell-request/:cattleId" element={<SellRequestPage />} />
          <Route path="/buy-request/:cattleId" element={<BuyRequestPage />} />
          <Route
            path="/transaction-complete"
            element={<TransactionCompletePage />}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
