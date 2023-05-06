// export const categoriesSelector = (state) => state.categories.data;
// export const itemsSelector = (state) => state.items.data;

export const currentUserSelector = (state) => state.auth.currentUser;
export const currentCartSelector = (state) => state.auth.cart;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const totalSelector = (state) => state.auth.total;
