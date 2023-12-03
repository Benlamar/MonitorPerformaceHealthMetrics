import React, { useState, useEffect } from "react";
import "./activity.css";
import Chart from "chart.js/auto";

import { Bar, Pie, Radar } from "react-chartjs-2";
import axios from "axios";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const Activity = () => {
  const chartlabels = ["Heartbeat", "Bloodpressure", "Oxygen", "Distance"];
  const pielabels = ["Walk", "Run", "Sleep", "Rest"];

  const [data, setData] = useState([0, 0, 0, 0]);
  const [selectedValue, setSelectedValue] = useState("");

  const [chartData, setChartData] = useState({
    labels: chartlabels,
    datasets: [
      {
        label: "Average values",
        data: data,
        backgroundColor: ["rgba(75,192,192)", "#ecf0f1", "#50AF95", "#f3ba2f"],
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        position: 'left',
      },
      title: {
        display: true,
        text: "Modes Count"
      }
    }
  };

  const [pieData, setPieData] = useState({
    labels: pielabels,
    datasets: [
      {
        label: "Activites",
        data: data,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
        ],
        borderColor: "black",
        borderWidth: 2,
        
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const updateDataChart = (datalist) => {
    const avgHeartbeat =
      datalist.reduce((total, item) => total + item.heartbeat, 0) /
      datalist.length;
    const avgBloodpressure =
      datalist.reduce((total, item) => total + item.blood_pressure, 0) /
      datalist.length;
    const avgOxygen =
      datalist.reduce((total, item) => total + item.oxygen_level, 0) /
      datalist.length;
    const avgDistance =
      datalist.reduce((total, item) => total + item.distance, 0) /
      datalist.length;

    setChartData((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [avgHeartbeat, avgBloodpressure, avgOxygen, avgDistance],
        },
      ],
    }));
  };

  const updatePieChart = (datalist) => {
    const modeCounts = {};

    // Iterate over the data and count the occurrences of each mode
    datalist.forEach((item) => {
      if (modeCounts[item.mode]) {
        modeCounts[item.mode]++;
      } else {
        modeCounts[item.mode] = 1;
      }
    });

    setPieData((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: Object.values(modeCounts),
        },
      ],
    }));
  };

  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/datas")
      .then((response) => {
        setData(response.data);
        updateDataChart(response.data);
        updatePieChart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  const handleFilterData = () => {
    if (!selectedValue) {
      return;
    }
    const filteredData = data.filter((item) => item.mode === selectedValue);
    updateDataChart(filteredData);
  };

  return (
    <div className="mycontainer activity-containe">
      <div className="selection">
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value=""></option>
          <option value="walk">Walk</option>
          <option value="run">Run</option>
          <option value="rest">Rest</option>
          <option value="sleep">Sleep</option>
        </select>

        <button className="button" onClick={handleFilterData}>
          Change Mode
        </button>
      </div>

      <div className="charts">
        <div className="charts-items">
          <h3 className="font-bold">Averages</h3>
          <Bar data={chartData} />
        </div>
        <div className="charts-items">
          <h3 className="font-bold">Analysis</h3>
          <Radar data={pieData}/>
        </div>
        <div className="charts-items">
          <h3 className="font-bold">Stats</h3>
          <Pie data={pieData} options={options}/>
        </div>
      </div>
    </div>
  );
};

export default Activity;
