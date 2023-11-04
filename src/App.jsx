import "./App.css";
import "../fonts/programme/stylesheet.css";
import Input from "./components/Input";
import Output from "./components/Output";
import Header from "./components/Header";

import { inputUrl, inputJson, formattedJson } from "./signals";
import Footer from "./components/Footer";
import Info from "./components/Info";

function App() {
  return (
    <div className="app">
      <Header />
      Input
      <Input />
      <br />
      Output
      {true && <Output />}
      <br />
      <br />
      <Info />
      <Footer />
    </div>
  );
}

export default App;
