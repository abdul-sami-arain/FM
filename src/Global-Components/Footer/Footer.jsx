import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import ownerTag from '../../Assets/Logo/owner-tag.png';
import FooterNav from './FooterNav/FooterNav';
import footerRedFurnitureMecca from '../../Assets/global-images/furniture-mecca-red.jpeg'
import facebook from '../../Assets/icons/facebook-white.png'
import tiktok from '../../Assets/icons/tiktok-white.png'
import insta from '../../Assets/icons/insta-white.png'
import youtube from '../../Assets/icons/youtube-white.png'
import location from '../../Assets/icons/location.png'
import call from '../../Assets/icons/call.png'
import mail from '../../Assets/icons/mail.png'
import clock from '../../Assets/icons/white-clock.png'
import calander from '../../Assets/icons/white-calander.png'
import TabFooter from '../TabAndMobileFooter/MobileFooter';
import filledStart from '../../Assets/icons/Star 3.png';
import unfilledStart from '../../Assets/icons/Star 5.png';
import nearStore from '../../Assets/Footer/venango-store-image.png';
import { MdOutlineLocationOn } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import { CiCalendarDate } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import MobileFooter from '../TabAndMobileFooter/MobileFooter';

// import { FaRegCalendarPlus } from "react-icons/fa";
// import NearStorePopUp from '../../UI/Components/NearStorePopUp/NearStorePopUp';

const Footer = ({notLandingPage}) => {

    const footerNavLinks = [
        {
            heading: "Living Room", navItems: [
                {name: 'Living Room Sets', link: '/product-category/living-room/living-room-sets'},
                {name: 'Sofa & Lovaseat Sets', link: '/product-category/living-room/sofa-loveseat-sets'},
                {name: 'Sectionals', link: '/product-category/living-room/sectionals'},
                {name: 'Reclining Furniture', link: '/product-category/living-room/reclining-sets'},
                {name: 'Sofas', link: '/product-category/living-room/sofas'},
                {name: 'Sleeper Sofas', link: '/product-category/living-room/sleeper-sofas'},
                {name: 'LoveSeats', link: '/product-category/living-room/loveseats'},
                {name: 'Small Space Living Room', link: '/product-category/living-room/small-space-living-rooms'},
                {name: 'Outlets', link: '/product-category/living-room/living-room-outlet'},
            ]
        },
        {
            heading: "Bedroom", navItems: [
                {name: 'Bedroom Sets', link: '/product-category/bedroom/bedroom-sets'},
                {name: 'Beds & Headboards', link: '/product-category/bedroom/beds-headboards'},
                {name: 'Dresser & Mirror Set', link: '/product-category/bedroom/dresser-mirror-sets'},
                {name: 'Dressers', link: '/product-category/bedroom/dressers'},
                {name: 'Chests', link: '/product-category/bedroom/chests'},
                {name: 'NightStands', link: '/product-category/bedroom/nightstands'},
                {name: 'Mirrors', link: '/product-category/bedroom/mirrors'},
                {name: 'Twin Beds', link: '/product-category/bedroom/twin-beds'},
                {name: 'Quen Beds', link: '/product-category/bedroom/queen-beds-fm'},
                {name: 'Full Beds', link: '/product-category/bedroom/full-beds'},
                {name: 'King Beds', link: '/product-category/bedroom/king-beds'},
                {name: 'Small Spaces Bedrooms', link: '/product-category/bedroom/small-space-bedrooms'},
                {name: 'Outlets', link: '/product-category/bedroom/bedroom-outlet'},
            ]
        },
        {
            heading: "Dining Rooms", navItems: [
                {name: 'Dining Room Sets', link: '/product-category/dining-room/dining-room-sets'},
                {name: 'Pub Heights Dining Sets', link: '/product-category/dining-room/pub-heights-dining-sets'},
                {name: 'Dining Chairs & Benches', link: '/product-category/dining-room/dining-chairs-benches'},
                {name: 'Dining Tables', link: '/product-category/dining-room/dining-tables'},
                {name: 'Bar Stools', link: '/product-category/dining-room/bar-pub-stools'},
                {name: 'Servers, Buffets & China Cabinets', link: '/product-category/dining-room/servers-buffets-china-cabinets'},
            ]
        },
        {
            heading: "Mattresses", navItems: [
                {name: 'Twin Size', link: '/product-category/mattresses/twin-size'},
                {name: 'Quen Size', link: '/product-category/mattresses/queen-size'},
                {name: 'Full Size', link: '/product-category/mattresses/full-size'},
                {name: 'King Size', link: '/product-category/mattresses/king-size'},
                {name: 'Bed Frames', link: '/product-category/mattresses/bed-frames'},
                {name: 'Pillows', link: '/product-category/mattresses/pillows'},
                {name: 'Memory Foam Mattresses', link: '/product-category/mattresses/memory-foam-mattresses'},
                {name: 'box Spring', link: '/product-category/mattresses/box-springs'},
                {name: 'Mattresses Protection', link: '/product-category/mattresses/mattress-protection'},
                {name: 'Outlet', link: '/product-category/mattresses/sale-mattresses'},
            ]
        },
        {
            heading: "Kids", navItems: [
                {name: 'Kids Bedroom Sets', link: '/product-category/kids/kids-bedroom-sets'},
                {name: 'Kids Room', link: '/product-category/kids/kids-room'},
                {name: 'Kids Beds & Headboards', link: '/product-category/kids/kids-beds-headboards'},
                {name: 'Kids Bedroom Storage', link: '/product-category/kids/kids-bedroom-storage'},
                {name: 'Outlet', link: '/product-category/kids/sale-kids-room'},
            ]
        },
        {
            heading: "Accent", navItems: [
                {name: 'Accent Tables', link: '/product-category/accent-furniture/accent-tables'},
                {name: 'Accent Chest & Storage', link: '/product-category/accent-furniture/accent-chests-storage'},
                {name: 'Coffee & End Tables', link: '/product-category/accent-furniture/coffee-end-tables'},
                {name: 'Lampes & Lighting', link: '/product-category/accent-furniture/lamps-lighting'},
                {name: 'Entertainment Centers & TV Stands', link: '/product-category/accent-furniture/entertainment-centers-tv-stands'},
                {name: 'Home Office', link: '/product-category/accent-furniture/home-office'},
                {name: 'Benches', link: '/product-category/accent-furniture/benches'},
                {name: 'Outlets', link: '/product-category/accent-furniture/sale-accent-furniture'},
            ]
        },
        {
            heading: "Home Decor", navItems: [
                {name: 'Lampes & Lighting', link: '/product-category/accent-furniture/lamps-lighting'},
                {name: 'Home Office', link: '/product-category/home-decor/home-office'},
                {name: 'Mirrored Furniture', link: '/product-category/home-decor/mirrored-furniture'},
                {name: 'Vanities & Mirror', link: '/product-category/bedroom/vanities-mirror'},
                {name: 'Wall Art', link: '/product-category/home-decor/wall-art'},
                {name: 'Audio & Speaker', link: '/product-category/home-decor/audio-speakers'},
                {name: 'Throw Pillows', link: '/product-category/home-decor/throw-pillows'},
                {name: 'Jhula Swings', link: '/product-category/home-decor/jhula-swings'},
                {name: 'Outlets', link: '/product-category/home-decor/sale-home-decor'},
            ]
        },
        {
            heading: "Rugs", navItems: [
                {name: 'Machine Washable', link: '/product-category/rugs-main/machine-washable'},
                {name: 'Indoor/Outdoor Rugs', link: '/product-category/rugs-main/indoor-outdoor-rugs'},
                {name: 'Runners', link: '/product-category/rugs-main/runners'},
                {name: 'Small Area Rugs', link: '/product-category/rugs-main/small-area-rugs'},
                {name: 'Large Area Rugs', link: '/product-category/rugs-main/large-area-rugs'},
                {name: 'All Area Rugs', link: '/product-category/rugs-main/all-area-rugs'},
                {name: 'Outlets', link: '/product-category/rugs-main/sale-rugs'},
            ]
        },
        {
            heading: "Outlet", navItems: [
                {name: 'Bed Room Sets', link: '#'},
                {name: 'Bed & HeadBoards', link: '#'},
                {name: 'Dressers', link: '#'},
                {name: 'Chest', link: '#'},
                {name: 'Dresser & Mirror Sets', link: '#'},
                {name: 'Night Stands', link: '#'},
                {name: 'Mirrors', link: '#'},
                {name: 'Twin Beds', link: '#'},
                {name: 'Queen Beds', link: '#'},
                {name: 'King Beds', link: '#'},
                {name: 'Full Bed', link: '#'},
                {name: 'Small Space Bed Room', link: '#'},
                {name: 'Outlets', link: '#'},
            ]
        },
    ]

    const socialIcons = [
        {name: 'facebook', icon: facebook, link: 'https://www.facebook.com/myfurnituremecca'},
        {name: 'tiktok', icon: tiktok, link: 'https://www.tiktok.com/@myfurnituremecca?_t=8gcQvVGSaGI&_r=1'},
        {name : 'youtube', icon: youtube, link: 'https://www.youtube.com/@FurnitureMecca1'},
        {name: 'insta', icon: insta, link: 'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D'}
    ]

    const locationPhoneMail = [
        {name: 'Philadelphia', icon: location, link: '#'},
        {name: '215 352 1600', icon: call, link: '#'},
        {name: 'meccacustomercare@gmail.com', icon: mail, link: '#'}
    ]

    const footerCustomerCareAndAbout = [
        {heading: 'Customer Care', navLinks: [
            {name: 'Contact Us', link: '#'},
            {name: 'Financing', link: '/financing-option'},
            {name: 'Shipping & Delivery', link: '#'},
            {name: 'Terms & Conditions', link: '#'},
        ]},
        {heading: 'About Furniture Mecca', navLinks: [
            {name: 'About Us', link: '/about-us'},
            {name: 'Career', link: '/careers'},
            {name: 'Store Locations', link: '/all-stores'},
            {name: 'Reference', link: '#'},
            {name: 'My Account', link: '/user-dashboard'},
            {name: 'Blogs', link: '/blogs'},
        ]},
    ]

    const stars = [
        {icon: filledStart},
        {icon: filledStart},
        {icon: filledStart},
        {icon: filledStart},
        {icon: unfilledStart},
    ]

    const nearStoreDetails = [
        {icon: location, details: 'E Venango St, Philadelphia, PA 19134 Philadelphia, Pennsylvania, 101'},
        {icon: call, details: '267 639 6801'},
        {icon: clock, details: '9:30 AM - 6:30 PM'},
        {icon: calander, details: 'Monday - Sunday'},
    ]

  return (
    <>
        <div className='footer-main-container'>
            <div className='footer-nav'>
                {footerNavLinks.map((items, index) => {
                    return <div key={index} className='footer-nav-links'>
                    <h3 className='footer-nav-link-heading'>{items.heading}</h3>
                    {items.navItems.map((item, innerIndex) => {
                        return <FooterNav key={innerIndex} link={item.link} linkName={item.name} />
                    })}
                </div>
                })}
            </div>
            <div className='footer-second-contant-section'>
                <div className='footer-left-section'>
                    <div className='left-section-contact'>
                        <div className='left-section-social-icons-div'>
                            {socialIcons.map((items, index) => (
                                <a key={index} href={items.link}>
                                    <img src={items.icon} alt='icon' />
                                </a>
                            ))}
                        </div>
                        <div className='footer-owner-tag'>
                            <img src={ownerTag} alt='owner tag' />
                            <div className='owner-tag-info'>
                                <p className='owner-tag-name'>FURNITURE MECCA</p>
                                <div className='tag-rating-stars'>
                                    {stars.map((item, index) => (
                                        <img key={index} src={item.icon} alt='star' />
                                    ))}
                                </div>
                                <p className='owner-tag-review'>847 Google Review</p>
                            </div>
                        </div>
                        <div className='footer-left-contact-section'>
                            {locationPhoneMail.map((item, index) => (
                                <span key={index}>
                                    <img src={item.icon} alt='icon' />
                                    <p>{item.name}</p>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='left-section-location-section'>
                        <h3 className='footer-location-section'>Nearest Store</h3>
                        <div className='near-store-containt-section'>
                            <div className='near-store-image-div'>
                                <img src={nearStore} alt='near store image' />
                            </div>
                            <div className='near-store-details-section'>
                                {nearStoreDetails.map((item, index) => (
                                    <span key={index}>
                                        <img src={item.icon} alt='icon' />
                                        <p>{item.details}</p>
                                    </span>
                                ))}
                            </div>
                            <div className='appointment-and-outlet-div'>
                                <a href='#'>
                                    <p>Outlet</p>
                                </a>
                                <a href='#'>
                                    <p>Directions</p>
                                </a>
                                <a href='#'>
                                    <p>Book an Appointment</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-right-section'>
                    <div className={`footer-right-get-scoop ${notLandingPage ? 'show-footer-get-the-scoop' : ''}`}>
                        <h3>Get The Scoop</h3>
                        <div className='footer-get-scoop-and-conditions'>
                            <div className='footer-get-scoop-input-search'>
                                <input type='text' placeholder='Email' />
                                <button>Sign Me Up!</button>
                            </div>
                            <p>By signing up, you agree to our  Privacy Policy  and  Terms of Use.</p>
                        </div>
                    </div>
                    <div className='right-section-care-and-about'>
                        {footerCustomerCareAndAbout.map((item, index) => (
                            <div key={index} className='footer-costumer-care-and-about'>
                                <h3>{item.heading}</h3>
                                {item.navLinks.map((navItem, inn) => (
                                    <a key={inn} href={navItem.link} className='about-and-care-link'>
                                        {navItem.name}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='footer-rights-reserved-container'>
                <p>2020 - 2024 Furniture Mecca. All Rights Reserved</p>
                <p>
                    <Link to={'https://zellesolutions.com/'}>Designed & Managed By Zelle Solutions</Link>
                </p>
            </div>
        </div>
        <div className='mobile-view-footer-main-div'>
            {/* <div className='mobile-footer-top-section'>
                <div className='mobile-footer-owner-logo'>
                    <div>
                        <img src={ownerTag} alt='owner tag' />
                    </div>
                    <div>
                        <h3>Furniture Mecca</h3>
                        <div>
                            {stars.map((items, indes) => (
                                <img ssrc={items} alt='star' />
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
            <MobileFooter />
        </div>
    </>
  )
}

export default Footer
