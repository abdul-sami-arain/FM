import React, { useEffect, useState } from 'react'
import './CartItems.css';
import minusBtn from '../../../../Assets/icons/minus-white.png';
import plusBtn from '../../../../Assets/icons/plus-white.png';
import closeBtn from '../../../../Assets/icons/close-btn.png';
import deleteBtn from '../../../../Assets/icons/delete-red.png';
import plusCharcol from '../../../../Assets/icons/plus.png';
import minusCharcol from '../../../../Assets/icons/minus.png'
import crossBtn from '../../../../Assets/icons/Mask group (1).png'
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import rotatedArrow from '../../../../Assets/icons/arrow-rotate-white.png'
import unProtectedIcon from '../../../../Assets/icons/un-protected.png';
import protectedIcon from '../../../../Assets/icons/protected.png'
import { url } from '../../../../utils/api';

const CartItems = ({cartProductName, productSubTotal,  issingleProtected, handleSingleProtected, isAllProtected, cartPRoductImage, cartProductColor, cartProductTitle, cartProductTotalPrice, 
    cartSingleProductPrice, isCartOpen, onlyMobile, productColor, quantity, handleRomoveProduct,  cartIndex, productsLength, handleIncreament, handleDecreament, handleTotalPrice}) => {
        // console.log("Cart single price", cartSingleProductPrice)
        const [saveForLeter, setSaveForLeter] = useState(false)
        // const [isProtected, setIsProtected] = useState(false)
        const formatedSinglePrice = Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(cartSingleProductPrice)

        const productTotalPrice = cartSingleProductPrice * quantity;

        const formatedTotalPrice = Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(productTotalPrice)


        const handleSaveForLeter = () => {
            setSaveForLeter(true)
            const timeOut = setTimeout(() => {
                setSaveForLeter(false);
            }, 2000);
        }

        // const handleProtected = () => {setIsProtected(!isProtected)}
        
    return (
    <>
        
        <div className='cart-product'>
                <button className='mobile-cart-remove-btn' onClick={() => handleRomoveProduct(cartIndex)}>
                    <img src={closeBtn} alt='close btn' />
                </button>
            <div className='cart-item-name'>
                <h3>{cartProductName}</h3>
            </div>
            <div className='cart-product-containt'>
                <div className='cart-item-image'>
                    <img src={`${url}${cartPRoductImage}`} alt='product image' />
                </div>
                <div className='cart-product-details'>
                    <p>{cartProductColor}</p>
                    <p>{cartProductTitle}</p>
                    <div className='price-and-count'>
                        <p>{cartSingleProductPrice}</p>
                        <div className='product-count'>
                            <button onClick={handleDecreament}>
                                <img src={minusBtn} alt='minus' />
                            </button>
                            <p>{quantity}</p>
                            <button onClick={handleIncreament}>
                                <img src={plusBtn} alt='plus' />
                            </button>
                        </div>
                    </div>
                    <div className='cart-item-actual-price'>
                        <p>{productTotalPrice} </p>
                        {/* <p>{productTotalPrice} </p> */}
                    </div>
                </div>
            </div>
        </div>
        {/* Desktop view Card */}
        <div className={`desktop-cart-product`}>
            
            <div className='desktop-cart-product-image'>
                <img src={`${url}${cartPRoductImage}`} alt='product image' />
            </div>
            <div className='desktop-cart-containt-section'>
                <button className={`cross-btn ${isCartOpen ? 'hide-cross-btn' : ''}`} onClick={handleRomoveProduct}>
                    <img src={crossBtn} alt='cross' />
                </button>
                <div className='desktop-name-and-single-price'>
                    <h3>{cartProductName}</h3>
                    <p className='desktop-product-extra-info'>{formatedSinglePrice}</p>
                    <p className='desktop-product-extra-info'>Table & 4 Chairs</p>
                    {/* <p className='desktop-product-extra-info'>Yes, Protect it (+$99)</p> */}
                    <button className={`protect-product-tag ${issingleProtected ? 'protect-tick' : ''}`} onClick={handleSingleProtected}>
                        <img src={issingleProtected ? protectedIcon : unProtectedIcon} alt='unProtected' />
                        {issingleProtected ? 'Protected(+99)' : 'Prodect'}
                    </button>
                    <p>{formatedTotalPrice}</p>
                </div>
                <div className={`desktop-quantity-and-save-for-leter ${isCartOpen ? 'hide-quantity' : ''}`}>
                    <div className='desktop-quantity'>
                        <button onClick={handleDecreament}>
                            <img src={minusCharcol} alt='minus' />
                        </button>
                        <p>{quantity}</p>
                        <button onClick={handleIncreament}>
                            <img src={plusCharcol} alt='plus' />
                        </button>
                    </div>
                </div>
                <div className={`desktop-total-price-and-remove-item ${isCartOpen ? 'hide-total-and-remove-item' : ''}`}>
                    <p>$ {productTotalPrice}</p>
                    {/* <p>$ {productTotalPrice}</p> */}
                    <button className='save-for-leter' onClick={handleSaveForLeter}>
                       <img src={rotatedArrow} className={`${saveForLeter ? 'arrow-rotate' : ''}`} /> Save For Later
                    </button>
                </div>
                <div className={isCartOpen ? 'cart-open-quantity-and-total-price' : 'cart-close-quantity-and-total-price'}>
                    <div className='desktop-quantity'>
                        <button onClick={handleDecreament}>
                            <img src={minusCharcol} alt='minus' />
                        </button>
                        <p>{quantity}</p>
                        <button onClick={handleIncreament}>
                            <img src={plusCharcol} alt='plus' />
                        </button>
                    </div>
                    <p className='cart-open-total-price'>$ {formatedTotalPrice}</p>
                    {/* <p className='cart-open-total-price'>$ {productTotalPrice}</p> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default CartItems
