import instance from "./axios.config";
import queryString from "query-string";

const petPalsAPI = {
  // ~~~~~~~~~~~~~~Navigation~~~~~~~~~~~~~~~~//
  getPetCategory: (param) => {
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

  filterPets: (param, limit = 15, page = 1, sort = 0) => {
    // 0 === latest
    const query = {};

    if (sort == 0) {
      query.latest = "1";
    } else if (sort == 1) {
      query.latest = "0";
    } else if (sort == 2) {
      query.price = "asc";
    } else if (sort == 3) {
      query.price = "desc";
    }
    const queryParams = queryString.stringify(query);
    const url = `pet?subcategory=${param}&limit=${limit}&page=${page}&${queryParams}`;
    return instance.get(url);
  },

  getDetailPet: (param) => {
    const url = "pet/" + param;
    return instance.get(url);
  },

  addPet: ({
    idUser,
    name,
    price,
    description,
    category,
    subcategory,
    images,
  }) => {
    const url = "/pet";
    var formData = new FormData();
    formData.append("idUser", idUser);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });
    return instance.post(url, formData);
  },

  getPetPosted: (idUser) => {
    const url = "/pet/my-pet/" + idUser;
    return instance.get(url);
  },

  updatePetPosted: (
    { idUser, name, price, description, category, subcategory, images },
    idPet
  ) => {
    const url = `/pet/${idPet}`;
    var formData = new FormData();
    formData.append("idUser", idUser);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });
    return instance.put(url, formData);
  },

  deletePetImagesPosted: ({ idUser, image }, idPet) => {
    const url = `/pet/image/${idPet}`;
    return instance.put(url, { idUser, image });
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

  filterProducts: (param, limit = 15, page = 1, sort = 0) => {
    //0 === latest
    const query = {};
    if (sort == 0) {
      query.latest = "1";
    } else if (sort == 1) {
      query.latest = "0";
    } else if (sort == 2) {
      query.price = "asc";
    } else if (sort == 3) {
      query.price = "desc";
    }
    const queryParams = queryString.stringify(query);
    const url = `product?subitem=${param}&limit=${limit}&page=${page}&${queryParams}`;
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
