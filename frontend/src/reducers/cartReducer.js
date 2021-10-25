import * as CC from "../constants/cartConstants";

const initialState = { cartItems: [] };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CC.ADD_TO_CART:
      const isItemExist = state.cartItems.find((i) => i.product === action.payload.product);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? action.payload : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case CC.REMOVE_ITEM_FROM_CART:
      console.log(action);
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
