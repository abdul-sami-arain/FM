import React from 'react'
import './Comparision.css'
import ComparisionImage from '../../../Assets/Furniture Mecca/Comparision/comparision-img.jpg';
import mobCompair from '../../../Assets/Furniture Mecca/Comparision/download 120.png';
import compatetantImage from '../../../Assets/Furniture Mecca/Comparision/compatetant.png';

const Comparision = () => {
  return (
    <div className='comparision-main-div'>
        <h3>Dare to Compare: FM's vs Leading National Brand</h3>
        <div className='comparision-img-div'>
            <img src={ComparisionImage} alt='img' />
        </div>
        <div className='mobile-view-comparission'>
          <img src={mobCompair} alt='img' />
        </div>
    </div>
  )
}

export default Comparision
