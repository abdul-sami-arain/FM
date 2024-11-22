import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext()

export const CartProvider = ({children}) => {

    // initialize cart from local storage
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(50)
    const [taxValue, setTaxValue] = useState(0);
    const [grandValue, setGrandValue] = useState(0);
    // let subTotal = 0;
    // let deliveryCharges = 50;
    // let taxValue = 10;
    // let grandValue = 0;
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    })

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // save cart to local storage when eer it changes
    useEffect(() => {
        
        localStorage.setItem('cart', JSON.stringify(cart));
        // console.log("cart storage", cart)
    }, [cart])

    const [singleProduct, setSingleProduct] = useState(() => {
        const savedSingleProduct = localStorage.getItem('singleProduct');
        return savedSingleProduct ? JSON.parse(savedSingleProduct) : []
    });
    useEffect(() => {
        const storedSingleProduct = localStorage.getItem('singleProduct');
        if (storedSingleProduct) {
            setSingleProduct(JSON.parse(storedSingleProduct));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('singleProduct', JSON.stringify(singleProduct));
        // console.log("cart storage", cart)
    }, [singleProduct])

    const addSingleProduct = (product) => {
        setSingleProduct((prevState) => ({
            ...product,
            quantity: prevState.quantity || 1,
            is_protected: 0
        }))
    }

    // Add Items To Cart
    const addToCart = (product, LocalQuantity, isProtected) => {
        // setCart((prevCart) => {
        //     const existingProduct = prevCart.find(item => item.product.uid === product.uid);

        //     const updatedProduct = {
        //         ...product,
        //         is_protected: 0,
        //         protection_value: 0,
        //         quantity: 1,
        //         totalPrice: product.reguler_price * (existingProduct ? existingProduct.quantity + 1 : 1)
        //     };
        //     console.log("updated product price", updatedProduct)

        //     if (existingProduct) {
        //         return prevCart.map(item =>
        //             item.product.uid === product.uid
        //                 ? { ...item, quantity: item.quantity + 1, totalPrice: updatedProduct.totalPrice }
        //                 : item
        //         );
        //     } else {
        //         return [...prevCart, { product: updatedProduct, quantity: 1 }];
        //     }
        // });
        console.log("isProtected context value", isProtected)
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.product.uid === product.uid);
            // const quantityToAdd = singleProduct?.quantity || 1;
            if(existingProduct){
                // console.log("single product quantity", singleProduct)
                return prevCart.map(item => 
                    item.product.uid === product.uid ? {
                        ...item.product,
                        product: {
                            ...item.product,
                            quantity: LocalQuantity,
                            is_protected: isProtected ? 1 : 0,
                            protected_value: isProtected ? 99 : 0,
                            // sub_total: parseFloat(item.product.regular_price) * (item.product.quantity),
                            // total_price: parseFloat(item.product.regular_price) * (item.product.quantity)
                        }
                    } : item
                );
            }else{
                const newProduct = {
                    product: {
                        ...product,
                        is_protected: isProtected ? 1 : 0,
                        protected_value: isProtected ? 99 : 0,
                        quantity: LocalQuantity,
                        sub_total: parseFloat(product.regular_price) * (product.quantity || 1),
                        total_price: parseFloat(product.regular_price) * (product.quantity || 1)
                    }
                };
                console.log("new quantity added from local", cart)
                return [...prevCart, newProduct]
            }
        })
    };


    // Remove Cart Item
    const removeFromCart = (uid) => {
        setCart((prevCart) => prevCart.filter(item => item.product.uid !== uid));
    };


    const increamentQuantity = (uid) => {
        
        setCart((prevCart) => {
            // Ensure prevCart is not undefined
            if (!prevCart) return [];

            return prevCart.map(item =>
                item.product.uid === uid
                    ? {
                        ...item,
                        product: {
                            ...item.product,
                            quantity: item.product.quantity + 1,
                            sub_total: parseFloat(item.product.regular_price) * (item.product.quantity),
                            total_price: parseFloat(item.product.regular_price) * (item.product.quantity),
                        }
                    }
                    : item
            );
        });
    };

    // Decrement Product Quantity
    const decreamentQuantity = (uid) => {
        // getGrandTotal()
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item =>
                item.product.uid === uid
                    ? {
                        ...item,
                        product: {
                            ...item.product,
                            quantity: Math.max((item.product.quantity || 1) - 1, 1), // Fallback to 1 if quantity is undefined
                            sub_total: parseFloat(item.product.regular_price) * (item.product.quantity), 
                            total_price: parseFloat(item.product.regular_price) * (item.product.quantity), 
                        }
                    }
                    : item
            );

            return updatedCart.filter(item => item.product.quantity > 0);
        });
    };
    // Calculate total orders price
    
    

    const calculateTotalPrice = () => {
        if(!Array.isArray(cart)){
            console.error("Invalid Array", cart);
            return 0;
        }


        let total = cart.reduce((price, item) => price + item.product.sub_total, 0);
        console.log("price val", total)
        setSubTotal(total)
        // for(const item of cart){
        //     const price = parseFloat((
        //         item.product.sub_total
        //     ))
            
        //     if(!isNaN(price)){
        //         total += price
        //     }
        // }
        // return total 
    };

    useEffect(() => {
        calculateTotalPrice()
        
    }, [cart]);

    

    return (
        <CartContext.Provider value={
            {
                cart, 
                addToCart, 
                removeFromCart, 
                increamentQuantity, 
                decreamentQuantity, 
                calculateTotalPrice,
                addSingleProduct,
                subTotal,
                taxValue,
                deliveryCharges,
                grandValue,
            }
        }>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);