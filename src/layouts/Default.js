import React from 'react'
import MainMenu from '../components/layout/MainMenu'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Sidebar from '../components/layout/wrestling_mat_designer/Sidebar'
import Content from '../components/layout/wrestling_mat_designer/Content'

const DefaultLayout = ({ children }) => (
  <div className="bg-dark dk" id="wrap">
    <MainMenu />
    <Header />
    <Sidebar />
    <Content />
    {children}
    <Footer />
  </div>
)

export default DefaultLayout
