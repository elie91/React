import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({price}) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_zEowx1xwWAAVt6RuWiDZVxXA00qabY037g';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
            .then(response => {
                alert('Paiement effectué')
            })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                alert(
                    'Erreur lors du paiement. Vérifiez bien que vous avez utilisé la carte de crédit affiché '
                )
            })
    };

    return (
        <StripeCheckout
            label='Payer'
            name='CROWN Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeButton;