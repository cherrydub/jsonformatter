import "./App.css";
import "../fonts/programme/stylesheet.css";
import Input from "./components/Input";
import Output from "./components/Output";
import Header from "./components/Header";

import { inputUrl, inputJson, formattedJson } from "./signals";

function App() {
  return (
    <div className="app">
      <Header />
      <br />
      <br />

      {/* <Instructions /> */}

      <Input />

      <br />
      {formattedJson.value && <Output />}

      <div></div>
    </div>
  );
}

export default App;
