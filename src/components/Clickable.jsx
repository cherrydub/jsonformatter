import React, { useState } from "react";
import { inputUrl, inputJson, formattedJson, parsedJson } from "../signals";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Toaster, toast } from "sonner";
import ClickableComponent from "./ClickableComponent";
import Modal from "react-modal";
import "../extra.css";

const colorArr = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#fffffc",
];

export default function Clickable({ jsonData = formattedJson.value }) {
  Modal.setAppElement("#root");
  const [pushedWords, setPushedWords] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedKeys, setCollapsedKeys] = useState({});
  const [collapsedAll, setCollapsedAll] = useState(false);
  const [style1, setStyle1] = useState(true);
  const [objKey, setObjKey] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      width: "100vw",
      height: "100vh",
      margin: "auto",
      background: "transparent", // Add this line to set the background to transparent
      border: "none", // Remove the border
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleKeyCollapse = (key) => {
    setCollapsedKeys((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleAllKeys = (collapse) => {
    const newCollapsedKeys = {};

    // Recursively set collapse state for all keys and objects
    const setCollapseRecursively = (obj, path = []) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          newCollapsedKeys[[...path, key].join(".")] = collapse;
          setCollapseRecursively(obj[key], [...path, key]);
        }
      }
    };
    setCollapseRecursively(JSON.parse(jsonData));
    setCollapsedKeys(newCollapsedKeys);
  };

  const handleKeyClick = (key) => {
    const formattedKey = key.replace(
      /\.\d+/g,
      (match) => `[${match.slice(1)}]`
    );

    toast.success(`Copied path: ${formattedKey} to clipboard :)`);
    setPushedWords(formattedKey);

    navigator.clipboard.writeText(formattedKey).catch((error) => {
      console.error(`Error copying to clipboard: ${error}`);
    });
  };

  //this is the style 1 list with no background stuff🔑
  const renderStyle1Keys = (obj, depth = 1, path = []) => {
    const backgroundColor = colorArr[(depth - 1) % colorArr.length];
    return (
      <ul
        className="first-ul"
        style={
          {
            // listStyleType: "none",
            // marginLeft: "-15px",
          }
        }
      >
        {Object.keys(obj).map((key, index) => (
          <li
            className="first-li"
            title="Click to copy path"
            key={key + index}
            style={
              {
                // fontWeight: "bold",
                // fontSize: "1rem",
              }
            }
          >
            <div style={{ whiteSpace: "nowrap" }} className="">
              <button
                className={`collapse-button ${
                  typeof obj[key] !== "object"
                    ? "white-background"
                    : "exp-button"
                }`}
                onClick={() => toggleKeyCollapse([...path, key].join("."))}
              >
                {typeof obj[key] === "object"
                  ? collapsedKeys[[...path, key].join(".")]
                    ? "+"
                    : "-"
                  : "-"}
              </button>
              <span
                className={`clickable-keys ${
                  collapsedKeys[[...path, key].join(".")] ? "collapsed" : ""
                }`}
                style={{
                  backgroundColor: backgroundColor,
                  animation: "colorChange 0s infinite",
                }}
                onClick={() => handleKeyClick([...path, key].join("."))}
              >
                {objKey ? (
                  <>{"🔑" + key}:</>
                ) : (
                  <>
                    <i class="las la-key"></i>
                    {key}:
                  </>
                )}
                <span className="value" style={{ display: "none" }}>
                  {typeof obj[key] !== "object"
                    ? JSON.stringify(obj[key])
                    : null}
                </span>
              </span>
            </div>
            {!collapsedKeys[[...path, key].join(".")] &&
              !collapsedAll &&
              typeof obj[key] === "object" &&
              renderStyle1Keys(obj[key], depth + 1, [...path, key])}
          </li>
        ))}
      </ul>
    );
  };

  //this is with the colored background
  const renderStyle2Keys = (obj, depth = 1, path = []) => {
    const backgroundColor = colorArr[(depth - 1) % colorArr.length];

    return (
      <ul
        className="second-ul"
        style={
          {
            // listStyleType: "none",
            // marginLeft: "-15px",
          }
        }
      >
        {Object.keys(obj).map((key, index) => (
          <li
            className="second-li"
            title="Click to copy path"
            key={key + index}
            style={{
              backgroundColor: collapsedKeys[[...path, key].join(".")]
                ? "transparent"
                : backgroundColor, // Make collapsed keys transparent
            }}
          >
            <div style={{ whiteSpace: "nowrap" }} className="">
              <button
                className={`collapse-button ${
                  typeof obj[key] !== "object"
                    ? "white-background"
                    : "exp-button"
                }`}
                onClick={() => toggleKeyCollapse([...path, key].join("."))}
              >
                {typeof obj[key] === "object"
                  ? collapsedKeys[[...path, key].join(".")]
                    ? "+"
                    : "-"
                  : "-"}
              </button>
              <span
                className={`clickable-keys ${
                  collapsedKeys[[...path, key].join(".")] ? "collapsed" : ""
                }`}
                style={{
                  backgroundColor: backgroundColor,
                  animation: "colorChange 0s infinite",
                }}
                onClick={() => handleKeyClick([...path, key].join("."))}
              >
                {objKey ? (
                  <>{"🔑" + key}:</>
                ) : (
                  <>
                    <i class="las la-key"></i>
                    {key}:
                  </>
                )}
                <span className="value" style={{ display: "none" }}>
                  {typeof obj[key] !== "object"
                    ? JSON.stringify(obj[key])
                    : null}
                </span>
              </span>
            </div>
            {!collapsedKeys[[...path, key].join(".")] &&
              !collapsedAll &&
              typeof obj[key] === "object" &&
              renderStyle2Keys(obj[key], depth + 1, [...path, key])}
          </li>
        ))}
      </ul>
    );
  };

  // Declare modalContent outside the return statement
  const modalContent = (
    <div style={{ backgroundColor: "black" }}>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <button className="close-button" onClick={closeModal}>
          {`close [x]`}
        </button>
      </div>

      <div
        style={{
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <ClickableComponent
          jsonData={jsonData}
          renderStyle1Keys={renderStyle1Keys}
          renderStyle2Keys={renderStyle2Keys}
          style1={style1}
        />
      </div>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <button className="close-button" onClick={closeModal}>
          {`close [x]`}
        </button>
      </div>

      {/* You can add any other content you want */}
    </div>
  );

  //this is the outside element that you actually see, starting with title, buttons and then the div
  return (
    <div>
      <div className="clickable body-clickable-keys">
        <h2 className="comp-titles">Clickable Keys</h2>
        {jsonData && (
          <div>
            <div
              className="list-buttons"
              // style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              <button className="" onClick={() => toggleAllKeys(false)}>
                {"Expand All"}
              </button>
              <button className="" onClick={() => toggleAllKeys(true)}>
                {"Collapse All"}
              </button>
              <button onClick={() => setStyle1(!style1)}>
                {style1 ? "Switch to Style 2" : "Switch to Style 1"}
              </button>
              <button
                title="Click to switch key style"
                onClick={() => setObjKey(!objKey)}
              >
                {objKey ? "🔑" : <i class="las la-key"></i>}
              </button>
            </div>
            <div
              className="output-divs"
              style={{
                // padding: "10px",
                height: "500px",
                // maxWidth: "20vw",
                // width: "auto",
                overflowY: "auto",
                overflowX: "auto",
                // position: "relative",
              }}
            >
              <button
                onClick={openModal}
                style={{
                  position: "sticky", // Change to sticky
                  top: "0px", // Stick to the top
                  right: "0px", // Stick to the right
                }}
              >
                Maximize Window
              </button>
              <ClickableComponent
                jsonData={jsonData}
                renderStyle1Keys={renderStyle1Keys}
                renderStyle2Keys={renderStyle2Keys}
                style1={style1}
              />
            </div>
          </div>
        )}

        {pushedWords.length > 0 && (
          <div style={{ color: "var(--text)", paddingBottom: "10px" }}>
            Path:
            <br />
            <button
              id="pre-path-area"
              title="Click to copy"
              onClick={() => handleKeyClick(pushedWords)}
            >
              {pushedWords}
            </button>
            <br />
          </div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Maximized Component"
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}
