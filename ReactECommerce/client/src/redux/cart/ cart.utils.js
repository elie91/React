export const addItemToCart = (cartItems, cartItemsToAdd) => {
    const existing = cartItems.find(
        cartItem => cartItem.id === cartItemsToAdd.id
    );

    if (existing) {
        return cartItems.map(item => {
            if (item.id === cartItemsToAdd.id) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        })
    }

    return [...cartItems, { ...cartItemsToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existing = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existing.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existing.id)
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}