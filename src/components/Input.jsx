import React, { useEffect } from "react";
import {
  inputUrl,
  inputJson,
  formattedJson,
  parsedJson,
  howToStarted,
} from "../signals";

import { Toaster, toast } from "sonner";

if (howToStarted.value) {
  console.log("ldjflsdlfj");
}
function formatJson() {
  formattedJson.value = undefined;

  const currentInput = inputJson.value;

  try {
    let cleanedJson = currentInput;

    // Track the corrections made
    const corrections = [];

    // Remove ellipses (...)
    if (cleanedJson.includes("...")) {
      cleanedJson = cleanedJson.replace(/\.\.\./g, "");
      corrections.push("Removed ellipses (...)");
    }

    // Remove trailing commas
    cleanedJson = cleanedJson.replace(/,\s*([\]}])/g, "$1");
    if (cleanedJson !== currentInput) {
      corrections.push("Removed trailing commas");
    }

    // Correcting numeric keys
    cleanedJson = cleanedJson.replace(/"(\d+\.\d+)"/g, (_, p1) => `"${p1}"`);
    if (cleanedJson !== currentInput) {
      corrections.push("Corrected numeric keys");
    }

    // Escaping unescaped characters
    cleanedJson = cleanedJson.replace(/\\[^"\\/bfnrtu]/g, "\\\\$&");
    if (cleanedJson !== currentInput) {
      corrections.push("Escaped unescaped characters");
    }

    // Add missing quotes for keys
    cleanedJson = cleanedJson.replace(
      /([{,]\s*)([A-Za-z_]\w*):/g,
      (_, p1, p2) => {
        if (!p1.includes('"')) {
          const corrected = `${p1}"${p2}":`;
          corrections.push("Added missing quotes for keys");
          return corrected;
        }
        return `${p1}${p2}:`;
      }
    );

    // Correcting incorrect quotes around values
    cleanedJson = cleanedJson.replace(
      /"([^"]*?)":\s*'([^']*?)'/g,
      (_, p1, p2) => `"${p1}": "${p2}"`
    );
    if (cleanedJson !== currentInput) {
      corrections.push("Corrected incorrect quotes around values");
    }

    const parsedJsonOriginal = JSON.parse(cleanedJson);
    const formatted = JSON.stringify(parsedJsonOriginal, null, 2);

    formattedJson.value = formatted;
    parsedJson.value = parsedJsonOriginal;

    // Display toast messages for corrections
    if (corrections.length > 0) {
      toast.info(`Correction made: ${corrections[0]}`);
      // //will use corrections[0] for now, get too many false positives for fixes like below:
      // toast.info(`Corrections made:\n${corrections.join('\n')}`);
      // toast.success("Formatted JSON");
    } else {
      toast.success("Formatted JSON + No correction needed");
    }
  } catch (error) {
    toast.error("Error: Please double check your JSON");
    console.error("Error while parsing or formatting JSON:", error);
    // setFormattedJson('An error occurred while processing your JSON.');
  } finally {
    // console.log("input:", inputJson.value);
    // console.log("formatted:", formattedJson.value);
    // console.log("parsed:", parsedJson.value);
    inputUrl.value = "";
    inputJson.value = "";
  }
}

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

const handleExtractUrl = async () => {
  const response = await fetch(inputUrl.value);
  const data = await response.json();

  const stringedData = JSON.stringify(data);
  inputJson.value = stringedData;
};

export const handlePasteUrl = async () => {
  try {
    if (howToStarted.value) {
      console.log("ye its TRUE");
      inputUrl.value = "https://ergast.com/api/f1/2004/1/results.json";
      toast.info("Pasted clipboard content into URL input");

      setTimeout(() => {
        handleExtractUrl();
        toast.info("Extracting URL");
        setTimeout(() => {
          toast.info("Formatting JSON");
          formatJson();
        }, 2000);
      }, 2000);
      return;
    }
    const clipboardText = await navigator.clipboard.readText();
    let url = clipboardText;

    // Check for missing https:// and replace www.
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (url.startsWith("www.")) {
        url = "https://" + url;
      } else {
        url = "https://" + url;
      }
    }
    inputUrl.value = url;
    toast.info("Pasted clipboard content into URL input");

    setTimeout(() => {
      handleExtractUrl();
      toast.info("Extracting URL");
      setTimeout(() => {
        toast.info("Formatting JSON");
        formatJson();
      }, 2000);
    }, 2000);
  } catch (error) {
    console.error("Error pasting URL from clipboard:", error);
    toast.error("Error pasting URL from clipboard", toastObj);
  } finally {
    howToStarted.value = false;
    console.log("howtoStated value:", howToStarted.value);
  }
};

const handlePasteJson = async () => {
  const clipboardText = await navigator.clipboard.readText();
  inputJson.value = clipboardText;
};

export default function Input() {
  return (
    <div className="input flex flex-col gap-2" id="input">
      <div className="flex flex-row gap-2 justify-start">
        <button onClick={handlePasteUrl} className="btn focus:outline-white">
          <i class="las la-paste"></i> Paste URL
        </button>
        {isUrlValid(inputUrl) && (
          <button
            onClick={handleExtractUrl}
            className="btn focus:outline-white"
          >
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
        <button onClick={handlePasteJson} className="btn focus:outline-white">
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
