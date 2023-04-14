import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button className="rounded-full bg-red-900 px-5 py-2 align-middle inline-block h-12 basis-0">
            <small>Save Changes</small>
          </button>
        </header>
      </div>
    </div>
  );
}

export default App;
