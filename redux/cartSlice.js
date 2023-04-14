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
      // console.log("products", state.products);
      // console.log("product", product);
      const existingProductIndex = state.products.findIndex(
        (item) => item.price === product.price && item._id === product._id
      );
      const existingProduct = state.products.find(
        (item) => item._id === product._id
      );
      // console.log("existing price", existingProduct);
      // console.log("product price", product.price);

      if (
        existingProductIndex !== -1 &&
        existingProduct 
      ) {
        // If product already exists in cart and category is not "pizza", update quantity
        state.products[existingProductIndex].quantity += 1;
        state.quantity += 1;
        state.total += product.price;
      } else {
        // If product doesn't exist in cart or category is "pizza", add as new item
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
