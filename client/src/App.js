import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Pages
// breeder
import MainPage from './pages/MainPage'
import SignUp from './pages/breeder/SignUp'
import Login from './pages/breeder/Login'
import EditProfile from './pages/breeder/EditProfile'
// cattle
import RegisterCattle from './pages/cattle/RegisterCattle'
import EditCattleInfo from './pages/cattle/EditCattleInfo'
import BreederCattleList from './pages/cattle/BreederCattleList'
// transaction
import ForSaleCattleList from './pages/transaction/ForSaleCattleList'
import SellRequest from './pages/transaction/SellRequest'
import BuyRequest from './pages/transaction/BuyRequest'
import TransactionComplete from './pages/transaction/TransactionComplete'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile/:userId" element={<EditProfile />} />
        <Route path="/registerCattle" element={<RegisterCattle />} />
        <Route path="/edit-cattle/:cattleId" element={<EditCattleInfo />} />
        <Route path="/cattle-list/:userId" element={<BreederCattleList />} />
        <Route path="/sale-cattle-list" element={<ForSaleCattleList />} />
        <Route path="/sell-request/:cattleId" element={<SellRequest />} />
        <Route path="/buy-request/:cattleId" element={<BuyRequest />} />
        <Route path="/transaction-complete" element={<TransactionComplete />} />
      </Routes>
    </Router>
  )
}

export default App
