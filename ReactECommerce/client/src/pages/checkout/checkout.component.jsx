import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CustomButton from "../../components/custom-button/custom-button.component";
import { useHistory } from 'react-router-dom';


const CheckoutPage = () => {

    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const history = useHistory();

    return (
        <>
            <div className='checkout-page'>
                <div className='checkout-header'>
                    <div className='header-block'>
                        <span>Produits</span>
                    </div>
                    <div className='header-block'>
                        <span>Description</span>
                    </div>
                    <div className='header-block'>
                        <span>Quantité</span>
                    </div>
                    <div className='header-block'>
                        <span>Prix</span>
                    </div>
                    <div className='header-block'>
                        <span>Supprimer</span>
                    </div>
                </div>
                {
                    cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
                }
                {/*            <div className='test-warning'>
                    *Utiliser cette carte de crédit de test pour payer*
                    <br/>
                    4242 4242 4242 4242 6 Exp: 01/20 - CVV: 123
                </div>*/}
            </div>
            {/*<StripeButton price={total} />*/}
            <section className='checkout-footer'>
                <CustomButton inverted onClick={history.goBack}>
                    Retour
                </CustomButton>
                <div className='checkout-footer__total'>TOTAL {total} EUR</div>
                <CustomButton onClick={() => history.push('/shipping')}>
                    Valider mon panier
                </CustomButton>
            </section>
        </>
    );
}



export default CheckoutPage;