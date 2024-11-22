import React, { useEffect, useState } from 'react'
import './OrderSummary.css'
import productImage from '../../../../Assets/Furniture Mecca/Cart Page/products/mix-chery-dining-set.jpg';
import { useCart } from '../../../../context/cartContext/cartContext';
import { useOrder } from '../../../../context/orderContext/orderContext';
import axios from 'axios';
import { url } from '../../../../utils/api';
import { useMyOrders } from '../../../../context/orderContext/ordersContext';
import { tab } from '@testing-library/user-event/dist/tab';

const OrderSummary = () => {
    // const selectedProducts = [
    //     {img: productImage, name: 'Harris Reclining Sofa and Loveseat *1', price: '$899', selectedColor: 'Black', selectedPackage: '2PC Sofa & LoveSeat'},
    //     {img: productImage, name: 'Harris Reclining Sofa and Loveseat *1', price: '$899', selectedColor: 'Black', selectedPackage: '2PC Sofa & LoveSeat'},
    //     {img: productImage, name: 'Harris Reclining Sofa and Loveseat *1', price: '$899', selectedColor: 'Black', selectedPackage: '2PC Sofa & LoveSeat'},
    //     {img: productImage, name: 'Harris Reclining Sofa and Loveseat *1', price: '$899', selectedColor: 'Black', selectedPackage: '2PC Sofa & LoveSeat'},
    // ]
    const orderSummeryDetails = [
        {title: 'Subtotal', price: '$3564'},
        {title: 'Protection Plane', price: '$3564'},
        {title: 'White Glove Delivery', price: '$3564'},
        {title: 'Tax', price: '$3564'},
    ]

    // Card title words limit
    const maxLength = 50;
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };
    const formatePrices = (price) => {
        return Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }
    const {cart, calculateTotalPrice, subTotal, deliveryCharges, taxValue, grandValue, getGrandTotal} = useCart()
    const {orderPayload, setOrderPayload, addProducts} = useMyOrders();

    console.log("cart on review page", cart)
    const handleClickSave = () => {
        addProducts(cart)
        console.log("order payload after adding products", orderPayload)
    }

    // const taxPrice = getGrandTotal(10, 50)

    // const tax = 10;
    // const grandTotal = calculateTotalPrice(cart) + tax

  return (
    <div className='order-summary-main-container'>
        <h3 className='order-summery-main-heading'>Order Summary</h3>
        <div className='mobile-view-main-heading'>
            <h3>Order Summery</h3>
            <p>Edit</p>
        </div>
        <div className='order-summary-details'>
            <div className='order-summary-selected-products-container'>
                {cart.map((items, index) => (
                    <div key={items.uid} className='selected-products'>
                        <div className='selected-single-product'>
                            <img src={`${url}${items.product.image.image_url}`} alt='img' />
                            <div className='selected-product-containt'>
                                <span className='selected-product-name-and-price'>
                                    <h3>{truncateTitle(items.product.name, maxLength)}</h3>
                                    <p>{formatePrices(items.product.total_price)}</p>
                                </span>
                                <span className='selected-product-color'>
                                    <p>Black</p>
                                </span>
                                <span className='selected-product-color'>
                                    <p>2 PC Sofa & Loveseat</p>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='products-tax-and-total'>
                <span>
                    <p>Sub Total: </p>
                    <p>{formatePrices(subTotal)}</p>
                </span>
                <span>
                    <p>Tax</p>
                    <p>{formatePrices(10)}</p>
                </span>
            </div>
            <div className='selected-product-total'>
                <span>
                    <h3>Total</h3>
                    <p>{formatePrices(subTotal + 10)}</p>
                </span>
            </div>
        </div>
        <div className='mobile-view-order-summery-details'>
            <div className='mobile-view-pricing-details'>
                {/* {orderSummeryDetails.map((items, index) => (
                    <div className='mobile-view-single-price'>
                        <p>{items.title}</p>
                        <h3>{items.price}</h3>
                    </div>
                ))} */}
            </div>
            <div className='mobile-view-single-price'>
                <p>Total</p>
                <h3>$4900</h3>
            </div>
            <div className='mobile-view-order-summery-selected-orders'>
                {/* <h3>{selectedProducts.length} Items</h3> */}
                <div className='mobile-view-ordered-summery-selected-products'>
                    {/* {selectedProducts.slice(0, showMoreProducts).map((items, index) => (
                        <div key={index} className='mobile-view-selected-single-product'>
                            <img src={items.img} alt='product-img' className='mobile-view-selectedProduct-image' />
                            <div className='mobile-view-order-summery-selected-product-content'>
                                <h3>{items.name}</h3>
                                <div className='mobile-view-selected-order-price-and-quantity'>
                                    <p>Qty: 2</p>
                                    <h3>{items.price}</h3>
                                </div>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
                <div className='mobile-view-order-summery-view-all-products-btn-div'>
                    {/* <button onClick={handleShowMore}>{showMoreProducts > 1 ? 'Show Less' : 'Show More +'}</button> */}
                </div>
        </div>
    </div>
  )
}

export default OrderSummary
