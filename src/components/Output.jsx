import React from "react";
import { inputUrl, inputJson, formattedJson } from "../signals";

export default function Output() {
  return (
    <div className="input flex flex-col gap-2">
      <textarea
        value={formattedJson.value}
        onChange={(e) => (formattedJson.value = e.target.value)}
        name=""
        id=""
        className=" placeholder-gray-100 focus:outline-white"
        placeholder=""
      ></textarea>
      <div className="flex flex-row gap-2 justify-end">
        <button className="btn focus:outline-white">
          <i class="las la-copy"></i> Copy Formatted JSON
        </button>
      </div>
    </div>
  );
}
