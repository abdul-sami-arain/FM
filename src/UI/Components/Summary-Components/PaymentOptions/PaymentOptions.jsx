import React, {useState} from 'react'
import './PaymentOptions.css'
import acimoLogo from '../../../../Assets/Logo/acimo-logo.png'
import masterCard from '../../../../Assets/icons/master.png';
import visaCard from '../../../../Assets/icons/visa.png';
import discoverCard from '../../../../Assets/icons/discover.png';
import americanExpress from '../../../../Assets/icons/american-express.png';

const PaymentOptions = ({onSelectedLabel}) => {
    const creditCards = [masterCard, visaCard, discoverCard, americanExpress]
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
    const [selectedLabelValue, setSelectedLabelValue] = useState('')
    const handlePaymentToggle = (paymentMethod, label) => {
        setSelectPaymentMethod(paymentMethod);
        setSelectedLabelValue(label)
        onSelectedLabel(label)
    }

    return (
        <div className='payment-types-inner-container'>
            <div className='select-payment-method' onClick={() => handlePaymentToggle('acima', 'Acima Leasing')}>
                <input type="radio" id='acima' name="payment" value="acima" checked={selectPaymentMethod === 'acima'} readOnly />
                <label for='acima' class="radio-label">Acima Leasing</label>
                <p>The no credit option</p>
                <p>Learn more</p>
            </div>
            <div className={`acima-payment-method acima ${selectPaymentMethod === 'acima' ? 'acima-payment-toggle' : ''}`}>
                <img src={acimoLogo} alt='logo' />
                <p>Pay via acima</p>
            </div>
            <div className='select-payment-method credit-card' onClick={() => handlePaymentToggle('credit-card', 'Credit Card')}>
                <input type="radio" id='credit-card' name="payment" value="credit-card" checked={selectPaymentMethod === 'credit-card'} readOnly />
                <label for='credit-card' class="radio-label">Credit Card</label>
            </div>
            <div className={`credit-card-data ${selectPaymentMethod === 'credit-card' ? 'show-credit-card' : ''}`}>
                <div className='credit-card-cards'>
                    {creditCards.map((items, index) => (
                        <img src={items} alt='card' />
                    ))}
                </div>
                <div className='pay-secure-option'>
                    <p>Pay securely using your credit card</p>
                </div>
            </div>
            <div className='select-payment-method paypal' onClick={() => handlePaymentToggle('paypal', 'Paypal')}>
                <input type="radio" id='paypal' name="payment" value="paypal" checked={selectPaymentMethod === 'paypal'} readOnly />
                <label for='paypal' class="radio-label">Paypal</label>
            </div>
            <div className={`paypal-data ${selectPaymentMethod === 'paypal' ? 'show-paypal' : ''}`}>
                <p>Pay via Paypal</p>
            </div>
            <div className='select-payment-method checkout' onClick={() => handlePaymentToggle('checkout', 'Checkout Financing')}>
                <input type="radio" id='checkout' name="payment" value="checkout" checked={selectPaymentMethod === 'checkout'} readOnly />
                <label for='checkout' class="radio-label">Checkout Financng</label>
            </div>
        </div>
    )
}

export default PaymentOptions
