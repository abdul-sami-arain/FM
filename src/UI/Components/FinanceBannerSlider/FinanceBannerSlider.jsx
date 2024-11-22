import React, { useEffect, useState } from "react";
import './FinanceBannerSlider.css';
import paypalBanner from '../../../Assets/Furniture Mecca/Landing Page/sale banner/New-Financing-WF-1.jpg';
import moveForword from '../../../Assets/Furniture Mecca/Landing Page/sale banner/New-Financing-AAF-1.jpg';
import axios from "axios";


function FinanceBannerSlider() {
    const [images, setIMages] = useState([])
    const url = 'https://fm.skyhub.pk';
    const getFinanceBannerImagesFRomApi = async () => {
        try {
            const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/finance-slider/get');
            // console.log("finance images", response.data.homeSliders)
            setIMages(response.data.homeSliders)
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        getFinanceBannerImagesFRomApi()
    }, [])
    // const images = [
    //     paypalBanner,
    //     moveForword,
    //   ];


    const [currentIndex, setCurrentIndex] = useState(0);
    
    
    useEffect(() => {
        const intervel = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(intervel)
    }, [images.length]);
    // console.log("current index finance", currentIndex)

    
  return (
    <div className="carousel-container">
        <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => {
                return <div className="carousel-slide" key={index}>
                    <img src={`${url}${image.image_url}`} alt={`slide ${index + 1}`} />
                </div>
            })}
        </div>
    </div>
  );
}

export default FinanceBannerSlider;
