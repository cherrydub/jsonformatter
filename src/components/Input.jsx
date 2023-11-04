import React, { useEffect } from "react";
import { inputUrl, inputJson, parsedJson, formattedJson } from "../signals";
import { formatJson } from "../logic";
import { Toaster, toast } from "sonner";

function handleUrlClear() {
  inputUrl.value = "";
}

function handleJsonClear() {
  inputJson.value = "";
}

const isUrlValid = (url) => {
  const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
};

export default function Input() {
  return (
    <div className="input flex flex-col gap-2" id="input">
      <div className="flex flex-row gap-2 justify-start">
        <button className="btn focus:outline-white">
          <i class="las la-paste"></i> Paste URL
        </button>
        {isUrlValid(inputUrl) && (
          <button className="btn focus:outline-white">
            <i class="las la-robot"></i> Extract URL
          </button>
        )}
        {inputUrl.value && (
          <button onClick={handleUrlClear} className="btn focus:outline-white">
            <i className="las la-trash-alt"></i> Clear
          </button>
        )}
      </div>
      <input
        onChange={(e) => (inputUrl.value = e.target.value)}
        value={inputUrl.value}
        type="url"
        className=" placeholder-gray-100 focus:outline-white "
        placeholder="Enter URL of JSON"
      />
      <textarea
        value={inputJson.value}
        onChange={(e) => (inputJson.value = e.target.value)}
        name=""
        id=""
        className=" placeholder-gray-100 focus:outline-white"
        placeholder="Or paste JSON directly into here"
      ></textarea>
      <div className="flex flex-row gap-2 justify-end">
        <button className="btn focus:outline-white">
          <i class="las la-paste"></i> Paste JSON
        </button>

        {inputJson.value &&
          inputJson.value.trim() !== "" &&
          /^[\s\S]*\{[\s\S]*\}[\s\S]*$/.test(inputJson.value) && (
            <a href="#output">
              <button onClick={formatJson} className="btn focus:outline-white ">
                <i class="las la-robot"></i> Format
              </button>
            </a>
          )}
        {inputJson.value && (
          <button onClick={handleJsonClear} className="btn focus:outline-white">
            <i className="las la-trash-alt"></i> Clear
          </button>
        )}
      </div>
    </div>
  );
}
