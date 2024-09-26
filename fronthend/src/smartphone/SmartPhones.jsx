import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SmartPhone from '../components/SmartPhone';
import list from "../../public/list.json" 


function SmartPhones() {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>

    <SmartPhone/>
    </div>

    <Footer/>
    </>
  )
}

export default SmartPhones
