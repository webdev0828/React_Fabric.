import React from 'react'
import MainMenu from '../components/layout/MainMenu'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const DefaultLayout = ({ children }) => (
  <div className="bg-dark dk" id="wrap">
    <MainMenu />
    <Header />
    {children}
    <Footer />
  </div>
)

export default DefaultLayout
