import React from 'react';

const CartItem = ({item}) => (
    <div className='cart-item'>
        <img src={item.imageUrl} alt='item' className='cart-item__image'/>
        <div className='cart-item__details'>
            <span className='cart-item__name'>{item.name}</span>
            <span className='cart-item__price'>{item.quantity} x ${item.price}</span>
        </div>
    </div>
);

export default CartItem;