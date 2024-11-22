import React from 'react'
import './LocationPopUp.css';
import deliverTo from '../../../Assets/icons/delivery.png'
import closeBtn from '../../../Assets/icons/close-btn-black.png';
import locationModalIcon from '../../../Assets/icons/location.png'

const LocationPopUp = ({searchLocation, handleCloseSearch}) => {
  return (
    <div 
      className={`show-location-modal ${searchLocation ? 'increase-width-location-modal' : ''} `}
      onClick={handleCloseSearch}
    >
              <div 
                className={`location-modal-containt-div ${searchLocation ? 'show-location-bar-inner-container' : ''}`}
                onClick={(e) => e.stopPropagation()}  
              >
                <button className={`close-location-modal ${searchLocation ? '' : 'hide-location-close-btn' }`} onClick={handleCloseSearch}>
                  <img src={closeBtn} alt='close btn' />
                </button>
                <div className='location-heading-and-search-bar-section'>
                  <div className='location-modal-heading-container'>
                    <span>
                      <img src={deliverTo} alt='delivery' />
                    </span>
                    <h3>Delivery Location</h3>
                  </div>
                  <div className='location-search-and-icon'>
                    <div className='location-searchand-button'>
                      <input type='text' className='location-search-input'/>
                      <button className='update-zip-btn'>Update Zip Code</button>
                    </div>
                    <div className='use-current-location'>
                      <img src={locationModalIcon} alt='location' />
                      <h3>Use Current Location</h3>
                    </div>
                  </div>
                </div>
                <div className='location-modal-detail-section'>
                  <h3>Why your zip code is important</h3>
                  <p>
                    You'll see only the products that deliver to your area, so you can shop for (and get) what you want!?
                  </p>
                </div>
              </div>
            </div>
  )
}

export default LocationPopUp
