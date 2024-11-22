import React, { useEffect, useState } from "react";
import "./FurnitureAtEveryBudget.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductCardTwo from "../../Components/ProductCard/ProductCardTwo";
import star from '../../../Assets/icons/blue-star.png'
import { url } from "../../../utils/api";
import { useLocation, useNavigate } from 'react-router-dom';
import heart from '../../../Assets/icons/heart-vector.png'
import QuickView from "../../Components/QuickView/QuickView";
import { IoMdClose } from "react-icons/io";


export default function FurnitureAtEveryBudget() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('categoryUid');
    const max_price = queryParams.get('max_price');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/api/v1/products/by-category?categoryUid=${category}&max_price=${max_price}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const maxLength = 50;
    const truncateTitle = (title, maxLength) => {
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    };

    const [quickViewProduct, setQuickViewProduct] = useState({})
    const [quickViewClicked, setQuickView] = useState(false);
    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        console.log("quick view for budget: ", item)
        setQuickViewProduct(item)

    }
    const handleQuickViewClose = () => {setQuickView(false)}

    const handleProductClick = (item) => {
        console.log("items on budget comp: ", item)
        navigate(`/product/${item.slug}`, { state: item })
    };



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;




    return (
        <>

            <div className="cover_photo">
                <img src="https://fm.skyhub.pk/uploads/media/Pages/home/slider/1731385502484_209_Main-Desktop-Banner-2-2048x545.webp" alt="Furniture Cover" />
            </div>
            <div className="furniture_at_every_budget">


                <h3 className="category-heading">Furniture At Every Budget</h3>

                <div className="product-grid">
                    {data && data.products.map((item, index) => (
                        <ProductCard
                            key={index}
                            slug={item.slug}
                            singleProductData={item}
                            maxWidthAccordingToComp="100%"
                            tagIcon={item.productTag ? item.productTag : heart}
                            tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                            mainImage={`${item.image.image_url}`}
                            productCardContainerClass="product-card"
                            ProductSku={item.sku}
                            tags={item.tags}
                            ProductTitle={truncateTitle(item.name, maxLength)}
                            stars={[
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                            ]}
                            reviewCount={item.reviewCount}
                            lowPriceAddvertisement={item.lowPriceAddvertisement}
                            priceTag={item.regular_price}
                            sale_price={item.sale_price}
                            financingAdd={item.financingAdd}
                            learnMore={item.learnMore}
                            mainIndex={index}
                            deliveryTime={item.deliveryTime}
                            stock={item.manage_stock}
                            attributes={item.attributes}
                            handleCardClick={() => handleProductClick(item)}
                            handleQuickView={() => handleQuickViewOpen(item)}
                        />
                    ))}
                </div>
                <div className={`quick-view-section ${quickViewClicked ? 'show-quick-view-section' : ''}`}>
                    <button className={`quick-view-close`} onClick={handleQuickViewClose}>
                        {/* <img src={closeBtn} alt='close' /> */}
                        <IoMdClose size={25} />
                    </button>
                    <div className={`quickview-containt ${quickViewClicked ? 'show-quick-view-containt' : ''}`}>
                        <QuickView 
                            setQuickViewProduct={quickViewProduct}
                            quickViewClose={handleQuickViewClose}
                            stars={[
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                            ]}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}