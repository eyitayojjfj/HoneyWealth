// cartUtils.js
export const getCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length;
  };
  