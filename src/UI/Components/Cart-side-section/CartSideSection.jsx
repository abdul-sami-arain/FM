import React from 'react'
import './CartSideSection.css';
import { url } from '../../../utils/api';

const CartSideSection = ({handleItemRemove, closeBtn, productTitle, mainImage, priceTag, decreamentQuantity, 
    minusBtn, quantity, increamentQuantity, plusBtn}) => {

        const productTotalPrice = priceTag * quantity;
        const formatedSinglePrice = Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(priceTag)

        const formatedTotalPrice = Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(productTotalPrice)
        // console.log("cart side section product image", mainImage.image_url)
        // const singlePrice = priceTag.toLocaleString('en-US', {
        //     style: 'currency',
        //     currency: 'USD'
        // }); 
        // const formatedProductTotalPrice = productTotalPrice.toLocaleString('en-US', {
        //     style: 'currency',
        //     currency: 'USD'
        // });
        // console.log("this is main image",mainImage)

  return (
    <div className='cart-side-section-product'>
        <button className='cart-side-section-remove-btn' onClick={handleItemRemove}>
            <img src={closeBtn} alt='close btn' />
        </button>
        <div className='cart-side-section-product-item-name'>
            <h3>{productTitle}</h3>
        </div>
        <div className='cart-side-section-product-containt'>
            <div className='cart-side-section-item-image'>
                <img src={`${url}${mainImage.image_url}`} alt='product image' />
            </div>
            <div className='cart-side-section-product-details'>
                <p>gray</p>
                <p>2 Piece Sofa & Loveseat</p>
                <div className='cart-side-section-price-and-count'>
                    <p>{formatedSinglePrice}</p>
                    <div className='cart-side-section-product-count'>
                        <button onClick={decreamentQuantity}>
                            <img src={minusBtn} alt='minus' />
                        </button>
                        <p>{quantity}</p>
                        <button onClick={increamentQuantity}>
                            <img src={plusBtn} alt='plus' />
                        </button>
                    </div>
                </div>
                <div className='cart-side-section--item-actual-price'>
                    <p className='cart-side-section-product-total'>{formatedTotalPrice} </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartSideSection
