import Cart from "../models/cartmodel.js";



export const addToCart = async (req, res) => {
    const { userId, phoneId, quantity = 1 } = req.body;
    
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.phoneId.toString() === phoneId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ phoneId, quantity });
            }

            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = new Cart({
                userId, products: [{ phoneId, quantity }],
            });

            await newCart.save();
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({ message: "Error adding product to cart", error });
    }
};


export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate("products.phoneId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ message: "Error fetching cart", error });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId, phoneId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.products = cart.products.filter(p => p.phoneId.toString() !== phoneId);
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ message: "Error removing item from cart", error });
    }
};


export const updateCart = async (req, res) => {
    const { userId, phoneId, action } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.phoneId.toString() === phoneId);

        if (productIndex > -1) {
            if (action === "increase") {
                cart.products[productIndex].quantity += 1;
            } else if (action === "decrease") {
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity -= 1;
                } else {
                    return res.status(400).json({ message: "Quantity cannot be less than 1." });
                }
            }
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart." });
        }
    } catch (error) {
        console.error("Error updating product quantity:", error);
        return res.status(500).json({ message: "Error updating product quantity", error });
    }
};
