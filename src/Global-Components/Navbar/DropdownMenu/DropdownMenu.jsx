import React, { useState } from 'react'
import './DropdownMenu.css';
import { Link } from 'react-router-dom';


const DropdownMenu = ({navHeading, dropDownNavData}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [outerIndex, setOuterIndex] = useState(null)
    const [innerIndex, setInnerIndex] = useState(null)
    const handleActiveIndex = (index) => {
        setActiveIndex(index);
    }

    const handleAccentActiveItems = (i, index) => {
        setOuterIndex(i)
        setInnerIndex(index);
    }
    
  return (
    <div className='mattresses-main-div'>
                {dropDownNavData[0].heading === 'Accent Furniture' ? (dropDownNavData[0].links.map((item, i) => {
                    return <div className='menu-links'>
                        <h3 className='living-room-heading'>{item.headingOne}</h3>
                        <div className='mattresses-links-div'>
                            <p>
                                {item.innerLinks.map((it, index) => {
                                    return <p className={`mattres-links ${outerIndex === i && innerIndex === index ? 'active' : ''}`} onClick={() => handleAccentActiveItems(i, index)}>
                                        <Link to={it.link}>{it.name}</Link>
                                    </p>
                                })}
                            </p>
                        </div>
                    </div>
                    
                    }))  
                    : <div style={{display: 'flex', width: '25%'}}>
                        <div className='menu-links'>
                        <h3 className='living-room-heading'>{navHeading}</h3>
                        <div className='mattresses-links-div'>
                            {dropDownNavData[0].links.map((item, index) => {
                                return <p className={`mattres-links ${activeIndex === index ? 'active' : ''}`} key={index} onClick={() => handleActiveIndex(index)}>
                                    <Link to={item.link}>{item.name}</Link>
                                </p>
                            })}
                        </div>
                        </div> 
                    </div>
                }
        <div className='mattresses-images-div'>
            {dropDownNavData[0].Images.map((item, index) => {
                return <div key={index} className='mattress-image'>
                    <img src={item.img} alt={item.title} />
                    <p className='image-title'><Link to={item.link}>{item.title}</Link> </p>
                    <p className='price'>{item.price}</p>
                </div>
            })}
        </div>
        
    </div>
  )
}

export default DropdownMenu
