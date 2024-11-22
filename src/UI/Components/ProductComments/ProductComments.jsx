import React from 'react'
import './ProductComments.css';
import SearchReviews from '../SearchReviews/SearchReviews';
import ProductCommentsSection from '../ProductCommentsSection/ProductCommentsSection';

const ProductComments = () => {
  return (
    <div className='customer-comments-main-container'>
        {/* <SearchReviews /> */}
        <ProductCommentsSection />
    </div>
  )
}

export default ProductComments
