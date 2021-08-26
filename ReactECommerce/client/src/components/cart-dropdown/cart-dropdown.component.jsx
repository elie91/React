import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();


    return (
        <div className='cart'>
            <div className='cart__items'>
                {
                    cartItems.length
                        ?
                        (cartItems.map(item => <CartItem key={item.id} item={item} />))
                        :
                        (<span className='cart__message'>Votre panier est vide</span>)
                }
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>
                Page de paiement
            </CustomButton>
        </div>
    );
}


export default CartDropdown;