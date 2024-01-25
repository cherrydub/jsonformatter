import React from "react";

import {
  inputUrl,
  inputJson,
  formattedJson,
  parsedJson,
  howToStarted,
} from "../signals";
import { handlePasteUrl } from "./Input";

export default function Header() {
  function onHowTo() {
    howToStarted.value = true;
    console.log("turned on how to", howToStarted.value);
    handlePasteUrl();
  }

  return (
    <div className="header fixed top-0 left-0 w-full flex ">
      <div className="">
        <a href="https://cherrydub.com" target="_blank">
          <img
            src={"https://www.svgrepo.com/show/373713/json-official.svg"}
            className="spinning-logo"
            alt="json formatter"
          />
        </a>
      </div>
      <div className=" flex-1 text-center whitespace-nowrap overflow-hidden overflow-ellipsis">
        <h1 className="">
          JSON <span style={{ fontFamily: "Programme" }}>Formatter</span>
        </h1>
      </div>
      <div className="">
        <button onClick={onHowTo} className="btn">
          how to use?
        </button>
      </div>
    </div>
  );
}
