import { inputUrl, inputJson, formattedJson, parsedJson } from "./signals";
import { Toaster, toast } from "sonner";

export const formatJson = () => {
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
      toast.success("Formatted JSON");
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
    // inputUrl.value = "";
    // inputJson.value = "";
  }
};
