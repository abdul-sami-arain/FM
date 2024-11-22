import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const singleProductContext = createContext();

export const AddCartProvider = ({ children }) => {
    // get cart from local storage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    // Save cart to local storage when cart change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    const [singleProduct, setSingleProduct] = useState({})

    const addToCart = (product, quantity = 1) => {
        const checkProduct = cart.find((item) => item.product.uid === product.uid)
        if (checkProduct) {
            // console.log("existing product", checkProduct)
            setCart((prevCart) => {
                return prevCart.map(item =>
                    item.product.uid === product.uid
                        ? {
                            ...item,
                            product: {
                            ...item.product,
                            quantity: item.product.quantity + quantity,
                                // sub_total: parseFloat(item.product.regular_price) * (item.product.quantity + quantity),
                                // total_price: parseFloat(item.product.regular_price) * (item.product.quantity + quantity),
                            },
                        }
                        : item
                );
            });
        } else {
            const newProduct = {
                product: {
                    ...product,
                    quantity: 1,
                    // sub_total: parseFloat(product.regular_price) * quantity,
                    // total_price: parseFloat(product.regular_price) * quantity,
                },
            };
            // console.log("new product", singleProduct)
            return setSingleProduct(newProduct);
        }


    };

    const removeFromCart = (uid) => {
        setCart((prevCart) => prevCart.filter(item => item.product.uid !== uid));
    };

    const getProductFromCart = (uid) => {
        return cart.find(item => item.product.uid === uid) || null;
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.product.sub_total, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            getProductFromCart,
            calculateTotalPrice,
        }}>
            {children}
        </CartContext.Provider>
    );
}


// SingleProductProvider Component
// export const SingleProductProvider = ({ children }) => {
//     const { cart } = useCart();
//     const [singleProduct, setSingleProduct] = useState(() => {
//         const savedSingleProduct = localStorage.getItem("singleProduct");
//         return savedSingleProduct ? JSON.parse(savedSingleProduct) : {};
//     });

//     useEffect(() => {
//         localStorage.setItem("singleProduct", JSON.stringify(singleProduct));
//     }, [singleProduct]);

//     const addSingleProduct = (product) => {
//         setSingleProduct({
//             ...product,
//             quantity: 1,
//             is_protected: 0,
//         });
//     };

//     const checkOrLoadSingleProduct = (product) => {
//         const existingProduct = cart.find(item => item.product.uid === product.uid);

//         if (existingProduct) {
//             console.log("returning object from cart", existingProduct)
//             // If the product is found in the cart, return the product from the cart
//             return existingProduct.product;
//         } else {
//             // If the product is not in the cart, store it in the singleProduct state
//             setSingleProduct({
//                 ...product,
//                 quantity: 1,
//                 is_protected: 0,
//             });
//             console.log("returning product from single product", singleProduct)
//             return product;  // Return the product to the caller
//         }
//     };

//     const increaseQuantity = () => {
//         setSingleProduct(prevState => ({
//             ...prevState,
//             quantity: (prevState.quantity || 1) + 1,
//         }));
//     };

//     const decreaseQuantity = () => {
//         setSingleProduct(prevState => ({
//             ...prevState,
//             quantity: Math.max((prevState.quantity || 1) - 1, 1),
//         }));
//     };

//     return (
//         <singleProductContext.Provider value={{
//             singleProduct,
//             addSingleProduct,
//             checkOrLoadSingleProduct,
//             increaseQuantity,
//             decreaseQuantity,
//         }}>
//             {children}
//         </singleProductContext.Provider>
//     );
// };


export const useCart = () => useContext(CartContext);
// export const useSingleProductContext = () => useContext(singleProductContext);