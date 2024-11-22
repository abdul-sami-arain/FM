import React from 'react'
import './RatingAndReview.css';
import { Link } from 'react-router-dom';
import starIcon from '../../../Assets/icons/large-star-blue.png';
import CustomerPhotos from '../CustomerPhotos/CustomerPhotos';

const RatingAndReview = () => {
    const stars = [
        {icon: starIcon, count: 5, rev: 928},
        {icon: starIcon , count: 4, rev: 392},
        {icon: starIcon , count: 3, rev: 170},
        {icon: starIcon , count: 2, rev: 98},
        {icon: starIcon , count: 1, rev: 117}
    ]

    const maxValue = 1000;
    // console.log(maxValue)
  return (
    <div className='rating-and-customers-photos'>
        <div className='rating-and-review-main-container'>
            <h3>Rating & Reviews</h3>
            <p>Our <Link>Community Guidelines </Link> help customers write honest reviews.</p>
            <div className='rating-and-review-div'>
                <div className='rating-div'>
                    <h3>4.1</h3>
                    <span>
                        {stars.map((item, index) => {
                            return <img key={index} src={item.icon} alt='icon' />
                        })}
                    </span>
                    <p>1707 Reviews</p>
                </div>
                <div className='rating-progress-bar-div'>
                    {stars.map((item, index) => {
                        const progress = (item.rev / maxValue) * 100;
                        return <div key={index} className='progress-bar-div'>
                            <div className='rating-count-div'>
                                <p>{item.count}</p> 
                            </div>
                            <img src={item.icon} alt='icon' />
                            <div className='progress-bar-container'>
                                <div className='progress-bar' style={{width: `${progress}%`}}></div>
                            </div>
                            <p>{item.rev}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div className='customer-images-section'>
            <CustomerPhotos />
        </div>
    </div>
    
  )
}
export default RatingAndReview
