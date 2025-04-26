export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

export const initialState = {
  cart: [],
  user: null,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
};

export default AppReducer;
