import instance from "./axios.config";

// const query = {
//   ...(limit && { limit }),
//   ...(page && page !== "0" && { page }),
//   ...(sort === 0 && { latest: "1" }),
//   ...(sort === 1 && { latest: "0" }),
//   ...(sort === 2 && { price: "asc" }),
//   ...(sort === 3 && { price: "desc" }),
// };

const petPalsAPI = {
  // ~~~~~~~~~~~~~~Navigation~~~~~~~~~~~~~~~~//
  getPet: (param) => {
    const url = "category/" + param;
    return instance.get(url);
  },

  getProduct: (param, limit = 10, page = 1) => {
    const url =
      "product?subitem=" + param + "&limit=" + limit + "&page=" + page;
    return instance.get(url);
  },

  getItems: (param) => {
    const url = "item/" + param;
    return instance.get(url);
  },

  // ~~~~~~~~~~~~~~Pet~~~~~~~~~~~~~~~~//
  getPetList: (param, limit = 10, page = 1) => {
    const url = "pet?category=" + param + "&limit=" + limit + "&page=" + page;
    return instance.get(url);
  },

  getDetailPet: (param) => {
    const url = "pet/" + param;
    return instance.get(url);
  },

  searchPet: (params, page = "1") => {
    const url = "/pet/search?key=" + params + "&page=" + page;
    return instance.get(url);
  },
  // ~~~~~~~~~~~~~~Product~~~~~~~~~~~~~~~~//

  getProductList: (param, limit = 10, page = 1) => {
    const url =
      "product?subitem=" + param + "&limit=" + limit + "&page=" + page;
    return instance.get(url);
  },

  getDetailProduct: (param) => {
    const url = "product/" + param;
    return instance.get(url);
  },

  checkout: ({ idUser, paymentMethod, fullName, email, address, phone }) => {
    const url = "/checkout";
    return instance.post(url, {
      idUser,
      paymentMethod,
      fullName,
      email,
      address,
      phone,
    });
  },
};

export default petPalsAPI;
