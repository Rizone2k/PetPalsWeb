import Home from "~/pages/home";
import Products from "~/pages/products";
import Pet from "~/pages/pet";
import DetailPet from "~/pages/detailPet";
import DetailProduct from "~/pages/detailProduct";
import Sign from "~/pages/auth";
import Cart from "~/pages/cart";
import Rehome from "~/pages/rehome";

const routes = {
  home: "/",
  pet: "/pet/:id",
  petNoId: "/pet",
  profile: "/profile",
  cart: "/cart",
  rehome: "/rehome",
  products: "/products/:idProduct",
  productsNoIdProduct: "/products",
  detailPet: "/detailPet/:id",
  detailProduct: "/detailProduct/:id",
};

export const SetRoutes = [
  { path: routes.home, components: Home },
  { path: routes.profile, components: Sign },
  { path: routes.pet, components: Pet },
  { path: routes.cart, components: Cart },
  { path: routes.rehome, components: Rehome },
  { path: routes.petNoId, components: Pet },
  { path: routes.products, components: Products },
  { path: routes.productsNoIdProduct, components: Products },
  { path: routes.detailPet, components: DetailPet },
  { path: routes.detailProduct, components: DetailProduct },
];
