import React, {useState} from 'react'
import './QuickViewVariations.css';
import { url } from '../../../utils/api';

const QuickViewVariations = ({attributes}) => {
    console.log("variations on quick view", attributes)
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    // const [variantName, setVariationName] = useState(sizeNamesObj[0])
    // const handleSizeSelect = (index) => {
    //     setSelectedVariantIndex(index);
    // }

    const [colorVariation, setColorVariation] = useState(0);
    const [imageVariation, setImageVariaton] = useState(0);
    const [selectVariation, setSelectVariation] = useState(0);

    const handleColorVariation = (index) => {
        setColorVariation(index);
    }
    const handleImageVariation = (index) => {
        setImageVariaton(index)
    }
    const handleSelectVariation = (index) => {
        setSelectVariation(index);
    }

  return (
    <div className='quick-view-attributes-main'>
        {attributes && attributes.map((attribute) => (
                <div className='attributes-types'>
                    {attribute.type === 'color' ?
                        <div className='attribute-type'>
                            <h3 className='quick-view-attribute-heading'>{attribute.name}</h3>
                            <div className='attribute-variations'>
                                {attribute.options.map((option, index) => (
                                    <div className='attribute-single-color' onClick={() => handleColorVariation(index)}>
                                        <div className='attribute-color-variation-box' style={{ backgroundColor: option.value }}></div>
                                        <p className='quick-view-atribute-option-name'>{option.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div> :
                    attribute.type === 'image' ?
                        <div className='attribute-type'>
                            <h3 className='quick-view-attribute-heading'>{attribute.name}</h3>
                            <div className='attribute-variations'>
                                {attribute.options.map((option, index) => (
                                    <div className={`attribute-image-type `} onClick={() => handleImageVariation(index)}>
                                        <div className={`variation-image-div ${imageVariation === index ? 'active-selected-image-variation' : ''}`}>
                                            <img src={`${url}${option.value}`} alt={option.name} />
                                        </div>
                                        <p className='quick-view-atribute-option-name'>{option.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div> :
                    attribute.type === 'select' ?
                        <div className='attribute-type'>
                            <h3 className='quick-view-attribute-heading'>{attribute.name}</h3>
                            <div className='attribute-variations' >
                                {attribute.options.map((option, index) => (
                                    <div className={`select-type-attribute ${selectVariation === index ? 'select-select-variation' : ''}`} onClick={() => handleSelectVariation(index)}>
                                        <p className='quick-view-atribute-option-name'>{option.name}</p>
                                    </div>    
                                ))}
                            </div>
                        </div> :
                    <></>
                    }
                </div>
            ))}
    </div>
  )
}

export default QuickViewVariations
