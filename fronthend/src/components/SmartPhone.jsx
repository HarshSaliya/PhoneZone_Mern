import React, { useEffect, useState } from "react";
import Cards from './cards';
import list from "../../public/list.json"; 
import { Link } from 'react-router-dom';
import axios from "axios";


function SmartPhone() {

  
    const [phone, setPhone] = useState([]);
    useEffect(() => {
      const getPhone = async () => {
        try {
          const res = await axios.get("http://localhost:4001/phone");
          console.log(res.data);
          setPhone(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getPhone();
    }, []);

  return (
    <>
    <div  className='max-w-screen-2x1 container mx-auto md:px-20 px-4'>
    <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
          Discover the future of smartphones with cutting-edge technology, sleek designs, and unbeatable prices. Find the perfect phone that matches your style and needs – all in one place!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          

                {phone.map((item, index) => (
              <Cards item={item} key={`${item.id}-${index}`} />
          ))}
        </div>
      </div>
      </div>
    </>
  )
}

export default SmartPhone
