import logo from "../logo.svg";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function HomePage() {
  const [location, setLocation] = useState();
  const [locationOpt, setLocationOpt] = useState();

  useEffect(() => {
    axios.get(`${API_URL}/getAllLocations`).then((locationNames) => {
      setLocationOpt(locationNames);
    });
  }, []);
  return (
    <p>hola</p>
    // <form>
    //   <select onChange={(e) => setLocation(e.target.value)}>
    //     <option value="0">Choose...</option>
    //     {locationOpt.map((loc) => {
    //                   return <option value={loc}>{loc}</option>;
    //                 })}
    //   </select>
    // </form>
  );
}

export default HomePage;
