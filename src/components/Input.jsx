import React from "react";
import { inputUrl, inputJson } from "../signals";

export default function Input() {
  return (
    <div className="input flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-start">
        <button className="btn focus:outline-white">
          <i class="las la-paste"></i> Paste URL
        </button>
        <button className="btn focus:outline-white">
          <i class="las la-robot"></i> Extract URL
        </button>
        <button
          onClick={() => (inputUrl.value = "")}
          className="btn focus:outline-white"
        >
          <i className="las la-trash-alt"></i> Clear
        </button>
      </div>
      <input
        onChange={(e) => (inputUrl.value = e.target.value)}
        value={inputUrl.value}
        type="text"
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
        <button className="btn focus:outline-white ">
          <i class="las la-robot"></i> Format
        </button>
        <button
          onClick={() => (inputJson.value = "")}
          className="btn focus:outline-white"
        >
          <i className="las la-trash-alt"></i> Clear
        </button>
      </div>
    </div>
  );
}
