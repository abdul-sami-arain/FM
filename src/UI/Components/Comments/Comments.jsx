import React from 'react'
import './Comments.css';
import { Link } from 'react-router-dom';
import productOne from '../../../Assets/images/product-one.png'
import productTwo from '../../../Assets/images/product-two.png'
import productThree from '../../../Assets/images/product-three.png'
import filledStar from '../../../Assets/icons/large-star-blue.png';
import thumbUp from '../../../Assets/icons/Thumbs up.png'

const Comments = () => {
    const commentedProduct = [
        {
            name: 'Pamela', state: 'Duxbury, Ma', verify: 'Verified Buyer', productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ]
        }
    ]

    const desktopCommentFormate = [
        {
            name: 'Pamela', 
            state: 'Duxbury, Ma', 
            verify: 'Verified Buyer',
            productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ],
            icon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ],
            date: '07/15/2024',
            comment: `This furniture has barely made it into a third season. Despite covering it during 
                    the winter, it has completely fallen apart. The plastic is breaking, and the cushions 
                    are misshapen and moldy. I would not recommend this. It was not cheap, but in the long run, 
                    I should have spent more and gotten something that was going to last a lot longer.`,
            showLess: 'Show Less',
        },
        {
            name: 'Pamela', 
            state: 'Duxbury, Ma', 
            verify: 'Verified Buyer',
            productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ],
            icon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ],
            date: '07/15/2024',
            comment: `This furniture has barely made it into a third season. Despite covering it during 
                    the winter, it has completely fallen apart. The plastic is breaking, and the cushions 
                    are misshapen and moldy. I would not recommend this. It was not cheap, but in the long run, 
                    I should have spent more and gotten something that was going to last a lot longer.`,
            showLess: 'Show Less',
        },
        {
            name: 'Pamela', 
            state: 'Duxbury, Ma', 
            verify: 'Verified Buyer',
            productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ],
            icon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ],
            date: '07/15/2024',
            comment: `This furniture has barely made it into a third season. Despite covering it during 
                    the winter, it has completely fallen apart. The plastic is breaking, and the cushions 
                    are misshapen and moldy. I would not recommend this. It was not cheap, but in the long run, 
                    I should have spent more and gotten something that was going to last a lot longer.`,
            showLess: 'Show Less',
        }
    ]

    const commentData = [
        {
            icon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ], date: '07/15/2024',
            comment: `This furniture has barely made it into a third season. Despite covering it during the winter, it has completely fallen apart. 
        The plastic is breaking, and the cushions are misshapen and moldy. I would not recommend this. It was not cheap, but in the long run, 
        I should have spent more and gotten something that was going to last a lot longer.`, showLess: 'Show Less'
        },
    ]
    const mobileCommentData = [
        {
            name: 'Pamela', date: '23/10/2024', state: 'Duxbury, MA', verified: 'Verified',
            starIcon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ],
            comment: `
                This furniture has barely made it into a third season. 
                Despite covering it during the winter, it has completely fallen apart....`, 
            productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ]
        },
        {
            name: 'Pamela', date: '23/10/2024', state: 'Duxbury, MA', verified: 'Verified',
            starIcon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ],
            comment: `
                This furniture has barely made it into a third season. 
                Despite covering it during the winter, it has completely fallen apart....
        `, productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ]
        },
        {
            name: 'Pamela', date: '23/10/2024', state: 'Duxbury, MA', verified: 'Verified',
            starIcon: [
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
                { star: filledStar },
            ],
            comment: `
                This furniture has barely made it into a third season. 
                Despite covering it during the winter, it has completely fallen apart....
        `, productImgs: [
                { img: productOne },
                { img: productTwo },
                { img: productThree },
            ]
        }
    ]

    return (
        <div className='comments-container'>
            {commentedProduct.map((item, index) => {
                return <div className='user-details'>
                    <div className='user-name-and-detail'>
                        <h3>{item.name}</h3>
                        <p>{item.state}</p>
                        <p>{item.verify}</p>
                    </div>
                    <div className='cemmented-product-images'>
                        {item.productImgs.map((item, index) => {
                            return <img key={index} src={item.img} alt='img' />
                        })}
                    </div>
                </div>
            })}
            {commentData.map((item, index) => {
                return <div key={index} className='comment-section'>
                    <div className='stars-and-date'>
                        <div className='comment-stars'>
                            {item.icon.map((star, index) => {
                                return <img src={star.star} alt='star' />
                            })}
                        </div>
                        <p>{item.date}</p>
                    </div>
                    <div className='comment-and-see-more'>
                        <p>{item.comment}</p>
                        <Link>{item.showLess}</Link>
                    </div>
                </div>
            })}
            <div className='feedback'>
                <button>
                    <img src={thumbUp} alt='thhumb' />
                    Helpful  0
                </button>
            </div>
            <div className='mobile-comments'>
                {mobileCommentData.map((item, index) => (
                    <div key={index} className='mobile-single-comment'>
                        <div className='mobile-comment-name-and-date'>
                            <h3>{item.name}</h3>
                            <p>{item.date}</p>
                        </div>
                        <h3 className='mobile-comment-state'>{item.state}</h3>
                        <div className='mobile-comment-status-and-rating'>
                            <p>{item.verified}</p>
                            <span>
                                {item.starIcon.map((item, ind) => (
                                    <img key={ind} src={item.star} alt='star' />
                                ))}
                            </span>
                        </div>
                        <p className='mobile-comment'>{item.comment}</p>
                        <button className='mobile-comment-show-more-btn'>show more</button>
                        <div className='mobile-comment-images-and-feedback'>
                            <div className='mobile-single-comment-images'>
                                {item.productImgs.map((item, index) => (
                                    <img src={item.img} alt='product-image' />
                                ))}
                            </div>
                            <button className='mobile-comment-feedback'>
                                <img src={thumbUp} alt='thhumb' />
                                <p>Helpful  0</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments
