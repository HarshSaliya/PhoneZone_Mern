import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { toast } from "react-hot-toast";

function Cart() {
    const [authUser] = useAuth(); 
    const [cart, setCart] = useState(null);

    useEffect(() => {
             const fetchCart = async () => {
                    try {
                const response = await axios.get(`http://localhost:4001/cart/${authUser._id}`);
                setCart(response.data);
                } catch (error) {
                toast.error("Error fetching cart:", error);
                }
        };

        fetchCart();
    }, [authUser]);

    const handleRemoveFromCart = async (phoneId) => {
             try {
            const response = await axios.delete("http://localhost:4001/cart/remove", {
                data: { userId: authUser._id, phoneId }
            });
            setCart(response.data); 
            toast.success("Product added to cart!");
             } catch (error) {
            toast.error("Error removing product from cart");
           
        }
    };

    const updateQuantity = async (phoneId, action) => {
                 try {
            const response = await axios.put("http://localhost:4001/cart/update", {
                userId: authUser._id,
                phoneId,
                action
            });
            setCart(response.data);
             } catch (error) {
            console.error("Error updating quantity", error);
            }
    };

    const handleIncreaseQuantity = (phoneId) => updateQuantity(phoneId, "increase");
    const handleDecreaseQuantity = (phoneId) => updateQuantity(phoneId, "decrease");

    if (!cart) return <p>Loading cart...</p>;

    return (

        <>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.products.length === 0 ? (
                <p className="text-lg">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cart.products.map(product => (
                        <li key={product.phoneId._id} className="flex justify-between items-center border p-4 rounded-lg shadow">
                            <div className="flex items-center">
                                <img
                                    src={`http://localhost:4001/${product.phoneId.image}`} 
                                    alt={product.phoneId.name} 
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold">{product.phoneId.name}</h2>
                                    <p className="text-sm">Price: ₹{product.phoneId.price}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            className="btn btn-sm btn-outline mr-2"
                                            onClick={() => handleDecreaseQuantity(product.phoneId._id)}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{product.quantity}</span>
                                        <button
                                            className="btn btn-sm btn-outline ml-2"
                                            onClick={() => handleIncreaseQuantity(product.phoneId._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="font-bold text-lg">Total: ₹{product.phoneId.price * product.quantity}</p>
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => handleRemoveFromCart(product.phoneId._id)}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4">
                <button className="btn btn-primary" onClick={() => alert("Proceeding to payment...")}>
                    Proceed to Payment
                </button>
            </div>
        </div>

        </>
    );
}

export default Cart;
