import React, { useEffect, useState } from 'react'
import './Categories.css';
import Shopvia from '../../Components/ShopViaBanner/Shopvia';
import Category from '../../Components/Category/Category';
import CustomerServicePanel from '../../Components/CustomerServicePanel/CustomerServicePanel';
import LatestModulerBanner from '../../Components/LatestModuler/LatestModulerBanner';
import NewArrival from '../../Components/NewArrivals/NewArrival';
// import MultiProductSlider from '../../Components/MultiProductSLider/MultiProductSlider';
import CategoriesGetScop from '../../Components/CategoriesGetScop/CategoriesGetScop';
import BestSeller from '../../Components/BestSeller/BestSeller';
import DealOfDay from '../../Components/DealOfDay/DealOfDay';
import FinanceBannerSlider from '../../Components/FinanceBannerSlider/FinanceBannerSlider';
import BestSellerSlider from '../../Components/BestSellerSlider/BestSellerSlider';
import ShipBanner from '../../Components/ShipBanner/ShipBanner';
import shipBanner from '../../../Assets/Furniture Mecca/Landing Page/sale banner/AT FM.jpg'
import ScreenSizer from '../../../utils/ScreenResizer/ScreenResizer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { url } from '../../../utils/api';
import CategoryShimmer from '../../Components/Loaders/Category/categoryShimmer';

const Categories = ({categoriesMainImage, mobileViewMainImage, categoryCartTitle, categoryCardData, newArrival , showPromotionsBaneers}) => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { width } = ScreenSizer();
  const isMobile = width < 481; 
  const [loading, setLoading] = useState(false);
  const [categoryPageData,setCategoryPageData] = useState();
  const [error, setError] = useState(null); 

  const getPageData = async () => {
    try {
      const response = await fetch(`${url}/api/v1/sub-category/get/${location.state?.slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }// Data to send
      });
      const result = await response.json();
      setCategoryPageData(result.sub_categories);
      console.log(result)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getPageData();
  },[])

  const handleNavigate = (slug, item) => {
    navigate(`/${categorySlug}/${item.slug}`, { state: item });
  };


  return (
    <div>
      {/* <Shopvia /> */}
      <LatestModulerBanner customWidth={false} showBanners={true} mainImgShow={true} mobileMainImage={"https://fm.skyhub.pk"+location.state?.bannerImage2} mainImage={"https://fm.skyhub.pk"+location.state?.bannerImage} />
      <Category title={location.state?.name} categoryData={categoryPageData} handleNavigate={handleNavigate} />
      {/* <CategoryShimmer/> */}
      {/* {isMobile ? <BestSellerSlider /> : <BestSeller />} */}
      <BestSeller />
      {/* <DealOfDay /> */}
      <NewArrival /> 
      <ShipBanner bannerImg={shipBanner} showBanner={false} paddindTrue={false} />
      <CategoriesGetScop isTrue={true} />
      {/* <LatestModulerBanner customWidth={false} showBanners={true} paddingTop={true} mainImgShow={false} /> */}
      <FinanceBannerSlider />
      {/* <CustomerServicePanel /> */}
    </div>
  )
}

export default Categories
