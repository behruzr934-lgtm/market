import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], //basket ichidagi mahsulotlar
  totalQuantity: 0, //jami nechta product 
  totalPrice: 0, //jami summa
}

const basketSlice = createSlice({
  name: "basket", 
  initialState: {
    items: [],
  },

  reducers: {
    
    addToBasket: (state, action) => {
      state.items.push(action.payload);
    },

    removeFromBasket: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

   
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
