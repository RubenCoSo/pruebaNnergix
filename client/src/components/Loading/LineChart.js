import React from "react";
import Plot from "react-plotly.js";

export default function LineChart(props) {
  let measures = props.measures;

  const vel110Arr = measures.map((measure) => {
    return measure["Mean vel110 (m/s)"];
  });
  const vel89Arr = measures.map((measure) => {
    return measure["Mean vel89 (m/s)"];
  });
  const alphaArr = measures.map((measure) => {
    return measure.alpha;
  });
  const yearMonthArr = measures.map((measure) => {
    return measure.Month;
  });
  console.log(`arr`, vel110Arr, vel89Arr, alphaArr, yearMonthArr);
  let trace1 = {
    x: yearMonthArr,
    y: vel110Arr,
    line: {
      color: "rgba (31, 119, 180, 1)",
      dash: "solid",
      width: 1.5,
    },
    marker: {
      color: "#1F77B4",
      line: { color: "#1F77B4", width: 1.0 },
      opacity: 1,
      size: 6.0,
      symbol: "circle",
    },
    mode: "lines+markers",
    name: "Mean vel110 (m/s)",
    type: "scatter",
  };

  let trace2 = {
    x: yearMonthArr,
    y: vel89Arr,
    line: {
      color: "rgba (175, 88, 87, 1)",
      dash: "solid",
      width: 1.5,
    },
    marker: {
      color: "#AF5857",
      line: {
        color: "#AF5857",
        width: 1.0,
      },
      opacity: 1,
      size: 6.0,
      symbol: "circle",
    },
    mode: "lines+markers",
    name: "Mean vel89 (m/s)",
    type: "scatter",
  };

  let trace3 = {
    x: yearMonthArr,
    y: alphaArr,
    line: {
      color: "rgba (64, 127, 75, 1)",
      dash: "solid",
      width: 1.5,
    },
    marker: {
      color: "#407F4B",
      line: {
        color: "#407F4B",
        width: 1.0,
      },
      opacity: 1,
      size: 6.0,
      symbol: "circle",
    },
    mode: "lines+markers",
    name: "Alpha",
    type: "scatter",
  };

  return (
    <Plot
      data={[trace1, trace2, trace3]}
      layout={{
        autosize: false,
        height: 500,
        hovermode: "closest",
        legend: {
          bgcolor: "rgba(0,0,0,0)",
          font: {
            size: 10.0,
          },
          orientation: "h",
          x: 0.48,
          xanchor: "center",
          y: 1.07,
          yanchor: "middle",
        },
        margin: {
          b: 40,
          l: 50,
          pad: 0,
          r: 10,
          t: 60,
        },
        showlegend: true,
        template: {
          data: {
            scatter: [{ type: "scatter" }],
          },
        },
        width: 500,
        xaxis: {
          anchor: "y",
          //   dtick: 0.5,
          mirror: false,
          showgrid: true,
          showline: true,
          side: "bottom",
          //   tick0: 5.0,
          tickfont: { size: 10.0 },
          ticks: "inside",
          title: {
            font: {
              color: "#000000",
              size: 10.0,
            },
            text: "Year/Month",
          },
          //   type: "linear",
          zeroline: false,
        },
        yaxis: {
          anchor: "x",
          domain: [0.0, 1.0],
          mirror: false,
          nticks: 9,
          range: [0.0, 10.0],
          showgrid: true,
          showline: true,
          side: "left",
          tickfont: { size: 10.0 },
          ticks: "inside",
          title: {
            font: {
              color: "#000000",
              size: 10.0,
            },
            text: "Mean Wind Velocity (m/s)",
          },
          type: "linear",
          zeroline: false,
        },
      }}
    />
  );
}
