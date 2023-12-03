import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { FaFirstdraft } from "react-icons/fa";
import About from "./components/about/About";
import Activity from "./components/activity/Activity";
import Monitor from "./components/monitor/Monitor";
import { Routes, Route } from "react-router-dom";

import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { pushData } from "./context/actions";

function App() {
  const dispatch = useDispatch();
  const listening = useSelector((state) => state.listenReducer.listening);
  const socket = io("http://localhost:8080");

  useEffect(() => {
    const handleDeviceResponse = (data) => {
      console.log("Receive data", data);
      dispatch(pushData(data.data));
    };

    if (listening) {
      console.log("listening");
      socket.on("deviceResponse", handleDeviceResponse);
    } else {
      console.log("disconnecting");
      socket.disconnect();
    }

    return () => {
      socket.off("deviceResponse", handleDeviceResponse);
    };
  }, [listening]);

  return (
    <>
      <div className="primary-nav">
        <FaFirstdraft />
        <h1 className="title font-bold text-3xl">Dashboard</h1>
      </div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Monitor />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
