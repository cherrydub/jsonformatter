import React from "react";
import { inputUrl, inputJson, parsedJson } from "../signals";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Toaster, toast } from "sonner";

export default function Clickable() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  return (
    <div className="output flex flex-col gap-2 " id="output">
      Parsed Output
      <textarea
        value={parsedJson.value}
        readOnly
        // onChange={(e) => (parsedJson.value = e.target.value)}
        name=""
        id=""
        className=" placeholder-gray-100 focus:outline-white cursor-copy"
        placeholder=""
        onClick={() => {
          copyToClipboard(parsedJson.value);
          console.log("copied");
          toast.info("Copied Formatted Json");
        }}
      ></textarea>
      <div className="flex flex-row gap-2 justify-end">
        <button
          onClick={() => {
            copyToClipboard(parsedJson.value);
            console.log("copied");
            toast.info("Copied Formatted Json");
          }}
          className="btn focus:outline-white"
        >
          <i class="las la-copy"></i> Copy Formatted JSON
        </button>
      </div>
    </div>
  );
}
