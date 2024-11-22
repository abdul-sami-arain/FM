import React, { useState, useRef, useEffect } from 'react';
import '@splidejs/react-splide/css'
import './BestSellerSlider.css';
import BestSellerSliderMainBanner from '../../../Assets/Furniture Mecca/Landing Page/best seller products/Home Page Banner 396x595.jpg';
import bestSellerMainSecondImage from '../../../Assets/Furniture Mecca/Landing Page/best seller products/Bedroom Side Banners 2 (2).png';
import { Link, useNavigate } from 'react-router-dom';
import BestSellerProductCard from '../BestSellerProductCard/BestSellerProductCard';
import { useProducts } from '../../../context/productsContext/productContext';
import star from '../../../Assets/icons/Star 19.png'

import leftArrow from '../../../Assets/icons/arrow-left-white.png';
import rightArrow from '../../../Assets/icons/right-arrow-white.png';
import axios from 'axios';
import { url } from '../../../utils/api';
import { addQuantityIntoProduct } from '../../../utils/AddQuantityIntoProduct/AddQuantity';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
import {  useCart } from '../../../context/AddToCart/addToCart';
// import { SingleProductProvider } from '../../../context/AddToCart/addToCart';

const BestSellerPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={leftArrow} alt='arrow' />
        </div>
    )
}

function BestSellerNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={rightArrow} alt='arrow' />
        </div>
    )
}


const BestSellerSlider = () => {
    const navigate = useNavigate()
    
    // const { products} = useProducts()
    // const {allProducts} = useProducts()
    const [allProducts, setAllProducts] = useState([])
    // console.log("products", allProducts)
    const getBestSellerProducts = async () => {
        const api = `/api/v1/products/get-best-selling-products`
        try {
            const response = await axios.get(`${url}${api}`)
            // console.log("response best seller", response.data.products)
            setAllProducts(response.data.products)
        } catch (error) {
            console.error("error geting best seller products", error);
        }
    }
    useEffect(() => {
        getBestSellerProducts()
    }, [])

    // States for current page, cards per page, and loading
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerPage] = useState(6);
    const [totalPages] = useState(Math.ceil(allProducts.length / cardsPerPage));
    const [applyFilter, setApplyFilter] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState(0)
    const bestSellerNav = ['Living Room', 'Bedroom', 'Dining Room']
    const [mobIndex, setMobIndex] = useState(0)
    const [cardIndex, setCardIndex] = useState(0)

    const handleActiveItem = (index) => {
        setActiveItem(index)
        setLoading(true); // Show loader
        setTimeout(() => {
            setActiveItem(index);
            setLoading(false); // Hide loader after 2 seconds
        }, 1000);
    }
    const settings = {
        // className: "slider variable-width",
        className: 'center',
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        // arrows: false,
        nextArrow: <BestSellerNextArrow to="next" />,
        prevArrow: <BestSellerPrevArrow to="prev" />,
    };
    useEffect(() => {
        const handleResizer = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizer);
        return () => window.removeEventListener("resize", handleResizer)
    })

    // product slice to show 6 product maxx
    const {addSingleProduct} = useSingleProductContext();
    const {addToCart} = useCart()
    // const {addSingleProduct} = SingleProductProvider()
    const handleCardClicked = (item) => {
        // console.log("item clicked", item)
        // addSingleProduct(item)
        addSingleProduct(item)
        addToCart(item)
        navigate(`/product/${item.slug}`, {state: item})
        // addQuantityIntoProduct(item.uid, setAllProducts, allProducts)
        // console.log("product uid", item.uid)
        // console.log("added quantity into payload", allProducts)

    }

    // mobile scripts
    const mobileSettings = {
        // className: "slider variable-width",
        className: 'center',
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        arrows: false,
        nextArrow: <BestSellerNextArrow to="next" />,
        prevArrow: <BestSellerPrevArrow to="prev" />,
    };

    const handleMobileNavClick = (index) => {
        setApplyFilter(true);
        setTimeout(() => {
            setApplyFilter(false);
            setMobIndex(index)
        }, 1000)
    }


    // State for the current page (used for pagination and translateX calculation)
    const [currentPage, setCurrentPage] = useState(0);

    // Function to handle page change on dot click
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Get the slice of products to display based on the current page
    const getDisplayedCards = () => {
        const start = currentPage * cardsPerPage;
        const end = start + cardsPerPage;
        const publishedProductes = allProducts.filter(product => product.status === 'published');
        const productWithDiscount = publishedProductes.map((product) => {
            let newPrice = parseFloat(product.regular_price);
            if (product.discount && product.discount.is_discountable === 1) {
                const oldPrice = parseFloat(product.regular_price); // Convert regular_price to a number
                const discountValue = parseFloat(product.discount.discount_value);
                // console.log("discount value", discountValue, parseFloat(product.regular_price))

                // Calculate the new price based on the discount type
                if (product.discount.discount_type === 'percentage' && !isNaN(discountValue)) {
                    newPrice = parseFloat(product.regular_price) - (parseFloat(product.regular_price) * (discountValue / 100));
                    // console.log("new price", oldPrice * (discountValue / 100));
                    // console.log("old price", oldPrice)
                    newPrice = parseFloat(newPrice.toFixed(2));
                } else if(product.discount.discount_type === 'currency' && !isNaN(discountValue)){
                    newPrice = oldPrice - discountValue;
                    newPrice = parseFloat(newPrice.toFixed(2));
                }
                //else if (product.discount.discount_type === 'fixed') 
                else{
                    // newPrice = oldPrice - parseFloat(product.discount.discount_value);
                    newPrice = oldPrice;
                }
            }
            return {
                ...product,
                newPrice
            }
        })
        
        return productWithDiscount.slice(start, end);
    };


    const handlePaginationClick = (index) => {
        // setCardIndex(index);
        const newIndex = Math.max(0, Math.min(allProducts.length - 1, index));
        setCardIndex(newIndex);
    };

    const getDisplayedIndexes = () => {
        const halfVisible = 1; // Half of the dots
        const start = Math.max(0, currentIndex - halfVisible);
        const end = Math.min(totalPages - 1, start + 3);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const displayedIndexes = getDisplayedIndexes();
    const ratingStars = [
        { icon: star },
        { icon: star },
        { icon: star },
        { icon: star },
        { icon: star }
    ]

    

    return (
        <div className="best-seller-slider-container">

            <div className='best-seller-imaage-and-cards'>
                <div className='best-seller-slider-main-banner'>
                    <img src={activeItem === 0 ? BestSellerSliderMainBanner : bestSellerMainSecondImage} alt='main banner' />
                </div>
                <div className='best-seller-slider-div'>
                    <div className='best-seller-slider-menu-bar'>
                        <h3>Best Seller</h3>
                        <div className='best-seller-menu-bar'>
                            {bestSellerNav.map((item, index) => (
                                <p
                                    key={index}
                                    className={activeItem === index ? 'active' : ''}
                                    onClick={() => handleActiveItem(index)}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className='best-seller-slider-main-banner-mobile-view'>
                        <img src={activeItem === 0 ? BestSellerSliderMainBanner : bestSellerMainSecondImage} alt='main banner' />
                    </div>
                    <div className='products-slider-container'>

                        <div className='best-seller-slider-wrapper' style={{ overflow: 'hidden' }}>
                            <div
                                className='best-seller-slider'
                                style={{
                                    transform: `translateX(-${(currentIndex / totalPages) * 100}%)`
                                }}>
                                {/* {products.slice(currentIndex, currentIndex + cardsPerPage).map((item, index) => ( */}
                                {getDisplayedCards().slice(currentIndex, currentIndex + cardsPerPage).map((item, index) => (
                                    <BestSellerProductCard
                                        productData={item}
                                        isDiscountable={item.discount.is_discountable === 1 ? true : false}
                                        key={index}
                                        productMainImage={item.images?.[0]?.image_url}
                                        starIcon={ratingStars}
                                        reviews={'200'}
                                        productName={item.name}
                                        oldPrice={item.regular_price}
                                        newPrice={item.newPrice}
                                        handleCardClicked={() => handleCardClicked(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Seller Mobile View */}
            <div className='mobile-view-best-seller-main-container'>
                <div className={`mobile-view-best-seller-loading ${applyFilter ? 'show-mobile-view-best-seller-filter' : ''}`}></div>
                <h3 className='mobile-view-best-seller-heading'>Best Seller</h3>
                <div className='mobile-view-nav-and-card-contaner'>

                    <div className='mobile-view-best-seller-menu-items'>
                        {bestSellerNav.map((items, index) => (
                            <p
                                key={index}
                                className={`mobile-view-best-seller-nav ${mobIndex === index ? "mobile-view-nav-active" : ""}`}
                                onClick={() => handleMobileNavClick(index)}
                            >
                                {items}
                            </p>
                        ))}
                    </div>

                    <div className='mobile-view-slider-cards'>

                        <div
                            className='mobile-view-single-card-container'
                            style={{ display: 'flex', transform: `translateX(-${cardIndex * 100}%)`, transition: 'transform 0.5s ease' }}
                        >
                            {getDisplayedCards().slice(cardIndex, cardIndex + 1).map((item, index) => (
                                <BestSellerProductCard
                                    productData={item}
                                    isDiscountable={item.discount.is_discountable === 1 ? true : false}
                                    key={index}
                                    productMainImage={item.images?.[0]?.image_url}
                                    starIcon={ratingStars}
                                    reviews={'200'}
                                    productName={item.name}
                                    oldPrice={item.regular_price}
                                    newPrice={item.newPrice}
                                    handleCardClicked={() => handleCardClicked(item)}
                                />
                            ))}
                        </div>

                        <div className='mobile-pagination-dots'>
                            {displayedIndexes.map((_, index) => (
                                <span
                                    key={index}
                                    className={`mobile-dot ${index === cardIndex ? 'mobile-active' : ''}`}
                                    onClick={() => handlePaginationClick(index)}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </div>

            <div className='pagination-dots'>
                {/* {Array.from({ length: totalPages }, (_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handlePageChange(index)}
                    ></span>
                ))} */}
                {displayedIndexes.map((pageIndex) => (
                    <span
                        key={pageIndex}
                        className={`dot ${currentIndex === pageIndex ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageIndex)} // Change page on dot click
                    >
                    </span>
                ))}
            </div>

        </div>
    );
};

export default BestSellerSlider;
