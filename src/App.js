import "./App.css";
// import { AlertDanger, AlertSuccess } from "./components/alerts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { SetRoutes } from "./routes";
import React from "react";
import { Config } from "./api/axios.config";

function App() {
  return (
    <>
      <React.StrictMode>
        <Router>
          <Config></Config>
          <Header></Header>
          <div className="App">
            <Routes>
              {SetRoutes.map((route, index) => {
                const Page = route.components;
                return (
                  <Route
                    exact
                    key={index}
                    path={route.path}
                    element={<Page />}
                  />
                );
              })}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer></Footer>
        </Router>
      </React.StrictMode>
    </>
  );
}

export default App;
