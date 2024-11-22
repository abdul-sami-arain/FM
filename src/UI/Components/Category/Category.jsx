import React from 'react';
import './Category.css';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';
import CategoryShimmer from '../Loaders/Category/categoryShimmer';
import { url } from '../../../utils/api';

const Category = ({ title, categoryData, handleNavigate }) => {
  return (
    <div className='category-main-container'>
      <div className="category-bread-crumb-and-title">
        <Breadcrumb />
        <h3 className='category-heading'>{title}</h3>
      </div>
      <div className='category-cards-container'>
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((item, index) => (
            <img
              key={index}
              onClick={() => handleNavigate(item.slug, item)}
              src={"https://fm.skyhub.pk" + item.image}
              alt='img'
            />
          ))
        ) : (
          Array.from({ length: 12 }).map((_, index) => (
            <CategoryShimmer/>
          ))
        )}
      </div>

      <div className='mobile-category-cards-container'>
        {categoryData && categoryData.map((item, index) => (
          <img
            key={index}
            onClick={() => handleNavigate(item.slug, item)}
            src={"https://fm.skyhub.pk" + item.image2}
            alt='img'
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
