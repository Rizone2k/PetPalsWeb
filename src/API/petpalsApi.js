import instance from "./axios.config";

const API = {
  getPet: (page) => {
    const url = "pet" + page;
    return instance.get(url);
  },
  getCategory: (page) => {
    const url = "category" + page;
    return instance.get(url);
  },
  getProduct: (page) => {
    const url = "product" + page;
    return instance.get(url);
  },
  getItems: (page) => {
    const url = "items" + page;
    return instance.get(url);
  },

  // ~~~~~~~~~~~~~~Pet~~~~~~~~~~~~~~~~//
  searchPet: (params, page = "1") => {
    const url = "/pet/search?key=" + params + "&page=" + page;
    return instance.get(url);
  },
  getPetList: (id, page = "1") => {
    const url = "pet?category=" + id + "&page=" + page;
    return instance.get(url);
  },
  //   getPetDetail: (id, page = "1") => {
  //     const url = "pet?category=" + id + "&page=" + page;
  //     return instance.get(url);
  //   },
  // ~~~~~~~~~~~~~~Product~~~~~~~~~~~~~~~~//
  searchProduct: (params, page = "1") => {
    const url = "/product/search?key=" + params + "&page=" + page;
    return instance.get(url);
  },
  getProductList: (id, page = "1") => {
    const url = "product?category=" + id + "&page=" + page;
    return instance.get(url);
  },
  //   getProductDetails: (id, page = "1") => {
  //     const url = "pet?category=" + id + "&page=" + page;
  //     return instance.get(url);
  //   },
  // ~~~~~~~~~~~~~~items~~~~~~~~~~~~~~~~//
  searchItems: (params, page = "1") => {
    const url = "/item/search?key=" + params + "&page=" + page;
    return instance.get(url);
  },
  getItemList: (id, page = "1") => {
    const url = "pet?items=" + id + "&page=" + page;
    return instance.get(url);
  },
  //   getItemDetails: (id, page = "1") => {
  //     const url = "pet?category=" + id + "&page=" + page;
  //     return instance.get(url);
  //   },
};

export default API;
