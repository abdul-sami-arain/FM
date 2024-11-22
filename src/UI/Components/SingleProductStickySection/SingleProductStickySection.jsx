import React, { useRef, useState, useEffect } from 'react';
import './SingleProductStickySection.css';
import { Link, useParams } from 'react-router-dom';
// Sticky Slider Images
import moonDanceImg from '../../../Assets/images/Moondance-Bedroom-Set-01-1024x644 2.png';
import arrowLeft from '../../../Assets/icons/arrow-left-red.png';
import arrowRight from '../../../Assets/icons/arrow-right-red.png';
import redHeart from '../../../Assets/icons/red-heart.png'

// Rating Stars Import
import blackStar from '../../../Assets/icons/star-black.png';
import whiteStar from '../../../Assets/icons/star-transperent-bg.png';
import minus from '../../../Assets/icons/minus.png';
import plus from '../../../Assets/icons/plus.png';

// Variant Images
import silverImage from '../../../Assets/images/silver-variant-image.png';
import brownImage from '../../../Assets/images/brown-variant-image.png';
import blackImage from '../../../Assets/images/black-variant-image.png';
import grayImage from '../../../Assets/images/gray-variant-image.png'
import WhatWeOffer from '../WhatWeOffer/WhatWeOffer';
import ProductOverView from '../ProductOverView/ProductOverView';
import SingleProductFAQ from '../SingleProductFAQ/SingleProductFAQ';
import AlsoNeed from '../AlsoNeed/AlsoNeed';



// Alice Slider
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import imgOne from '../../../Assets/Furniture Mecca/Landing Page/instagram images/B560__02 1.png';
import imgTwo from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 875.png';
import imgThree from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 876.png';
import imgFour from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 877.png';
import imgFive from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 878.png';
import { useCart } from '../../../context/cartContext/cartContext';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import FinancingOptions from '../FinancingOptions/FinancingOptions';
import SizeVariant from '../SizeVariant/SizeVariant';
import DeliveryOptions from '../DeliveryOptions/DeliveryOptions';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';
import heartIcon from '../../../Assets/icons/red-heart.png'
import { url } from '../../../utils/api';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';



const SingleProductStickySection = ({productData}) => {
  const product = productData;
  console.log("product data of top", productData.products);
  console.log("sticky products", product)

  const { cart, addToCart, decreamentQuantity , increamentQuantity, removeFromCart, calculateTotalPrice } = useCart();
  const [cartSection, setCartSection] = useState(false);
  const [isProtectionCheck, setIsProtectionCheck] = useState(true)
  console.log("reflection on sticky ", isProtectionCheck)

  console.log("local product uid", product.uid)
  const searchProductOnCart = cart.find((item) => item.product.uid === product.uid)
  console.log("cart product with uid", searchProductOnCart )



  const [quantity, setQuantity] = useState(searchProductOnCart !== undefined ? searchProductOnCart.product.quantity : 1)
  const increaseLocalQuantity = () => {
    setQuantity(quantity + 1);
  }
  const decreaseLocalQuantity = () => {
    setQuantity(quantity -1);
  }

  // Alice Slider
  const images = [imgOne, imgOne, imgOne, imgOne, imgOne];
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobActiveIndex, setMobActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const mobCarouselRef = useRef(null);

  const handleThumbnailClickk = (index) => {
    setActiveIndex(index);
    carouselRef.current.slideTo(index); // Slide to the selected thumbnail
  };
  const handleMobThumbnailClickk = (index) => {
    setActiveIndex(index);
    mobCarouselRef.current.slideTo(index); // Slide to the selected thumbnail
  };

  const handleNextSlide = () => {
    const newIndex = activeIndex + 1;
    if (newIndex < images.length) {
      setActiveIndex(newIndex);
      carouselRef.current.slideTo(newIndex); // Slide to the next thumbnail
    }
  };
  const handleMobNextSlide = () => {
    const newIndex = activeIndex + 1;
    if (newIndex < images.length) {
      setActiveIndex(newIndex);
      mobCarouselRef.current.slideTo(newIndex); // Slide to the next thumbnail
    }
  };
  // const handleMobileNextSlide = () => {
  //   const newIndex = mobActiveIndex + 1;
  //   if (newIndex < images.length) {
  //     setMobActiveIndex(newIndex);
  //     mobCarouselRef.current.slideTo(newIndex); // Slide to the next thumbnail
  //   }
  // };

  const handlePrevSlide = () => {
    const newIndex = activeIndex - 1;
    if (newIndex >= 0) {
      setActiveIndex(newIndex);
      carouselRef.current.slideTo(newIndex); // Slide to the previous thumbnail
    }
  };
  const handleMobPrevSlide = () => {
    const newIndex = activeIndex - 1;
    if (newIndex >= 0) {
      setActiveIndex(newIndex);
      mobCarouselRef.current.slideTo(newIndex); // Slide to the previous thumbnail
    }
  };
  // const handleMobilePrevSlide = () => {
  //   const newIndex = mobActiveIndex - 1;
  //   if (newIndex >= 0) {
  //     setMobActiveIndex(newIndex);
  //     mobCarouselRef.current.slideTo(newIndex); // Slide to the previous thumbnail
  //   }
  // };


  // Calculate the visible thumbnails
  
  const visibleThumbnails = () => {
    const totalImages = images.length;
    const startIndex = Math.max(0, activeIndex > totalImages - 4 ? totalImages - 4 : activeIndex);
    return images.slice(startIndex, startIndex + 4);
  };

  // sticky behavior scrip
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (leftSectionRef.current && rightSectionRef.current) {
        const leftSection = leftSectionRef.current;
        const rightSection = rightSectionRef.current;

        const rightSectionBottom = rightSection.getBoundingClientRect().bottom;
        const leftSectionBottom = leftSection.getBoundingClientRect().bottom;

        if (rightSectionBottom < window.innerHeight) {
          leftSection.style.position = 'absolute';
          leftSection.style.bottom = '0';
        } else {
          leftSection.style.position = 'sticky';
          leftSection.style.bottom = 'auto';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Handle resizing of the window

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Sticky Behavior cript end

  //   Second Section Functions

  const ratingStars = [
    { name: 'filled Star', icon: blackStar },
    { name: 'filled Star', icon: blackStar },
    { name: 'filled Star', icon: blackStar },
    { name: 'filled Star', icon: blackStar },
    { name: 'un-filled Star', icon: whiteStar },
  ]

  const variantImages = [
    { name: 'Silver', img: silverImage },
    { name: 'Brown', img: brownImage },
    { name: 'Black', img: blackImage },
    { name: 'Gray', img: grayImage },
  ]

  // const [variationName, setVariationName] = useState(product.colorVariation[0].color)
  const [variationName, setVariationName] = useState(0)
  const handleColorVariation = (index) => {
    setVariationName(index);
  }

  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount(prevCount => Math.max(1, prevCount - 1));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };



  // useEffect(() => {
  //   console.log("updated product after increase", singleProduct)
  // }, [singleProduct])

  const handleAddToCartProduct = (product) => {
    setCartSection(true);
    console.log("clicked product", product)
    addToCart(product, quantity, isProtectionCheck);
    console.log("cart data", cart)
  }
  const handleCartClose = () => {
    setCartSection(false)
  }

  return (
    <>
      <div className='sticky-main-container'>
        {/* <Breadcrumb /> */}
        <div className='left-section'>
          {/* <Breadcrumb /> */}
          <p className='single-product-slider-main-image-stock-tag' >In Stock</p>
          {product.tags && <p className='single-product-slider-main-image-sale-tag' style={{backgroundColor: product.tags[0].bg_color}}> {product.tags[0].text}</p> }
          <div className='single-product-alice-slider'>
            <button className='single-product-arrow single-product-arrow-left' onClick={handlePrevSlide} >
              <img src={arrowLeft} alt='left' />
            </button>
            <AliceCarousel
              ref={carouselRef} // Attach the ref
              activeIndex={activeIndex}
              disableDotsControls
              disableButtonsControls
              items={product.images && product.images.map((img, index) => (
                <img key={index} src={`${"https://fm.skyhub.pk"}${img.image_url}`} className="single-product-slider-img" alt={`Slide ${index}`} />
              ))
              }
              responsive={{
                0: { items: 1 },
                1024: { items: 1 }
              }}
            />
            <div className="single-product-slider-thumbnails">
              {product.images && product.images.map((img, index) => (
                <div
                  key={index}
                  className={`single-product-slider-thumbnail ${activeIndex === index ? '' : 'single-product-slider-thumbnail-inactive'}`}
                  onClick={() => handleThumbnailClickk(index)}
                >
                  <img src={`${"https://fm.skyhub.pk"}${img.image_url}`} alt={`Thumbnail ${index}`} />
                </div>
              ))}
            </div>
            <button className='single-product-arrow single-product-arrow-right' onClick={handleNextSlide}>
              <img src={arrowRight} alt='right' />
            </button>
          </div>
        </div>
        <div className='right-section'>
          <div className='single-product-detail-container'>
            <div className='single-page-product-name-anddetails'>
              <h3 className='single-product-heading'>{product.name}</h3>
              <div className='single-product-rating'>
                <span className='stars-icon'>
                  {ratingStars && ratingStars.map((item, index) => {
                    return <img key={index} src={item.icon} alt={item.name} className='star-img' />
                  })}
                </span>
                <p>4.1</p>
                <Link>200 Reviews</Link>
              </div>
              {/* <h3 className='single-product-price'>${productData.productCard.priceTag}</h3> */}
              <div className='single-product-prices'>
                <del className='single-product-old-price'>{product.regular_price}</del>
                <h3 className='single-product-new-price'>${product.regular_price}</h3>
              </div>
              {/* <p className='single-product-installment-price-price'>$9/month for 6 months - Total {productData.productCard.priceTag} </p> */}

              <span className='single-product-shipping'>
                <p className='single-product-installment-price-price'>$9/month for 6 months - Total $ 199.00 </p>
                <p>Get it between July 27 - July 31'</p>
              </span>
              <div className='single-product-frame-color'>
                <SizeVariant attributes={product.attributes}/>
              </div>
              <div className='add-cart-or-add-items-div'>
                <div className='item-count'>
                  <button className={`minus-btn ${product.quantity === 1 ? 'disabled' : ''}`} onClick={decreaseLocalQuantity} disabled={product.quantity === 1}>
                    <img src={minus} alt='minus btn' />
                  </button>
                  
                  <input type='number' value={quantity} readOnly />
                  {/* <p>{product.quantity}</p> */}
                  <button className='plus-btn' onClick={increaseLocalQuantity}>
                    <img src={plus} alt='plus btn' />
                  </button>
                </div>
                <img src={redHeart} alt='red-heart-icon' className='red-heart-icon' />
                <button
                  className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`}
                  onClick={() => {
                    handleClick();
                    handleAddToCartProduct(product)
                  }
                  }>
                  {isLoading ? 'Loading...' : 'Add To Cart'}
                </button>
              </div>
            </div>
            <FinancingOptions />
            {product.may_also_need && product.may_also_need.length > 0 ? <AlsoNeed productsUid={product.may_also_need} /> : <></>}
            
            <WhatWeOffer isProtected={isProtectionCheck} setIsProtected={setIsProtectionCheck} />
            <DeliveryOptions />
            {/* <ProductOverView /> */}
            <SingleProductFAQ description={product.description} />
          </div>
        </div>
        <CartSidePannel
          cartData={cart}
          addToCartClicked={cartSection}
          handleCartSectionClose={handleCartClose}
          removeFromCart={removeFromCart}
          decreamentQuantity={decreamentQuantity}
          increamentQuantity={increamentQuantity}
        />
      </div>

      <div className='mobile-view-sticky-main-container'>
        <div className='mobile-view-single-product-slider'>
          <div className='mobile-view-product-tags'>
            <h3>In stock</h3>
            <h3>Clarence Sale</h3>
          </div>
          <h3 className='mobile-view-product-name'>
            {product.productTitle}
          </h3>
          <div className='mobile-view-price-and-favorite-div'>
            <div className='old-and-new-price'>
              <del>$199.00</del>
              <p>${product.priceTag}</p>
            </div>
            <img src={heartIcon} alt='heart' />
          </div>
          <div className='mobile-view-single-product-rating'>
            <span className='mobile-view-stars-icon'>
              {product.ratingStars && product.ratingStars.map((item, index) => {
                return <img key={index} src={item.icon} alt={item.name} className='star-img' />
              })}
            </span>
            <p>4.1</p>
            <Link>{product.reviewCount} Reviews</Link>
          </div>
          <div className='mobile-view-single-product-slider-main-section'>
            <button
              className='mobile-single-product-slider-arrow mobile-single-product-arrow-left'
              onClick={handleMobPrevSlide}
            >
              <img src={arrowLeft} alt='left arrow' />
            </button>
            <div className='mobile-view-single-product-slider-main-image'>
              <AliceCarousel
                ref={mobCarouselRef} // Attach the ref
                activeIndex={activeIndex}
                disableDotsControls
                disableButtonsControls
                items={product.productAllImages && product.productAllImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="single-product-slider-img"
                    alt={`Slide ${index}`}
                  />
                ))
                }
                responsive={{
                  0: { items: 1 },
                  1024: { items: 1 }
                }}
              />
            </div>
            <div className='mobile-view-slider-thumb-images'>
              {product.productAllImages && product.productAllImages.map((img, index) => (
                <div
                  key={index}
                  className={`single-product-slider-thumbnail ${activeIndex === index ? '' : 'single-product-slider-thumbnail-inactive'}`}
                  onClick={() => handleMobThumbnailClickk(index)}
                >
                  <img src={img} alt={`Thumbnail ${index}`} />
                </div>
              ))}
            </div>
            <button
              className='mobile-single-product-slider-arrow mobile-single-product-arrow-right'
              onClick={handleMobNextSlide}
            >
              <img src={arrowRight} alt='arrow right' />
            </button>
          </div>
        </div>
        <div className='mobile-view-single-product-details'>
          <div className='mobile-view-color-variant'>
              <div className='mobile-selected-color'>
                <p>Selected Color: </p>
                <h3>{variationName}</h3>
              </div>
              <div className='mobile-variant-images-div'>
                  {product.colorVariation && product.colorVariation.map((item, index) => {
                    return <div key={index} className={`mobile-single-product-color-variant ${variationName === index ? 'selected-color-variation' : ''}`} onClick={() => handleColorVariation(item.color)}>
                      <img src={silverImage} alt='img' />
                      <p>{item.color}</p>
                    </div>
                  })}
                </div>
          </div>
          <SizeVariant />
          <div className='mobile-product-count-and-add-to-cart'>
              <div className='mobile-product-count'>
                  <button>
                    <img src={minus} alt='minus-btn' />
                  </button>
                  <p>0</p>
                  <button>
                    <img src={plus} alt='plus-btn' />
                  </button>
              </div>
              <button className='mobile-add-to-cart-btn'>Add To Cart</button>
          </div>
          <FinancingOptions />
          <SingleProductFAQ />
        </div>
      </div>
    </>
  );
};

export default SingleProductStickySection;
