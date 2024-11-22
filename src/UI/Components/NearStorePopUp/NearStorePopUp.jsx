import React, { useState } from 'react'
import './NearStorePopUp.css';
import NearStore from '../../../Assets/icons/home.png';
import { IoCloseOutline } from "react-icons/io5";
import searchIcon from '../../../Assets/icons/search.png';
import { TbCurrentLocation } from "react-icons/tb";
import AddBtn from '../../../Assets/icons/add-icon.png';
import { MdOutlineStars } from "react-icons/md";
import closeBtn from '../../../Assets/icons/close-btn-black.png';
import { Link } from 'react-router-dom';

const NearStorePopUp = ({isOpen, setIsOpen, handleCloseNearBy}) => {
    const [storeOpenIndex, setOpenStoreIndex] = useState(-1);
    const handleStoreHoursDetails = (index) => {
        setOpenStoreIndex(storeOpenIndex === index ? -1 : index)
    };

    const storeDetailsData = [
        {
            city: 'E Venango', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: 'E Venango st, Philadelphia, PA 19134', addressCity: 'Philadelphia, Pennsylvania, 101', call: '267-639-6801',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'W Hunting Park', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '1430 W Hunting Park Ave Philadelphia,', addressCity: 'Pennsylvania, 19140', call: '267-297-8558',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'Upper Darby', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: 'St #4232, Upper Darby Philadelphia,', addressCity: 'Pennsylvania, 19082', call: '610-352-3500',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'Baltimore Ave', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '130 E Baltimore Ave, Lansdowne Philladelphia,', addressCity: 'Pennsylvania, 19050', call: '267-297-8558',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'W BrookDale', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '611 W Brookdale St, Allentown, Pennsylvania,', addressCity: 'Pennsylvania, 18103', call: '484-460-7056',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'Lancaster Ave', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '5648 Lancaster Ave Philadelphia,', addressCity: 'Pennsylvania, 19131', call: '215-877-1200',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'Delmar Dr', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '1830 Delmar Dr, Folcroft, Pennsylvania,', addressCity: 'Pennsylvania, 19032', call: '215-422-3883',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'Penn St Reading', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '408 Penn St Reading, Pennsylvania, 19602', addressCity: 'Pennsylvania, 19602', call: '484-869-5338',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        },
        {
            city: 'Ewing Township', miles: '0.8 Miles', openUntil: '(Open Until 06: 30 PM)', openUntilIcon: <MdOutlineStars size={20} />,
            address: '1600 N Olden Ave, Ewing Township, NJ 08638', addressCity: 'NJ 08638', call: '609-392-2800',
            outlet: 'Outlet', outletLink: '#', direction: 'Directions', directionLink: '#', appointment: 'Book Appointment', appointmentLink: '#', openHours: 'Store Hours', hours: [
                {day: 'Sunday', time: '06: 30 PM'},
                {day: 'Monday', time: '06: 30 PM'},
                {day: 'Tuesday', time: '06: 30 PM'},
                {day: 'Wednesday', time: '06: 30 PM'},
                {day: 'Thursday', time: '06: 30 PM'},
                {day: 'Friday', time: '06: 30 PM'},
                {day: 'Saturday', time: '06: 30 PM'},
            ],
            virtualTour: 'Virtual Tour', virtualTourLink: '#', storeDetails: 'Store DEtails', storeDetailsLink: '#'
        }
    ]

  return (
    <div 
        className={`near-store-pop-up ${isOpen ? 'show' : ''}`} 
        onClick={handleCloseNearBy}
    >
        <div 
            className={`near-store-container ${isOpen ? 'show-near-store-inner-container' : ''}`} 
            onClick={(e) => e.stopPropagation()}
        >
            <div className='pop-up-header'>
                <span onClick={handleCloseNearBy}> 
                    {/* <IoCloseOutline size={20} />  */}
                    <img src={closeBtn} alt='btn' />
                </span>
                <i>
                    <img src={NearStore} alt='near' />
                </i>
                <h3>Find a Store</h3>
                <div className='pop-up-header-search'>
                    <input type='search' placeholder='Search by Zip Code or City & State' />
                    <img src={searchIcon} alt='search' />
                </div>
                <div className='pop-up-header-location'>
                    <p>
                        <TbCurrentLocation size={16} />
                        <Link to={'#'}>Use Currunt Location</Link>
                    </p>
                    <p>
                        <Link to={'#'}>Use My Delivery Zip</Link>
                    </p>
                </div>
            </div>
            <div className='pop-up-single-city-card'>
                <div className='pop-up-single-city-cart'>
                    <img src={NearStore} alt='near' />
                    <h3>Your Store</h3>
                </div>
                {storeDetailsData.map((items, index) => {
                    return <div key={index}  >
                            <div className={`pop-up-city-and-distance ${storeOpenIndex === index ? 'rotate-btn' : ''}`}>
                            <span>
                                <img src={AddBtn} alt='add' onClick={() => handleStoreHoursDetails(index)} />
                                <h3>{items.city}</h3>
                            </span>
                            <p> {items.miles} </p>
                        </div>
                        <div className='pop-up-store-open-time'>
                    <p>{items.openUntil}</p>
                    <span>
                        {items.openUntilIcon}
                    </span>
                </div>
                <div className='pop-up-complete-address'>
                    <p>{items.address}</p>
                    <p>{items.addressCity}</p>
                    <p><span>Call</span> {items.call}</p>
                    <Link to={items.outletLink}>{items.outlet}</Link>
                    <Link to={items.directionLink}>{items.direction}</Link> 
                </div>
                <div className={`pop-up-store-open-days-and-time ${storeOpenIndex === index ? 'open-store' : ''}`}>
                    <Link to={items.appointmentLink}>{items.appointment}</Link>
                    <div className='store-hours-detail'>
                        <p>{items.openHours}</p>
                        <div className='store-hours'>
                        {items.hours && items.hours.map((hoursItem, index) => {
                            return <p key={index}> <span>{hoursItem.day}</span> <span>{hoursItem.time}</span> </p>
                        })}
                        </div>
                        <Link to={items.virtualTourLink}>{items.virtualTour}</Link>
                        <Link to={items.storeDetailsLink}>{items.storeDetails}</Link>
                    </div>
                </div>
            </div>
                })}
                
            </div>
        </div>
    </div>
  )
}

export default NearStorePopUp