import logo from "../logo.svg";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005/api";

function HomePage() {
  const [location, setLocation] = useState();
  const [locationOpt, setLocationOpt] = useState();
  const [isDB, setIsDB] = useState(false);
  const [measures, setMeasures] = useState();

  console.log(`beforeCall`, isDB);

  useEffect(() => {
    axios.get(`${API_URL}/seed/checkDb`).then((data) => {
      setIsDB(true);
      console.log(`afterCall`, isDB);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/data/allLocations`)
      .then((locationNames) => {
        setLocationOpt(locationNames.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDB]);

  const handleSelect = (e) => {
    let location = e.target.value;
    if (location !== 0) {
      axios
        .get(`${API_URL}/data/allMeasures/${location}`)
        .then((measures) => {
          setMeasures(measures.data);
          setLocation(location);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMeasures();
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/data/allMeasures/${location}`)
  //     .then((measures) => {
  //       console.log(measures.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [location]);

  return isDB ? (
    <>
      <form>
        <select onChange={handleSelect}>
          <option value="0">Choose...</option>
          {locationOpt
            ? locationOpt.map((loc) => {
                return (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                );
              })
            : null}
        </select>
      </form>

      {measures ? (
        <>
          <h1>{location}</h1>
          <br />
          <table>
            <thead>
              <tr>
                <th>Year/Month</th>
                <th>Alpha</th>
                <th>Mean vel110 (m/s)</th>
                <th>Mean vel89 (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {measures.map((measure) => {
                return (
                  <tr>
                    <td>{measure.Month}</td>
                    <td>{measure.alpha}</td>
                    <td>{measure["Mean vel110 (m/s)"]}</td>
                    <td>{measure["Mean vel110 (m/s)"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  ) : (
    <p>Please wait, we are checking our DB </p>
  );
}

export default HomePage;
