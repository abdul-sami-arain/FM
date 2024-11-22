import React, {useState, useEffect} from 'react'
import './SimillerProducts.css'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'
import arrowLeftRed from '../../../Assets/icons/arrow-left-red.png';
import arrowRightRed from '../../../Assets/icons/arrow-right-red.png';
import { useProducts } from '../../../context/productsContext/productContext'
import { useNavigate } from 'react-router-dom'
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext'
import axios from 'axios'
import { url } from '../../../utils/api'
import ProductCardTwo from '../ProductCard/ProductCard'
import heart from '../../../Assets/icons/heart-vector.png'

const SimillerProducts = ({collection}) => {
    // console.log('collected collection', collection)
    const products = collection;
    const similerProductsData = products.map((item) => item)
    // console.log("similler products", similerProductsData)

    const [data, setData] = useState()
    const fetchData = async () => {
        const api = `/api/v1/products/get/`;
        try {
            const request = similerProductsData.map(async (item) => {
                const response = await axios.get(`${url}${api}${item}`);
                return response.data.products;
            });
            const myCollections = await Promise.all(request);
            const filteredMyCollection = myCollections.flat();
            return filteredMyCollection;
        } catch (error) {
            console.error("error geting data", error)
        }
    }

    const getchMyCollectionProducts = async () => {
        const products = await fetchData();
        setData(products);
        // console.log("my colection data");
    }
    useEffect(() => {
        getchMyCollectionProducts()
    }, [])
    // console.log("converted my collection", data)
    // console.log("single collection", products)
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hideFilters, setHideFilters] = useState(false);

    // Change image on hover function
    const handleImageHover = (index) => {
      setHoveredIndex(index);
    };

    const handleImageHoverLeave = () => {
      setHoveredIndex(null);
    };

    // Card title words limit
    const maxLength = 30;
    const truncateTitle = (title, maxLength) => {
        if(!title) return '';
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
    };

    // Select Color Variations Functions
    const [selectedColorIndices, setSelectedColorIndices] = useState(Array(products.length).fill(0));
    const handleVariantImageClick = (cardIndex, colorIndex) => {
        const updatedIndices = [...selectedColorIndices];
        updatedIndices[cardIndex] = colorIndex;
        setSelectedColorIndices(updatedIndices);
    };

    // product color variation index from redux
    const colorIndex = useSelector((state) => state.colorIndex.colorIndex)

    const scrollContainerRef = useRef(null);
    const cardWidth = 310; // Adjust the width of your cards here
    const [simillerProductIndex, setSimillerProductIndex] = useState(0);
    const handleScroll = (direction) => {
        const newIndex = simillerProductIndex + direction;
        if(newIndex >= 0 && newIndex <= products.length - 1){
            setSimillerProductIndex(newIndex)
        }
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction * cardWidth * 1;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Prevent dragging to scroll
    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
    };
    const navigate = useNavigate();
    const handleCardClick = (item) => {
        navigate(`/product/${item.slug}`, {state: {products: item}})
    }
    
  return (
    <div className='similler-products-main-container'>
        <h3>Shop from this collection</h3>
        <div className='similler-products-wrapper' onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}>
            <button
                className={`scroll-button left ${simillerProductIndex >= products.length ? 'disable-similler-product-arrow' : ''}`}
                onClick={() => handleScroll(-1)} 
            //    onClick={handlePrev}
                disabled={simillerProductIndex === 0}
            >
                <img src={arrowLeftRed} alt='arrow-left' />
            </button> 
            <div className='similler-products-cards' ref={scrollContainerRef}>
                {data && data.slice(0, 12).map((item, index) => (
                    <ProductCard
                        key={item.uid}
                        maxWidthAccordingToComp={'100%'} justWidth={'310px'}
                        // tagIcon={item.productTag ? item.productTag : item.heart}
                        tagIcon={heart}
                        tagClass={` ${item.productTag ? 'tag-img' : 'heart-icon'}`}
                        tagDivClass={`${item.productTag ? 'product-tag-div' : 'heart-icon-div'}`}
                        mainImage={hoveredIndex === index && item.image.image_url ? item.hoverImage : item.image.image_url}
                        productCardContainerClass={`product-card ${hideFilters ? 'card-width-increase' : ''}`}
                        mouseEnter={() => handleImageHover(index)}
                        mouseLeave={handleImageHoverLeave}
                        ProductTitle={truncateTitle(item.name, maxLength)}
                        stars={item.ratingStars}
                        reviewCount={'200'}
                        lowPriceAddvertisement={item.lowPriceAddvertisement}
                        priceTag={item.regular_price}
                        financingAdd={item.financingAdd}
                        learnMore={item.learnMore}
                        colorVariation={item.colorVariation}
                        mainIndex={index}
                        deliveryTime={item.deliveryTime}
                        selectedColorIndices={selectedColorIndices}
                        handleVariantColor={() => handleVariantImageClick(index, colorIndex)}
                        borderLeft={index % 4 === 3}
                        stock={item.manage_stock}
                        handleCardClick={() => handleCardClick(item)}
                        singleProductData={item}
                        attributes={item.attributes}
                        ProductSku={item.sku}
                        sale_price={item.sale_price}
                    />
                ))}
            </div>
            <button
                className={`scroll-button right ${simillerProductIndex >= products.length ? 'disable-similler-product-arrow' : ''}`}
               onClick={() => handleScroll(1)} 
            //   onClick={handleNext}
            >
                <img src={arrowRightRed} about='arrow-right' />
            </button>
        </div>
    </div>
  )
}
export default SimillerProducts