import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="mycontainer about">
      <h1 className="title font-bold text-4xl mt-4 text-center">
        About Monitoring Dashboard
      </h1>
      <p className="text-center">
        Health Monitoring Dashboard. It allows you to track real-time updates on
        heart rates, blood pressure, distance walked, and oxygen levels. The
        system runs on Node.js for the server and MongoDB for data storage,
        Socket.IO for real time connetion. A Python-based client serves as a
        device, transmitting health data.
      </p>
      <h3 className="title font-bold text-lg mt-2 text-left">Attributes</h3>
      <ul className="text-left list-disc ml-5">
        <li>
          <a className="text-blue-600" href="https://www.flaticon.com/free-icons/">Icons from flaticon</a>
        </li>
      </ul>
    </div>
  );
};

export default About;
