import React, { useState, useEffect, useRef } from 'react'
import './ProductCard.css';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setColorIndex } from '../../../Redux/ColorIndex/ColorINdexSlicer';
import cartIcon from '../../../Assets/icons/cart-white.png'
import cartBlack from '../../../Assets/icons/cart-black.png';
import eyeBlack from '../../../Assets/icons/eye-black.png';
import eyeWhite from '../../../Assets/icons/eye-white.png';
import namer from 'color-namer';
import { url } from '../../../utils/api';

const ProductCard = ({
    tagIcon,
    tagClass,
    mainImage,
    productCardContainerClass,
    mouseEnter,
    mouseLeave,
    ProductTitle,
    ProductSku,
    stars,
    reviewCount,
    lowPriceAddvertisement,
    priceTag,
    sale_price,
    tags,
    financingAdd,
    percent,
    singleProductData,
    slug,
    stock,
    handleQuickView,
    learnMore,
    colorVariation,
    handleAddToCart,
    handleCartSectionOpen,
    mainIndex,
    deliveryTime,
    handleVariantColor,
    selectedColorIndices,
    maxWidthAccordingToComp,
    borderLeft,
    justWidth,
    handleCardClick,
    attributes
}) => {

    const [cartClicked, setCartClicked] = useState(true);

    const dispatch = useDispatch();
    const selectedColorIndex = useSelector((state) => state.colorIndex.colorIndex);
    const handleColorVariationIndex = (colorIndex) => {
        dispatch(setColorIndex(colorIndex))
    }

    const handleClick = (colorIndex, color) => {
        dispatch(setColorIndex(colorIndex));
        if (handleVariantColor) {
            handleVariantColor();
        }
    };

    const [cardHovered, setCardHovered] = useState(false);
    const handleMouseEnter = () => {
        setCardHovered(true)
        console.log(cardHovered);
    }

    const handleMouseLeave = () => {
        setCardHovered(false);
    }

    const [quickViewHovered, setQuickViewHovered] = useState(false);
    const handleQuickViewHover = () => {
        setQuickViewHovered(true);
    }
    const handlQuickViewLeave = () => {
        setQuickViewHovered(false)
    }

    const getPriorityAttribute = (attributes) => {
        return attributes && attributes.find(attr => attr.type === "image") ||
            attributes && attributes.find(attr => attr.type === "color") ||
            attributes && attributes.find(attr => attr.type === "select");
    };

    const priorityAttribute = getPriorityAttribute(attributes);

    return (
        <>
            <div className={`${productCardContainerClass} ${borderLeft ? 'hide-after' : ''} `} style={{ maxWidth: maxWidthAccordingToComp, width: justWidth }}>
                <div className='product-card-data'>





                    <div className='tag-and-heart'>
                        <h3 className='stock-label'>{stock.is_stock_manage === 1 ? "In Stock" : "Out of Stock"}</h3>
                        <p className='percent-label'>{percent}</p>
                        <img src={tagIcon} alt='heart img' className={tagClass} />
                    </div>






                    <div className='product-main-image-container'>
                        <img src={`${"https://fm.skyhub.pk"}${mainImage}`}
                            alt='product img' className='product-main-img'
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave} />
                        <div className='overlay-buttons'>
                            <button className={`overlay-button ${cartClicked ? 'loading' : ''}`} onClick={handleQuickView} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <img src={cardHovered ? cartIcon : cartBlack} alt='cart' />
                                Add to cart
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleCardClick(singleProductData);
                            }
                            } className='overlay-button' onMouseEnter={handleQuickViewHover} onMouseLeave={handlQuickViewLeave}>
                                <img src={quickViewHovered ? eyeWhite : eyeBlack} alt='cart' />
                                View Product
                            </button>
                        </div>
                    </div>






                    {tags && <div className="product-tagging">
                        {
                            tags[0].type.toLowerCase() === "text" ?
                                <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                    {tags[0].text}
                                </div> :
                                <div className='image-tag' >
                                    <img src={"https://fm.skyhub.pk" + tags[0].image} alt="" srcset="" />
                                </div>
                        }
                    </div>}
                    <p className='product-sku' onClick={handleCardClick}>SKU : {ProductSku}</p>
                    <Link className='product-title' > {ProductTitle} </Link>
                    <div className='product-rating-stars-div'>
                        {/* {stars.map((stars, starIndex) => {
                            return <img src={stars.icon} alt='star' />
                        })} */}
                        <p>{reviewCount}</p>
                    </div>


                    <p className='mobile-view-low-price'>{lowPriceAddvertisement}</p>
                    {
                        sale_price === "" ?
                            <h3 className='product-price-tag'>${priceTag}</h3> :
                            <h3 className='product-price-tag'> <del>${priceTag}</del>  ${sale_price}</h3>
                    }
                    {/* <div className='category-product-price'>
                        {sale_price !== "" ? <del>${priceTag}</del> : <></>}
                        <p>${sale_price}</p>

                    </div> */}

                    {priorityAttribute && (
                        <div className='product-card-attr' >
                            {priorityAttribute.type === "image" && (
                                <div className="image-variation">
                                    {priorityAttribute.options.map((item, index) => (
                                        <img
                                            key={index}
                                            src={"https://fm.skyhub.pk" + item.value}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            )}

                            {priorityAttribute.type === "color" && (
                                <div className="color-variation-div">
                                    {priorityAttribute.options.map((item, index) => (
                                        <span
                                            key={index}
                                            className="color-variation"
                                            onClick={() => { }}
                                            style={{
                                                backgroundColor: item.value,
                                                border: 'none',
                                                boxShadow: ''
                                            }}
                                        ></span>
                                    ))}
                                </div>
                            )}

                            {priorityAttribute.type === "select" && (
                                <div className="text-variation">
                                    {priorityAttribute.options.map((item, index) => (
                                        <p key={index} className="attr-var">{item.value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}



                    {/* <p className='mobile-view-mos-finance'>12 mos special financing <i> Learn more</i></p> */}
                    <div className='color-variation-div'>
                        <div className='color-variations'>
                            {colorVariation && colorVariation.map((color, colorIndex) => {
                                return <span key={colorIndex} className='color-variation' onClick={() => handleClick(colorIndex, color)}
                                    style={{
                                        backgroundColor: `${color.color}`,
                                        border: selectedColorIndices[mainIndex] === colorIndex ? `1px solid ${color.color}` : 'none',
                                        boxShadow: selectedColorIndices[mainIndex] === colorIndex ? `inset 0 0 0 2px #FFFF` : ''
                                    }}></span>
                            })}
                        </div>
                        <div className='mobile-view-cart-and-view-icons'>
                            <img src={cartBlack} alt='cart icon' />
                            <img src={eyeBlack} alt='eye icon' onClick={handleQuickView} />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductCard
