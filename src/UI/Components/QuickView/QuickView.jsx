import React, { useEffect, useState } from 'react'
import './QuickView.css';
import filledStar from '../../../Assets/icons/orange-star.png';
import unFilledStar from '../../../Assets/icons/orange-star-outline.png';
import testimage from '../../../Assets/Furniture Mecca/product archive page/product images/Dakota-Dining-Set-01-600x400 1.png';
import imgTwo from '../../../Assets/Furniture Mecca/product archive page/product images/Dining-Room-Set-in-Gold-01-600x400 1.png';
import imgThree from '../../../Assets/Furniture Mecca/product archive page/product images/Zora-600x400 1.png';
import imgVariantOne from '../../../Assets/Furniture Mecca/product archive page/product images/Sherry-Set-01-300x200 1.png';
import imgVariantTwo from '../../../Assets/Furniture Mecca/product archive page/product images/Sherry-Set-01-300x200 1 (1).png';
import minusBtn from '../../../Assets/icons/minus.png'
import plusBtn from '../../../Assets/icons/plus.png';
import redHeart from '../../../Assets/icons/red-heart.png'
import arrowDown from '../../../Assets/icons/arrow-down-white.png';
import arrowLeft from '../../../Assets/icons/arrow-left.png';
import arrowRight from '../../../Assets/icons/arrow-right.png';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import { useProducts } from '../../../context/productsContext/productContext';
import { useCart } from '../../../context/cartContext/cartContext';
import { FaStar } from "react-icons/fa";
import { url } from '../../../utils/api';
import QuickViewVariations from '../SizeVariant/QuickViewVariations';

const QuickView = ({ setQuickViewProduct, stars , quickViewClose}) => {
    const { 
        cart, 
        addToCart, 
        increamentQuantity, 
        decreamentQuantity, 
        removeFromCart, 
    } = useCart();
    const [cartSection, setCartSection] = useState(false);
    const [viewDetails, setViewDetails] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isProtectionCheck, setIsProtectionCheck] = useState(true)

    const handleCartSectionClose = () => {
        setCartSection(false)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? setQuickViewProduct.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === setQuickViewProduct.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleViewDetails = (index) => {
        setViewDetails(prevIndex => (prevIndex === index ? null : index));
    }

    


    const quickViewData = [
        {
            name: 'Description',
            para: setQuickViewProduct.description,
        },
        {
            name: 'Weight & Dimension',
            para: setQuickViewProduct.short_description
            ,
        },
    ]

    const formatePrice = (price) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }

    
    const handleAddToCartProduct = (product) => {
        setCartSection(true);
        // console.log("clicked product", product)
        addToCart(product, quantity, isProtectionCheck);
        // console.log("cart data", cart)
    }

    const searchProductOnCart = cart.find((item) => item.product.uid === setQuickViewProduct.uid)
    const imagesLenght = setQuickViewProduct.images && setQuickViewProduct.images.length;
    const [quantity, setQuantity] = useState(searchProductOnCart !== undefined ? searchProductOnCart.product.quantity : 1)

    const increaseLocalQuantity = () => {
        setQuantity(quantity + 1);
    }
    const decreaseLocalQuantity = () => {
        setQuantity(quantity - 1);
    }


    return (
        <div className='quick-view-main'>
            <div className='quick-view-heading-and-rating'>
                <h3>{setQuickViewProduct.name}</h3>
                <div className='quick-view-rating'>
                    <div className='quick-view-start'>
                        {stars && stars.map((star, index) => (
                            // <img key={index} src={star.icon} alt='star' />
                            <FaStar size={15} className='quick-view-star-icon' />
                        ))}
                        <p>4.1</p>
                    </div>
                    <p>200 Reviews</p>

                </div>
            </div>
            <div className='quick-view-image-and-variations'>
                <div className="quick-view-slider">
                    <button className={`quick-view-arrow quick-view-left ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev}>
                        <img src={arrowLeft} alt='left' />
                    </button>
                    <div className="quick-view-slider-container">
                        <div className="quick-view-slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {setQuickViewProduct.images && setQuickViewProduct.images.map((image, index) => (
                                <img key={index} src={`${url}${image.image_url}`} alt={`Slide ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                    <button className={`quick-view-arrow quick-view-right ${currentIndex === imagesLenght - 1 ? 'disabled' : ''}`} onClick={handleNext}>
                        <img src={arrowRight} alt='right' />
                    </button>
                </div>
                <div className='quick-view-variations'>
                    {/* {setQuickViewProduct.colorVariation && setQuickViewProduct.colorVariation.map((item, index) => (
                    <div className='quick-view-var-one'>
                        <img src={imgVariantOne} alt='variation' />
                        <p>{item.color}</p>
                    </div>
                ))} */}
                    <QuickViewVariations attributes={setQuickViewProduct.attributes} />
                </div>
            </div>
            {/* <h3 className='quick-view-price'>{formatedQuickViewProductPrice}</h3> */}
            {
                setQuickViewProduct.sale_price === "" ?
                    <h3 className='-quick-view-product-price-tag'>{formatePrice(setQuickViewProduct.regular_price)}</h3> :
                    <h3 className='quick-view-product-price-tag'> <del>{formatePrice(setQuickViewProduct.regular_price)}</del>  {formatePrice(setQuickViewProduct.sale_price)}</h3>
            }
            <div className='quick-view-add-item-or-cart-btn'>
                <div className='quick-view-add-or-minus-item'>
                    <button onClick={decreaseLocalQuantity}>
                        <img src={minusBtn} alt='minus' />
                    </button>
                    <p>{quantity}</p>
                    <button onClick={increaseLocalQuantity}>
                        <img src={plusBtn} alt='plus' />
                    </button>
                </div>
                <img src={redHeart} alt='heart' className='quickview-heart-icon' />
                <button className='quick-view-add-to-cart' onClick={() => handleAddToCartProduct(setQuickViewProduct)}>
                    Add To Cart
                </button>
            </div>
            <div className='quick-view-details-section'>
                {quickViewData.map((items, index) => (
                    <div key={index} className='quick-view-detail-single-section'>
                        <div className='quick-view-details-heading' onClick={() => handleViewDetails(index)}>
                            <p>{items.name}</p>
                            <button >
                                <img src={arrowDown} alt='arrow down' className={viewDetails === index ? 'quick-view-rotate-up' : 'quick-view-rotate-down'} />
                            </button>
                        </div>
                        <div className={`quick-view-details ${viewDetails === index ? 'show-details' : ''}`}>
                            <p>{items.para}</p>
                        </div>
                    </div>
                ))}

            </div>
            <CartSidePannel
                cartData={cart}
                addToCartClicked={cartSection}
                setAddToCartClick={setCartSection}
                handleCartSectionClose={handleCartSectionClose}
                removeFromCart={removeFromCart}
                decreamentQuantity={decreamentQuantity}
                increamentQuantity={increamentQuantity}
                
            />
        </div>
    )
}

export default QuickView
