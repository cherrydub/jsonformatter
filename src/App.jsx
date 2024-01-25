import "./App.css";
import "../fonts/programme/stylesheet.css";
import { Toaster, toast } from "sonner";
import Input from "./components/Input";
import Output from "./components/Output";
import Header from "./components/Header";

import {
  inputUrl,
  inputJson,
  formattedJson,
  parsedJson,
  howToStarted,
} from "./signals";

import Clickable from "./components/Clickable";

function App() {
  return (
    <>
      <div className="app">
        <Toaster richColors />
        <Header />
        <Input />
        {parsedJson.value && <Output />}
        {/* <Info /> */}
        {parsedJson.value && <Clickable />}

        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
