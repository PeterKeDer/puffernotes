import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Puffer from "../components/Puffer";

import "./style.css"

import logo from "../img/puffer_logo.png"

import { getStatus } from "../helpers/endpoints";
import ResultComponent from "../components/Result";

const Result = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const isComplete =
    status && (status.status === "completed" || status.status === "error");

  useEffect(() => {
    if (id === null || id === "") return;

    const fetchStatus = async () => {
      if (isComplete) return;

      const status = await getStatus(id);
      setStatus(status);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [id, isComplete]);

  if (status === null || !isComplete) {
    document.body.style = 'background: #020887;';
    return (
      <div>
        <Puffer></Puffer>
        <p class="loading"><b>Loading...</b></p>
      </div>
    );
  } else if (status.status === "error") {
    document.body.style = 'background: white;';
    return (
      <div>
        <h1>Error</h1>
        <p>{status.error}</p>
      </div>
    );
  } else {
    document.body.style = 'background: white;';
    return (
      <div className="page">
        <div className="page-head">
           <img className="image-container" src={logo}></img>
           </div>
        <ResultComponent status={status} />
      </div>

    );
  }
};

export default Result;
