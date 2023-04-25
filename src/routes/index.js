import home from "~/pages/home";
import contact from "~/pages/contact";
import about from "~/pages/about";
import cat from "~/pages/cat";

const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  cat: "/cat",
};

export const SetRoutes = [
  { path: routes.home, components: home },
  { path: routes.about, components: about },
  { path: routes.contact, components: contact },
  { path: routes.cat, components: cat },
];
