import React, { useState, useRef, useEffect } from 'react';
import './BestSeller.css';
import BestSellerProductCard from '../BestSellerProductCard/BestSellerProductCard';
import bannerOne from '../../../Assets/Furniture Mecca/category page/best sellers/banner-1.png';
import bannerTwo from '../../../Assets/Furniture Mecca/category page/best sellers/banner-2.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { IoStar } from "react-icons/io5";


import heartIcon from '../../../Assets/icons/like.png'
import arrowLeft from '../../../Assets/icons/arrow-left.png'
import arrowRight from '../../../Assets/icons/arrow-right.png'
import testImage from '../../../Assets/Furniture Mecca/category page/best sellers/Lisbon-bed-dresser-600x400 1.png'
import { useProducts } from '../../../context/productsContext/productContext';
import bestSellerMobileBanner from '../../../Assets/Furniture Mecca/Landing Page/best seller products/mobile-view-main-image.png';

const BestSeller = () => {
    const bestSellerNav = ['Living Room', 'Bedroom', 'Dining Room']
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState(0)

    const handleActiveItem = (index) => {
        setLoading(true); // Start loading
        setActiveItem(index);
        setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 2000);
    };

    // const productCardData = useSelector((state) => state.productCard.data)
    const {products} = useProducts();

    const navigate = useNavigate()
    
    const handleProductClick = (item) => {
        navigate(`/product/${item.slug}`, { state: { products: item } });
        console.log("Clicked on ", item.slug);
    }

    const itemPerPage = 6
    const maxIndex = Math.ceil(products.length / itemPerPage) -1;
    const [currentIndex, setCurrentIndex] = useState(1)
    const handlePageChange = (index) => {
        // setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0))
        setCurrentIndex(index)
    }

    // Mobile view script
    const [mobiIndex, setMobIndex] = useState(0)
    const handleMobileNavClick = (index) => {
        setMobIndex(index);
    }
    const mobileItemPerPage = 1
    const mobileMaxIndex = Math.ceil(products.length / mobileItemPerPage) -1;
    const [mobCurrentIndex, setMobCurrentIndex] = useState(1)
    const handleMobilePageChange = (index) => {
        // setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0))
        setMobCurrentIndex(index)
    }
    const handleMobileSliderNext = (index) => {
        setMobCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % mobileItemPerPage;
            return nextIndex
        })
    }

    const handleMobileSliderPrev = (index) => {
        setMobCurrentIndex((prevIndex) => {
            const previusIndex = (prevIndex - 1) % mobileItemPerPage;
            return previusIndex;
        })
    }

    // const handleActiveItem = (index) => {
    //     setLoading(true); // Start loading
    //     setActiveItem(index);
    //     setTimeout(() => {
    //         setLoading(false); // Stop loading after 2 seconds
    //     }, 2000);
    // };


  return (
    <div className={`category-besst-seller-main-container ${loading ? 'blurred' : ''}`}>
         {loading && <Loader />}
        <div className='category-best-seller-and-banner-container'>

            <div className='category-best-seller-cards-section'>

                <div className='category-best-seller-menu'>
                    <h3>Best Seller</h3>
                    <div className='category-best-seller-menu-items'>
                        {bestSellerNav.map((item, index) => (
                            <p key={index} className={activeItem === index ? 'active' : ''} onClick={() => handleActiveItem(index)}>Living Room</p>
                        ))}
                    </div>
                </div>

                <div className='products-slider-container'>
                    <div className='best-seller-slider' style={{ transform: `translateX(-${(currentIndex / maxIndex) * 0}%)` }}>
                        {products.slice(currentIndex, currentIndex + itemPerPage).map((item, index) => (
                            <BestSellerProductCard
                                key={index}
                                productData={item}
                                productMainImage={item.mainImage}
                                starIcon={item.ratingStars}
                                reviews={item.reviewCount}
                                productName={item.productTitle}
                                oldPrice={item.priceTag}
                                newPrice={item.priceTag} 
                                handleCardClicked={() => handleProductClick(item)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='category-best-seller-banners-section'>
                <img src={bannerOne} alt='banner one' />
                <img src={bannerTwo} alt='banner one' />
            </div>

        </div>

        <div className='mobile-view-category-best-seller'>
            <div className='mobile-view-category-best-seller-heading-section'>
                <h3>Best Seller</h3>
            </div>
            <div className='mobile-view-category-best-seller-nav-and-banner'>
                <img src={bestSellerMobileBanner} alt='mobile-main-banner' />
                <div className='mobile-view-category-best-seller-nav-items'>
                    {bestSellerNav.map((items, index) => (
                        <p 
                            key={index}
                            onClick={() => {handleMobileNavClick(index); handleActiveItem(index)}}
                            className={`mobile-view-nav-link ${mobiIndex === index ? 'mobile-view-nav-active' : ''}`}
                            
                        >
                            {items}
                        </p>
                    ))}
                </div>
            </div>
                <div className='mobile-view-category-best-seller-card-section'>
                    <button 
                        className='mobile-view-best-seller-slider-arrows mobile-view-best-seller-arrow-left'
                        onClick={() => handleMobileSliderPrev(mobCurrentIndex)}
                    >
                        <img src={arrowLeft} alt='left-arrow' />
                    </button>
                    <div className='mobile-view-best-seller-slider' style={{transform: `translateX(-${(mobCurrentIndex / mobileItemPerPage) * 100}%)`}}>
                    {products.slice(mobCurrentIndex, mobCurrentIndex + mobileItemPerPage).map((item, index) => (
                        <BestSellerProductCard
                            key={index}
                            productData={item}
                            productMainImage={item.mainImage}
                            starIcon={item.ratingStars}
                            reviews={item.reviewCount}
                            productName={item.productTitle}
                            oldPrice={item.priceTag}
                            newPrice={item.priceTag} 
                            handleCardClicked={() => handleProductClick(item)}
                        />
                    ))}
                    </div>
                    <button 
                        className='mobile-view-best-seller-slider-arrows mobile-view-best-seller-arrow-right'
                        onClick={() => handleMobileSliderNext(mobCurrentIndex)}
                    >
                        <img src={arrowRight} alt='right arrow' />
                    </button>
                </div>
                <div className='mobile-view-category-pagination-dots'>
                    {Array.from({ length: maxIndex }, (_, index) => (
                        <span 
                            key={index} 
                            className={`category-dot ${mobCurrentIndex === index ? 'category-dot-active-active' : ''}`} 
                            onClick={() => handleMobilePageChange(index)}
                        ></span>
                    ))}
                </div>
        </div> 

        <div className='category-pagination-dots'>
            {Array.from({ length: maxIndex }, (_, index) => (
                <span 
                    key={index} 
                    className={`category-dot ${currentIndex === index ? 'category-dot-active-active' : ''}`} 
                    onClick={() => handlePageChange(index)}
                ></span>
            ))}
        </div>
    </div> 

  )
}

export default BestSeller
