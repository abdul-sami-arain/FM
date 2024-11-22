import React from 'react'
import './Cart.css'
import CartMainImage from '../../Components/Cart-Components/CartMainImage/CartMainImage'
import CartProducts from '../../Components/Cart-Components/Cart-Products/CartProducts'
import CartProductsSuggestion from '../../Components/Cart-Components/CartProductsSuggestion/CartProductsSuggestion'

const Cart = () => {
  return (
    <div className='cart-main-container'>
        <CartMainImage />
        <div className='cart-body'>
            <div className='cart-products-section'>
                <CartProducts />
            </div>
            <div className='cart-you-may-like-section'>
                <h3>You may also like </h3>
                <CartProductsSuggestion />
            </div>
        </div>
        {/* <div className='mobile-view-cart-body'>

        </div> */}
    </div>
  )
}

export default Cart
