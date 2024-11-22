import React, { useState } from 'react'
import './Summary.css';
import ShippingDetails from '../../Components/Summary-Components/ShippingDetails/ShippingDetails';
import OrderSummary from '../../Components/Summary-Components/OrderSummary/OrderSummary';
import Coupon from '../../Components/Summary-Components/Coupon/Coupon';
import PaymentMethod from '../../Components/Summary-Components/PaymentMethod/PaymentMethod';
import TrustFor from '../../Components/Summary-Components/Trust-for-varaities/TrustFor';
import HappyCustomers from '../../Components/Summary-Components/Happy-Customer/HappyCustomers';
import ShipingAndDelivery from '../../Components/Summary-Components/ShippingAndDelivery/ShipingAndDelivery';
import PaymentInfo from '../../Components/Summary-Components/PaymentInfo/PaymentInfo';
import { useLocation } from 'react-router-dom';
import { useMyOrders } from '../../../context/orderContext/ordersContext';
import { useCart } from '../../../context/cartContext/cartContext';
import axios from 'axios';
import { url } from '../../../utils/api';
import Loader from '../../Components/Loader/Loader';

const Summary = () => {

  const checkoutSections = [
    { id: 1, name: 'Delivery', navOp: 'delivery' },
    { id: 2, name: 'Payment', navOp: 'payment-method' },
    { id: 3, name: 'Review', navOp: 'review' },
  ]
  // const {selectedTab, handleTabOpen} = useMyOrders();
  const [currentId, setCurrentId] = useState(0)
  const handleNavClick = (id) => {
    setCurrentId(id);
  }

    const {cart, calculateTotalPrice} = useCart()
    const {setOrderPayload, addProducts, sendProducts, isLoader, setIsLoader} = useMyOrders();

    console.log("cart on review page", cart)
    // const sendProducts = async () => {
    //   const api = `/api/v1/orders/add`;
    //   try {
    //     const response = await axios.post(`${url}${api}`, orderPayload);
    //     console.log("add resposnse", response);
    //   } catch (error) {
    //     console.error("error adding order", error);
    //   }
    // }
    const handleClickSave = () => {
      addProducts(cart)
      sendProducts()
      
    }



  return (
    <div className='summary-main-container'>
      {isLoader && <Loader />}
      <div className='summary-left-section'>
        <div className='checkout-pages-toggle-nav'>
          {checkoutSections.map((items,) => (
            <span 
              key={items.id} 
              onClick={() => handleNavClick(items.id)}
              className={`checkout-page-toggle-nav-single-item 
                ${currentId === items.id ? 'active-checkout-toggle' : ''}`} 
              >
              <p>{items.id}.</p>
              <p>{items.name}</p>
            </span>
          ))}
        </div>
        {
          currentId === 1 ? <div className='shipping-details-and-coupen-show'>
            <ShippingDetails userInfoPayload={setOrderPayload} />
            <Coupon />
          </div>:
          currentId === 2 ? <PaymentMethod /> : <div className='order-summery-and-proceed-btn'> 
            <ShipingAndDelivery />
            <PaymentInfo />
            <OrderSummary />
            <div className='order-summery-proceed-btn-div'>
              <button onClick={handleClickSave}>
                Place Order
              </button>
            </div>
          </div>
          
        }

      </div>
      <div className={` ${currentId === 1 ? 'summary-right-section' : currentId === 2 ? 'summery-right-section-according-payment' : 'summery-right-section-low-height' }`}>
        <TrustFor />
        <HappyCustomers />
      </div>
    </div>
  )
}

export default Summary
