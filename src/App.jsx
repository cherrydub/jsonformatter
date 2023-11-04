import "./App.css";
import "../fonts/programme/stylesheet.css";
import { Toaster, toast } from "sonner";
import Input from "./components/Input";
import Output from "./components/Output";
import Header from "./components/Header";

import { inputUrl, inputJson, formattedJson, parsedJson } from "./signals";
import Footer from "./components/Footer";
import Info from "./components/Info";
import Clickable from "./components/Clickable";

function App() {
  return (
    <>
      <div className="app">
        <Toaster richColors />
        <Header />
        <Input />
        {true && <Output />}
        {/* <Info />
        <Clickable /> */}

        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
