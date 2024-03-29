import React from "react";
import { inputUrl, inputJson, formattedJson } from "../signals";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Toaster, toast } from "sonner";

export default function Output() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  return (
    <div className="output flex flex-col gap-2 " id="output">
      Output
      <textarea
        value={formattedJson.value}
        readOnly
        // onChange={(e) => (formattedJson.value = e.target.value)}
        name=""
        id=""
        className=" placeholder-gray-100 focus:outline-white cursor-copy"
        placeholder=""
        onClick={() => {
          copyToClipboard(formattedJson.value);
          console.log("copied");
          toast.info("Copied Formatted Json");
        }}
      ></textarea>
      <div className="flex flex-row gap-2 justify-end">
        <button
          onClick={() => {
            copyToClipboard(formattedJson.value);
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
