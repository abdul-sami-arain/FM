import React, { useEffect, useState } from 'react'
import './ShippingForm.css';
import SummaryInputFields from '../InputField/SummaryInputFields';
import { useOrder } from '../../../../context/orderContext/orderContext';
import { useMyOrders } from '../../../../context/orderContext/ordersContext';

const ShippingForm = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => { setIsChecked(!isChecked) }

    const {orderPayload, handleNestedValueChange, loading, handleValueChange, handleTabOpen} = useMyOrders();

    if(loading){
        return <div>Loading....</div>
    }

    return (
        <>
            <form className='shipping-detail-form'>
                <div className='first-name-last-name'>
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.billing?.first_name || ''}
                        label={'First Name'}
                        fieldRequired={true}
                        placeholder={'First Name'}
                        name={'first_name'}
                        onChange={handleNestedValueChange   }
                    />
                    <SummaryInputFields
                        type={'text'}
                        name={'last_name'}
                        value={orderPayload.last_name}
                        label={'Last Name'}
                        fieldRequired={true}
                        placeholder={'Last Name'}
                        onChange={handleNestedValueChange
                        }
                    />
                </div>
                <div className='email-container'>
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.email}
                        label={'Email'}
                        fieldRequired={true}
                        placeholder={'Email'}
                        name={'email'}
                        onChange={handleNestedValueChange
                        }
                    />
                </div>
                <div className='country-region'>
                    <p>Country/ Region</p>
                    <h3>United States (USA)</h3>
                </div>
                <div className='shipping-address'>
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.address_1}
                        label={'Street Address'}
                        fieldRequired={true}
                        placeholder={'House number & Street number'}
                        name={'address_1'}
                        onChange={handleNestedValueChange
                        }
                    />
                    <SummaryInputFields
                        type={'text'}
                        placeholder={'Apartment, suite, unit etc'} />
                </div>
                <div className='city-state-zip'>
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.postal_code}
                        label={'Zip Code'}
                        fieldRequired={true}
                        name={'postal_code'}
                        onChange={handleNestedValueChange
                        }
                    />
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.city}
                        label={'Town/City'}
                        name={'city'}
                        onChange={handleNestedValueChange}
                    />
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.state}
                        label={'State'}
                        fieldRequired={true}
                        placeholder={'Pennsylvanian'}
                        name={'state'}
                        onChange={handleNestedValueChange
                        }
                    />
                </div>
                <div>
                    <SummaryInputFields
                        type={'text'}
                        value={orderPayload.phone}
                        label={'Phone'}
                        fieldRequired={true}
                        placeholder={'Phone'}
                        name={'phone'}
                        onChange={handleNestedValueChange
                        }
                    />
                </div>
                <div className='different-billing-option'>
                    <div className='different-billing-checkox'>
                        <input type='checkbox' id='defferent-billing' onClick={handleCheckboxClick} />
                        <label for='defferent-billing'>Want to use defferent billing address</label>
                    </div>
                    <div className={`defferent-billing-option-true ${isChecked ? 'show-defferent-billing-option' : ''}`}>
                        <div className='first-name-last-name'>
                            <SummaryInputFields type={'text'} label={'First Name'} fieldRequired={true} placeholder={'First Name'} />
                            <SummaryInputFields type={'text'} label={'Last Name'} fieldRequired={true} placeholder={'Last Name'} />
                        </div>
                        <div className='country-region'>
                            <p>Country/ Region</p>
                            <h3>United States (USA)</h3>
                        </div>
                        <div className='shipping-address'>
                            <SummaryInputFields type={'text'} label={'Street Address'} fieldRequired={true} placeholder={'House number & Street number'} />
                            <SummaryInputFields type={'text'} placeholder={'Apartment, suite, unit etc'} />
                        </div>
                        <div className='city-state-zip'>
                            <SummaryInputFields type={'text'} label={'Zip Code'} fieldRequired={true} />
                            <SummaryInputFields type={'text'} label={'Town/City'} />
                            <SummaryInputFields type={'text'} label={'State'} fieldRequired={true} placeholder={'Pennsylvanian'} />
                        </div>
                    </div>
                </div>
                <div className='order-note'>
                    <SummaryInputFields type={'text'} label={'Order Notes (Optional)'} placeholder={'Notes about your order, e.g Special  delivery notes'} />
                </div>
                <button type='button' onClick={()=> handleTabOpen('payment-method')} className='desktop-billing-details-send-button'>
                    Continue to Payment
                </button>
            </form>
            <form className='mobile-view-shipping-details-form'>
                <div className='mobile-view-personal-details'>
                    <SummaryInputFields type={'text'} label={'First Name'} fieldRequired={true} placeholder={'First Name'} required={true} />
                    <SummaryInputFields type={'text'} label={'Last Name'} fieldRequired={true} placeholder={'Last Name'} required={true} />
                    <SummaryInputFields type={'text'} label={'Phone'} fieldRequired={true} placeholder={'Phone'} required={true} />
                    <SummaryInputFields type={'text'} label={'Email'} fieldRequired={true} placeholder={'Email'} required={true} />
                </div>
                <div className='mobile-delivery-details'>
                    <h3>Delivery Options</h3>
                    <SummaryInputFields type={'text'} label={'Address'} fieldRequired={true} placeholder={'Address'} required={true} />
                    <SummaryInputFields type={'text'} label={'Apt, Suite (Optional)'} fieldRequired={false} placeholder={'Apt, Suite'} required={true} />
                    <SummaryInputFields type={'text'} label={'Phone'} fieldRequired={true} placeholder={'Phone'} required={true} />
                    <SummaryInputFields type={'text'} label={'Email'} fieldRequired={true} placeholder={'Email'} required={true} />
                    <SummaryInputFields type={'text'} label={'City'} fieldRequired={true} placeholder={'City'} required={true} />
                    <div className='mobile-view-city-and-zip'>
                        <SummaryInputFields type={'text'} label={'Zip Code'} fieldRequired={true} placeholder={'Zip Code'} required={true} />
                        <SummaryInputFields type={'text'} label={'State'} placeholder={'State'} required={true} />
                    </div>
                </div>
                <div className='mobile-delivery-options-sections'>
                    <h3>Delivery Options:</h3>
                    <div className='mobile-delivery-option-details'>
                        <input type='radio' />
                        <div className='mobile-delivery-option-single-detail'>
                            <h3>White Glove : $199</h3>
                            <p>
                                Full delivery service to the room of your choice,
                                unpacking, assambling & trash removal.
                            </p>
                        </div>
                    </div>
                    <div className='mobile-delivery-option-details'>
                        <input type='radio' />
                        <div className='mobile-delivery-option-single-detail'>
                            <h3>Thrushhold: $149</h3>
                            <p>
                                Deliver inside the front door of your home. You do  the
                                unpacking & assambling.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mobile-pay-btn-section'>
                    <button onClick={()=>{}}>
                        Continue to Payment
                    </button>
                </div>
            </form>
        </>
    )
}

export default ShippingForm
