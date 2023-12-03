import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectLayer from "../connectlayer/ConnectLayer";
import Cards from "../cards/Cards";

const Monitor = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dataReducer.data)

  return (
    <div>
      <div className="mycontainer card-container">
        <Cards value={data.heartbeat?data.heartbeat:"00"} src={"heart.png"} title={"Heart Pulse"} size={"tall"} alt={"https://www.flaticon.com/free-icons/heartbeat"}/>
        <Cards value={data.mode?data.mode:"---"} src={data.mode?data.mode+".png":"rest.png"} title={data.mode?data.mode:"---"} size={"wide"} alt={"https://www.flaticon.com/free-icons/rest"}/>
        <Cards value={data.blood_pressure?data.blood_pressure:"00"} src={"blood-pressure.png"} title={"Blood Presure"} size={""} alt={"https://www.flaticon.com/free-icons/blood-pressure-meter"}/>
        <Cards value={data.oxygen_level?data.oxygen_level:"00"} src={"o2.png"} size={""} title={"Oxygen"} alt={"https://www.flaticon.com/free-icons/oxygen"}/>
        <Cards value={data.distance?data.distance:"00"} src={"distance2.png"} title={"Distance"} size={""} alt={"https://www.flaticon.com/free-icons/distance"}/>
      </div>

      <ConnectLayer />
    </div>
  );
};

export default Monitor;
