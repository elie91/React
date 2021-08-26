import { createSelector } from 'reselect';

//Function that take the store
//We want to return a slice of the state
const selectCart = state => state.cart;


//Take a selector, and his output(his slice of state)
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity, 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
);