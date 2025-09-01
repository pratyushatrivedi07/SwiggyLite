import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {
      // restaurantName: {
      //   80086191: {
      //     id: "80086191",
      //     name: "Original Whopper Chicken(XL size Bun)",
      //     category: "Burgers, Wraps & Tacos",
      //     description:
      //       "Our Original Whopper with Flame Grilled Chicken Pa… Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      //     imageId:
      //       "FOOD_CATALOG/IMAGES/CMS/2024/11/29/523da59d-365f-4…508104e9_c9077a2b-eab2-4acf-85f0-d7a357c4757a.jpg",
      //     price: 12000,
      //     count: 2,
      //   },
      //   80086194: {
      //     id: "80086194",
      //     name: "Original Whopper Veg(XL size Bun)",
      //     category: "Burgers, Wraps & Tacos",
      //     description:
      //       "Our Original Whopper with Crunchy Veg Patty, Onion… Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      //     imageId:
      //       "FOOD_CATALOG/IMAGES/CMS/2024/11/29/dc90cc06-f883-4…1c8064d9_6b832721-694c-4df4-96f0-308388144da0.jpg",
      //     price: 12000,
      //     count: 2,
      //     isVeg: 1,
      //   },
      //   80086195: {
      //     id: "80086195",
      //     name: "Original Whopper Veg(XL size Bun)",
      //     category: "Burgers, Wraps & Tacos",
      //     description:
      //       "Our Original Whopper with Crunchy Veg Patty, Onion… Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      //     imageId:
      //       "FOOD_CATALOG/IMAGES/CMS/2024/11/29/dc90cc06-f883-4…1c8064d9_6b832721-694c-4df4-96f0-308388144da0.jpg",
      //     price: 12000,
      //     count: 1,
      //     isVeg: 1,
      //   },
      //   80086193: {
      //     id: "80086193",
      //     name: "Original Whopper Veg(XL size Bun)",
      //     category: "Burgers, Wraps & Tacos",
      //     description:
      //       "Our Original Whopper with Crunchy Veg Patty, Onion… Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      //     imageId:
      //       "FOOD_CATALOG/IMAGES/CMS/2024/11/29/dc90cc06-f883-4…1c8064d9_6b832721-694c-4df4-96f0-308388144da0.jpg",
      //     price: 12000,
      //     count: 1,
      //     isVeg: 1,
      //   },
      //   80086192: {
      //     id: "80086192",
      //     name: "Original Whopper Veg(XL size Bun)",
      //     category: "Burgers, Wraps & Tacos",
      //     description:
      //       "Our Original Whopper with Crunchy Veg Patty, Onion… Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      //     imageId:
      //       "FOOD_CATALOG/IMAGES/CMS/2024/11/29/dc90cc06-f883-4…1c8064d9_6b832721-694c-4df4-96f0-308388144da0.jpg",
      //     price: 12000,
      //     count: 1,
      //     isVeg: 1,
      //   },
      // },
    },
  },
  reducers: {
    addItem: (state, action) => {
      const { id, restaurantName } = action.payload;

      if (!state.items[restaurantName]) {
        state.items[restaurantName] = {};
      }
      if (state.items[restaurantName][id]) {
        state.items[restaurantName][id].count += 1;
      } else {
        state.items[restaurantName][id] = { ...action.payload, count: 1 };
      }
    },
    deleteItem: (state, action) => {
      const { id, restaurantName } = action.payload;

      const restaurantItems = state.items[restaurantName];
      if (!restaurantItems || !restaurantItems[id]) return;

      if (restaurantItems[id].count > 1) {
        restaurantItems[id].count -= 1;
      } else {
        delete restaurantItems[id];
        if (Object.keys(restaurantItems).length === 0) {
          delete state.items[restaurantName];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, deleteItem, clearCart, getTotalItems } =
  cartSlice.actions;
export default cartSlice.reducer;
