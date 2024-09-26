import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { toast } from "react-hot-toast";

function Cards({ item }) {
    const [authUser] = useAuth(); 
    const [orderMessage, setOrderMessage] = useState('');

    const handleAddToCart = async () => {
        try {
            const response = await axios.post("http://localhost:4001/cart/add", {
                userId: authUser._id, 
                phoneId: item._id,  quantity: 1 
            });
            console.log(response.data);
            toast.success("Product added to cart!");
        } catch (error) {
            toast.error("Error adding to cart", error);
        }
    };

    const handleBuyNow = async () => {
        try {
            setTimeout(() => {
                toast.success("Thank you for your order!");
            }, 5000);
        } catch (error) {
            toast.error("Currently, the online payment system is not working", error);
        }
    };

    return (
        <>
        <div className='mt-4 mx-2'>
            <div className="card bg-base-100 w-full shadow-xl hover:scale-105 transition-transform duration-300">
                <figure className="h-60 overflow-hidden">
                    <img
                        src={`http://localhost:4001/${item.image}`}
                        alt={item.name}
                        className="object-cover w-full h-full"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl">
                        {item.name}
                        <div className="badge badge-secondary ml-2">{item.category}</div>
                    </h2>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <div className="mt-4">
                        <div className="text-lg font-bold text-blue-600 text-center mb-2">₹{item.price}</div>
                        <div className="flex justify-between">
                            <button className="btn btn-outline btn-sm flex-1 mr-1" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                            <button className="btn btn-primary btn-sm flex-1 ml-1" onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {orderMessage && (
                <div className="mt-4 text-center text-green-600 font-semibold">
                    {orderMessage}
                </div>
            )}
        </div>

        </>
    );
}

export default Cards;
