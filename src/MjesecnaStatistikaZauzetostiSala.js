import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./statistika.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import useFetch from "./useFetch";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function MjesecnaStatistikaZauzetostiSala() {
  const { id } = useParams();
  const { error, isPending, data: datas } = useFetch(global.urls.links.statistikaSaleZauzeceMjesecnoURL + id);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Мјесечни преглед заузетости сала за " + (datas && datas.title)+ " мјесец (у минутама)"
      }
    }
  };

  var rangeLeft = parseInt(id) + 1;
  var rangeRight = parseInt(id) - 1;

  function CheckIfRightDisabled() {
    if (rangeRight < 0) {
      return true;
    }
    else {
      return false;
    }
  }

  return <div className="mjesecnaStatistikaZauzetostiSala">
    {error && <div>{error}</div>}
    {isPending && <div>Loading...</div>}
    {datas && <Line options={options} data={datas.data} />}
    <div className="navigacija"><Link to={`/statistikaSaleMjesecna/${rangeLeft}`}><button className="goLeftButton" ><GoArrowLeft /></button></Link><Link to={`/statistikaSaleMjesecna/${rangeRight}`}><button className="goRightButton" disabled={CheckIfRightDisabled()}><GoArrowRight /></button></Link></div>
  </div>
}
