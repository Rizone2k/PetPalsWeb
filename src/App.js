import "./App.css";
import { AlertDanger, AlertSuccess } from "./components/alerts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { SetRoutes } from "./routes";

function App() {
  return (
    <Router>
      <Header></Header>
      <div className="App">
        <Routes>
          {SetRoutes.map((route, index) => {
            const Page = route.components;
            return (
              <Route exact key={index} path={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="wrap bg-blue-50">
    <Button
      className={"btn-test"}
      type={"submit"}
      onClick={() => console.log("Test")}
      title={"Click me"}
    >
      CLick me!
    </Button>
    <div className="flex flex-col absolute top-0 right-0">
      <AlertDanger
        title={"Holy smokes!"}
        content={"Something seriously bad happened."}
      ></AlertDanger>
      <AlertSuccess
        title={"Holy smokes!"}
        content={"Something seriously bad happened."}
      ></AlertSuccess>
    </div>
  </div> */
}
export default App;
