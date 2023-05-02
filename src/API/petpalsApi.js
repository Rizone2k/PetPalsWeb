import instance from "./axios.config";

const petPalsAPI = {
  // &limit=2&page=1
  // lever 1 - Pet
  // For navigation, get pet (dog or cat, dependent on id(param))
  getPet: (param) => {
    const url = "category/" + param;
    return instance.get(url);
  },

  // lever 2 - item
  // For navigation, get pet (dog or cat, dependent on id(param))
  getProduct: (param, limit = "20", page = "1") => {
    const url =
      "product?subitem=" + param + "&limit=" + limit + "&page=" + page;
    return instance.get(url);
  },

  getPetList: (param, limit = "20", page = "1") => {
    const url = "pet?category=" + param + "&limit=" + limit + "&page=" + page;
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

  // ~~~~~~~~~~~~~~Navigation~~~~~~~~~~~~~~~~//
  getItems: (param) => {
    const url = "items/" + param;
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
  // getProductList: (id, page = "1") => {
  //   const url = "product?category=" + id + "&page=" + page;
  //   return instance.get(url);
  // },
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

export default petPalsAPI;
