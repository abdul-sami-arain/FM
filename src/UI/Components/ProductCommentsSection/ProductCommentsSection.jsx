import React, { useState } from 'react'
import './ProductCommentsSection.css';
import arrowDown from '../../../Assets/icons/arrow-down.png';
import Comments from '../Comments/Comments';

const ProductCommentsSection = () => {
    const [isClicked, setIsClicked] = useState(0);
    const handleClicked = () => {
        setIsClicked(!isClicked)
    }
    
  return (
    <div className='product-comment-section-main-container'>
        <div className='sort-by-related'>
            <p>Showing 1-3 of 170 reviews</p>
            <div className='input-select-container'>
                <fieldset className="select-container">
                    <legend htmlFor="sort-by" className="select-label">Sort by</legend>
                    <span onClick={handleClicked}>
                        <p>Most Relevant</p>
                        <img src={arrowDown} alt='arrow down' className={`${isClicked ? 'rotate-input-arrow-down' : 'not-rotated'}`} />
                    </span>
                </fieldset>
                <div className={`related-dropdown ${isClicked ? 'show-related-dropdown' : ''}`}>
                    <p>Item One</p>
                    <p>Item Two</p>
                    <p>Item Three</p>
                </div>
            </div>
        </div>
        <div className='comments-main-container'>
            <Comments />
            {/* <Comments />
            <Comments /> */}
        </div>
    </div>
  )
}

export default ProductCommentsSection
