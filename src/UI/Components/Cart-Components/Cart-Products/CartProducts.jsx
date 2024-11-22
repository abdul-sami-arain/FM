import React, { useState, useEffect } from 'react'
import './CartProducts.css';
import CartItems from '../Cart-items/CartItems';
import CartPaymnetMethoud from '../CArtAddPaymentMethoud/CartPaymnetMethoud';
import { useCart } from '../../../../context/cartContext/cartContext';
import EmptyCart from '../Empty-Cart/EmptyCart';
import DeliveryOptions from '../../DeliveryOptions/DeliveryOptions';
import deliveryTruck from '../../../../Assets/icons/delivery.png';
import  locationIcon from '../../../../Assets/icons/location-red.png';
import MobileCart from '../Mobile-Cart/MobileCart';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../../context/orderContext/orderContext';
import axios from 'axios';
import { url } from '../../../../utils/api';
// import CArtEmpty from './cart-empty/CArtEmpty';
// import CartEmpty from './cart-empty/CartEmpty';


const CartProducts = () => {
    const { cart, updateSubTotal, getAllTotals, taxValue, deliveryCharges, subTotal, grandValue, removeFromCart, increamentQuantity, decreamentQuantity, calculateTotalPrice, toggleProtection } = useCart()
    
    calculateTotalPrice(cart)
    console.log("cart total", calculateTotalPrice(cart))

    // useEffect(() => {
    //     console.log("instant data change", subTotal)
    //     // updateSubTotal()
    // }, [subTotal])

    // console.log("new cart attributes payload", cart);

    const [isOpen, setIsOpen] = useState(false);
    const [checkoutFixed, setCheckoutFixed] = useState(true);


    const formatedPrice = (price) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }
    // let getTax, getDelivery = getGrandTotal(10, 50);
    // const grandTotal = calculateTotalPrice(cart) + deliveryCharges + tax;
    const detailsDeta = [
        {
            title: 'Sub Total', price: formatedPrice(subTotal),
        },
        {
            title: 'Delivery', price: formatedPrice(deliveryCharges)
        },
        {
            title: 'Tax', price: formatedPrice(taxValue)
        },
        {
            title: 'Total', price: formatedPrice(subTotal + deliveryCharges + taxValue)
        },
    ]

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    
    const handleScroll = () => {
        if(window.scrollY > 250){
            setCheckoutFixed(false);
            console.log(window.scrollY)
        }
        else{
            setCheckoutFixed(true);
            console.log(window.scrollY)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const [protectAll, setProtectAll] = useState(false);
    
    const [issingleProtected, setIsSingleProtected] = useState(false);


    const navigate = useNavigate();
    const handleNavigateToCheckoutPage = () => {
        console.log("Cart before adding to order:", cart);
        navigate(`/cart-page/check-out`);
    }

   
    
    
    return (
        <>
            <div className='cart-products-main-container'>
                <div className='cart-products-heading'>
                    <h3>Products ({cart.length})</h3>
                    <button 
                        className={`protect-all-products-button ${protectAll ? 'protect-all-products-button-true' : ''}`}
                        // onClick={handleProtectAll}
                    >
                        Protect All
                    </button>

                </div>
                <div className={`cart-items ${isOpen ? 'low-width' : ''}`}>
                    {cart.length <= 0 && <EmptyCart />}
                    {cart.map((items, index) => {
                        return <CartItems
                            key={items.product.uid}
                            onlyMobile={false}
                            issingleProtected={issingleProtected}
                            handleSingleProtected={() => {}}
                            // isAllProtected={protectAll}
                            cartIndex={items.product.uid}
                            productsLength={cart.length}
                            handleRomoveProduct={() => removeFromCart(items.product.uid)}
                            cartProductName={items.product.name}
                            cartPRoductImage={items.product.image?.image_url}
                            // cartProductColor={items.product.color}
                            cartProductTitle={items.product.name}
                            cartSingleProductPrice={items.product.regular_price}
                            isCartOpen={isOpen}
                            // productColor={items.product.color}
                            quantity={items.product.quantity}
                            productTotalPrice={items.product.total_price}
                            productSubTotal={items.product.sub_total}
                            handleIncreament={() => increamentQuantity(items.product.uid)}
                            handleDecreament={() => decreamentQuantity(items.product.uid)}
                        />
                    })}
                </div>
                <div className='mobile-cart-items'>
                    {cart.length <= 0 && <EmptyCart />}
                    {cart.map((items, index) => (
                        <MobileCart 
                            key={items.product.uid}
                            // onlyMobile={false}
                            cartIndex={items.product.uid}
                            // productsLength={cart.length}
                            handleRomoveProduct={() => removeFromCart(items.product.uid)}
                            productName={items.product.name}
                            productImg={items.product.image?.image_url}
                            // cartProductColor={items.product.color}
                            // cartProductTitle={items.product.title}
                            productAccesories={'2 Piece Sofa & Love Seat'}
                            productSinglePrice={items.product.regular_price}
                            // isCartOpen={isOpen}
                            // productColor={items.product.color}
                            productColor={'black'}
                            productQuantity={items.product.quantity}
                            productsTotalPrice={items.product.totalPrice}
                            handleIncreament={() => increamentQuantity(items.product.uid)}
                            handleDecreament={() => decreamentQuantity(items.product.uid)}

                        />
                    ))}
                </div>
                <div className='mobile-view-cart-order-summery'>
                    <div className='mobile-view-head'>
                        <h3>Order Summery</h3>
                        <span>
                            <p>Deliver to: </p>
                            <p>06402</p>
                        </span>
                    </div>
                    <div className='mobile-view-sub-total-and-protection'>
                        <div className='mobile-sub-total-protection'>
                            <p>Subtotal</p>
                            <p>$31564</p>
                        </div>
                        <div className='mobile-sub-total-protection'>
                            <p>Protection</p>
                            <p>$100</p>
                        </div>
                    </div>
                    <div className='mobile-tax-section'>
                        <p>Tax</p>
                        <p>$15</p>
                    </div>

                    <div className='mobile-delivery-options'>
                        <h3 className='mobile-delivery-option-heading'>Delivery Options:</h3>
                        <div className='mobile-single-delivery-option'>
                            <input type='radio' />
                            <img src={deliveryTruck} alt='delivery-icon' />
                            <div className='mobile-single-delivery-details'>
                                <h3>Bobtastic Delivery: White Glove or threshold</h3>
                                <p>Get it in 3 to 7 day. Schedule delivery in checkout </p>
                            </div>
                        </div>
                        <div className='mobile-single-delivery-option'>
                            <input type='radio' />
                            <img src={locationIcon} alt='delivery-icon' />
                            <div className='mobile-single-delivery-details'>
                                <h3>Pickup not available at Manchester</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${checkoutFixed ? 'mobile-view-total-and-checkout-fixed' : 'mobile-view-total-and-checkout'}`}>
                    <div className='mobile-view-total'>
                        <p>Total</p>
                        <p>$1998.00</p>
                    </div>
                    <button className='mobile-view-checkout-btn' onClick={handleNavigateToCheckoutPage}>
                        Check out
                    </button>
                </div>


                {/* Desktop View */}
                <div className={`desktop-cart-item-details ${isOpen ? 'desktop-cart-item-div-padding-decrease' : ''}`}>
                    <div className={`desktop-price-details-div ${isOpen ? 'desktop-price-div-decrease' : ''}`}>
                        {detailsDeta.map((item, index) => {
                            return <div key={index} className='dektop-price-details'>
                                <p className='desktop-price-title'>{item.title}</p>
                                <p className='desktop-price-total'>{cart.length > 0 ? item.price : '$0'}</p>
                            </div>
                        })}
                        {calculateTotalPrice()}
                    </div>
                    <div className={`desktop-continue-btn-div ${isOpen ? 'hide-continue-btn' : ''}`}>
                        {/* <button onClick={handleToggle}>
                    Continue
                </button> */}
                        <button onClick={handleNavigateToCheckoutPage}>Continue</button>
                    </div>
                </div>
                <CartPaymnetMethoud
                    isOpen={isOpen}
                    handleToggle={handleToggle}
                />
            </div>
        </>
    )
}

export default CartProducts
