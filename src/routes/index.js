import home from "~/pages/home";
import cat from "~/pages/cat";
import dog from "~/pages/dog";
import food from "~/pages/food";
import accessory from "~/pages/accessory";

const routes = {
  home: "/",
  dog: "/dog",
  cat: "/cat",
  accessory: "/accessory/:animal",
  food: "/food:animal",
};

export const SetRoutes = [
  { path: routes.home, components: home },
  { path: routes.cat, components: cat },
  { path: routes.dog, components: dog },
  { path: routes.accessory, components: accessory },
  { path: routes.food, components: food },
];
