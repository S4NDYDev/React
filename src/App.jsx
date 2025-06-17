import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import AreasResponsables from './components/pages/AreasResponsables'
import Acceso from './components/pages/placeholders/Acceso'
import Contacto from './components/pages/placeholders/Contacto'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Navbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/areas-responsables" element={<AreasResponsables />} />
              <Route path="/acceso" element={<Acceso />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
