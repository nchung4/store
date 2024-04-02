import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductDetailType } from "../../types";

type CartState = { qty: number; product: ProductDetailType };

const initialState: CartState[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartState>) =>
      state.some((item) => item.product.id === action.payload.product.id)
        ? [...state].map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          )
        : [...state, action.payload],
    removeCart: (state, action: PayloadAction<number>) =>
      [...state].filter((item) => item.product.id !== action.payload),
    changeQtyCart: (
      state,
      action: PayloadAction<{ qty: number; productId: number }>
    ) =>
      action.payload.qty === 0
        ? [...state].filter(
            (item) => item.product.id !== action.payload.productId
          )
        : [...state].map((item) =>
            item.product.id === action.payload.productId
              ? { ...item, qty: action.payload.qty }
              : item
          ),
    resetCart: () => [],
  },
});

export const { addCart, removeCart, changeQtyCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
