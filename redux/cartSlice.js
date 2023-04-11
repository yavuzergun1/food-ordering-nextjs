import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      console.log(state.products);
      console.log("product", product);
      const existingProductIndex = state.products.findIndex(
        (item) => item._id === product._id
      );
       const existingProduct = state.products.find(
         (item) => item._id === product._id
         );
         console.log("existing product", existingProduct?.category);

      if (existingProductIndex !== -1 && existingProduct?.price === product.price) {
        // If product already exists in cart, update quantity
        state.products[existingProductIndex].quantity += 1;
        state.quantity += 1;
        state.total += product.price;
      } else {
        // If product doesn't exist in cart, add as new item
        state.products.push({ ...product, quantity: 1 });
        state.quantity += 1;
        state.total += product.price;
      }
    },
    reset: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
