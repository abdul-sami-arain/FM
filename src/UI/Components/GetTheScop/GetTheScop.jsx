import React from 'react'
import './GetTheScop.css';
import banner from '../../../Assets/global-images/flyre-image.jpg'

const GetTheScop = () => {
  return (
    <>
      <div className='get-the-scop-main-container'>
        <div className='get-the-scop-form-container'>
          <div className='get-the-scop-form'>
              <h3>Get the scoop</h3>
              <span className='get-the-scop-offers'>
                  <a href='#'> Discounts</a> | 
                  <a href='#'> Offers</a> |
                  <a href='#'> Best Price</a>
              </span>
              <div className='get-the-scop-input'>
                  <input type='text' placeholder='Email Address' />
                  <button><a>Sign me up</a></button>
              </div>
              <p>By Signing Up you agree to our <a href='#' className='desktop-get-the-scoop-terms'> Terms of Use </a> and <a href='#' className='desktop-get-the-scoop-terms'> Privacy Policy </a></p>
          </div>
        </div>
        <div className='get-the-scop-banner'>
            <h3>Furniture Mecca Promotions</h3>
            <p>Get Exclusive Promotions For The Year 2024</p>
            <button> <a href='#'> Click To See FLyer </a> </button>
        </div>
      </div>
      <div className='mobile-view-scop-main-container'>
        <div className='mobile-view-get0the-scoop-overlay'>
            <div className='mobile-view-get-scoop-heading'>
                <h3>Get The Scoop</h3>
                <span>
                  <a href='#'>Offer</a> |
                  <a href='#'>Discounts</a> |
                  <a href='#'>Best Prices</a>
                </span>
            </div>
            <div className='mobile-view-get-scoop-input-and-button'>
                <input type='text' placeholder='Email' />
                <button>
                  Sign me up
                </button>
            </div>
            <p className='mobile-view-conditions'>By signing up, you agree to our <a href='#' className='mobile-view-get-the-scoop-conditions'> Privacy Policy </a> and <a href='#' className='mobile-view-get-the-scoop-conditions'> Terms of Use </a>.</p>
            <div className='mobile-view-flyre-view'>
                <h3>Furniture Mecca Promotions</h3>
                <p>Get exclusive promotions for the year 2024</p>
                <button>
                  Click to see flyer
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default GetTheScop
