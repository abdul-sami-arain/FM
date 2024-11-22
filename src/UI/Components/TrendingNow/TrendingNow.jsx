import React, { useEffect, useState } from 'react'
import './TrendingNow.css'
import CustomSlider from '../CostumSlider/CostumSlider'
import trandinImage from '../../../Assets/Furniture Mecca/Landing Page/trending-now/tranding-slider-main-image.png'
import sofaChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/sofa.png'
import swivalChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/swival-chair.png'
import slideChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/slide-chair.png'
import cornerChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/corner.png'
import chaisChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/chaise.png'
import armlessChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/armless-chair.png'
import axios from 'axios'

const TrendingNow = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const url = 'https://fm.skyhub.pk';
    // const sliderImages = [trandinImage, trandinImage, trandinImage];
    const sliderItems = [armlessChair, cornerChair, swivalChair, slideChair, chaisChair, sofaChair]
    const [data, setData] = useState([]);
    const getTrandingProductsData = async () => {
        try {
            const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/trending-now/get');
            // console.log('tranding data', response.data.data.sliders)
            setData(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getTrandingProductsData()
    }, [])
    // console.log("tranding now data", data)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.sliders && data.sliders.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [data.sliders]);
    // Extract only the product objects
    const productArray = Object.keys(data)
    .filter(key => key.startsWith('product_'))
    .map(key => data[key]);
    
  return (
    <div className='trending-now-main-container'>
        <h3>Trending Now</h3>
        <div className='tranding-slider-and-categories'>
            <div className="tranding-slider">
                <div className="tranding-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {data.sliders && data.sliders.map((image, index) => (
                        <div className="tranding-slide" key={index}>
                            <img src={`${url}${image.image_url}`} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='trending-items-cards'>
                {productArray.map((item, index) => (
                    <div key={item.uid} className='trending-item-category'>
                        <img src={`${url}${item.image_url}`} alt={item.alt_text} />
                    </div>
                ))} 
            </div>
        </div>
    </div>
  )
}

export default TrendingNow
