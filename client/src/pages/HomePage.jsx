import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../components/Loading/LineChart";
const API_URL = "http://localhost:5005/api";

function HomePage() {
  const [location, setLocation] = useState();
  const [locationOpt, setLocationOpt] = useState();
  const [isDB, setIsDB] = useState(false);
  const [measures, setMeasures] = useState();
  const [measureId, setMeasureId] = useState();
  const [yearMonth, setYearMonth] = useState();
  const [meanVel110, setMeanVel110] = useState();
  const [meanVel89, setMeanVel89] = useState();
  const [alpha, setAlpha] = useState();

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

  const handleSubmit = () => {
    const requestBody = { measureId, yearMonth, meanVel110, meanVel89, alpha };

    axios
      .put(`${API_URL}/data/measureUpdate/`, requestBody)
      .then((modMeasure) => {
        console.log(modMeasure);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <LineChart measures={measures} />
          <br />
          <h1>Update Measure</h1>
          <form onSubmit={handleSubmit}>
            <select onChange={(e) => setMeasureId(e.target.value)}>
              <option value="0">Choose...</option>
              {measures.map((measure) => {
                return (
                  <option key={measure._id} value={measure._id}>
                    {measure.Month}
                  </option>
                );
              })}
            </select>
            <br />
            <label>Year/Month </label>
            <input
              type="text"
              id="Year/Month"
              onChange={(e) => setYearMonth(e.target.value)}
            />
            <br />
            <label>Mean Vel 110 (m/s) </label>
            <input
              type="float"
              id="Mean Vel 110 (m/s)"
              onChange={(e) => setMeanVel110(e.target.value)}
            />
            <br />
            <label>Mean Vel 89 (m/s) </label>
            <input
              type="float"
              id="Mean Vel 89 (m/s)"
              onChange={(e) => setMeanVel89(e.target.value)}
            />
            <br />
            <label>Alpha </label>
            <input
              type="float"
              id="Alpha"
              onChange={(e) => setAlpha(e.target.value)}
            />
            <br />
            <button type="submit">Update</button>
          </form>
        </>
      ) : null}
    </>
  ) : (
    <p>Please wait, we are checking our DB </p>
  );
}

export default HomePage;
