export const loadCartFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('cart');
      if (serializedState === null) return [];
      return JSON.parse(serializedState);
    } catch (err) {
      return [];
    }
  };
  
  export const saveCartToLocalStorage = (cart) => {
    try {
      const serializedState = JSON.stringify(cart);
      localStorage.setItem('cart', serializedState);
    } catch (err) {
      // Handle write errors
      console.error("Could not save cart to local storage", err);
    }
  };
  