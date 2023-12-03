import React from "react";
import { startListening, stopListening } from "../../context/actions";
import { useDispatch, useSelector } from "react-redux";

import "./connect.css";

const ConnectLayer = () => {
  const dispatch = useDispatch();
  const listening = useSelector((state) => state.listenReducer.listening);

  const handleSoketListener = () => {
    if (listening) {
      dispatch(stopListening);
    } else {
      dispatch(startListening);
    }
  };

  return (
    <div className="connect">
      <button className="button" onClick={handleSoketListener}>
        {listening ? "Disconect" : "Connect"}
      </button>
    </div>
  );
};

export default ConnectLayer;
