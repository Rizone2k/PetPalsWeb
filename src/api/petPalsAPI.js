import instance from "./axios.config";

const petPalsAPI = {
  getPetList: (param, limit = "20", page = "1") => {
    const url = "pet?category=" + param + "&limit=" + limit + "&page=" + page;
    return instance.get(url);
  },

  // &limit=2&page=1
  getPet: (param) => {
    const url = "category/" + param;
    return instance.get(url);
  },
  getProduct: (param, limit = "20", page = "1") => {
    const url =
      "product?subitem=" + param + "&limit=" + limit + "&page=" + page;
    return instance.get(url);
  },

  // ~~~~~~~~~~~~~~Navigation~~~~~~~~~~~~~~~~//
  getItems: (param) => {
    const url = "item/" + param;
    return instance.get(url);
  },
  // ~~~~~~~~~~~~~~Pet~~~~~~~~~~~~~~~~//
  getDetailPet: (param) => {
    const url = "pet/" + param;
    return instance.get(url);
  },
  searchPet: (params, page = "1") => {
    const url = "/pet/search?key=" + params + "&page=" + page;
    return instance.get(url);
  },
  // ~~~~~~~~~~~~~~Product~~~~~~~~~~~~~~~~//

  // ~~~~~~~~~~~~~~Items~~~~~~~~~~~~~~~~//
};

export default petPalsAPI;
