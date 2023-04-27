import Home from "~/pages/home";
import Cat from "~/pages/cat";
import Dog from "~/pages/dog";
import Food from "~/pages/food";
import Accessory from "~/pages/accessory";

const routes = {
  home: "/",
  dog: "/dog",
  cat: "/cat",
  accessory: "/accessory/:animal",
  food: "/food:animal",
};

export const SetRoutes = [
  { path: routes.home, components: Home },
  { path: routes.cat, components: Cat },
  { path: routes.dog, components: Dog },
  { path: routes.accessory, components: Accessory },
  { path: routes.food, components: Food },
];
