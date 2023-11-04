import React from "react";

export default function ClickableComponent({
  jsonData,
  renderStyle1Keys,
  renderStyle2Keys,
  style1,
}) {
  return (
    <div className="" style={{ height: "500px" }}>
      {Object.keys(JSON.parse(jsonData)).length > 0 ? (
        <>
          {style1
            ? renderStyle1Keys(JSON.parse(jsonData))
            : renderStyle2Keys(JSON.parse(jsonData))}
        </>
      ) : (
        <p>No keys to display.</p>
      )}
    </div>
  );
}
