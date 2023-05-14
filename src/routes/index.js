import Home from "~/pages/home";
import Products from "~/pages/products";
import Pets from "~/pages/pets";
import Detail from "~/pages/detail";
import Sign from "~/pages/auth";
import Cart from "~/pages/cart";
import Rehome from "~/pages/rehome";

const routes = {
  home: "/",
  pets: "/pet/:id",
  petNoId: "/pet",
  profile: "/profile",
  cart: "/cart",
  rehome: "/rehome",
  products: "/products/:idProduct",
  productsNoIdProduct: "/products",
  detail: "/detail/:param/:id",
};

export const SetRoutes = [
  { path: routes.home, components: Home },
  { path: routes.profile, components: Sign },
  { path: routes.pets, components: Pets },
  { path: routes.cart, components: Cart },
  { path: routes.rehome, components: Rehome },
  { path: routes.petNoId, components: Pets },
  { path: routes.products, components: Products },
  { path: routes.productsNoIdProduct, components: Products },
  { path: routes.detail, components: Detail },
];
