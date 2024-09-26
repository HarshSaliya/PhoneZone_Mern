import React from 'react';
import Home from "./home/Home"
// import AdminPanel from './components/AdminPanel';
import AdminPanels from './adminpanel/AdminPanels';
import { Navigate, Route ,Routes } from "react-router-dom";
import SmartPhones from './smartPhone/SmartPhones';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Carts from './cart/Carts';
import { useAuth } from './context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const [authUser ,setAuthUser] =useAuth();

 
  return (
    <>
    
   

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/SmartPhone' element={authUser?<SmartPhones />:<Navigate to="/signup"/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/cart' element={authUser ? <Carts /> : <Navigate to="/signup" />} />
      <Route path="/admin" element={authUser?.isAdmin ? <AdminPanels authUser={authUser} /> : <Navigate to="/" />} />

     
    </Routes>
    <Toaster/>
    </>
  )
}
export default App;