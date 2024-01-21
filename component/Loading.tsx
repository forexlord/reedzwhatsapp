import React from "react";
import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
          height={200}
          style={{
            marginBottom: "10px",
          }}
        />
        <Circle color="#3cbc2b" size={60} />
      </div>
    </center>
  );
}

export default Loading;
