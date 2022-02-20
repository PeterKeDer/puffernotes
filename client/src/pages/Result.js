import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Puffer from "../components/Puffer";

import "./style.css";

import logo from "../img/puffer_logo.png";

import { getStatus, getAudioLink } from "../helpers/endpoints";
import ResultComponent from "../components/Result";

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);
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

  if (status !== null && !isComplete) {
    const audio = new Audio(getAudioLink(status.id));
    audio.onloadedmetadata = () => {
      setAudioDuration(audio.duration);
    };
  }

  if (status === null || !isComplete) {
    document.body.style = "background: #020887;";
    return (
      <div>
        <Puffer></Puffer>
        <p className="loading">
          <b>Loading...</b>
        </p>
        {audioDuration === null ? (
          ""
        ) : (
          <Typography color="white">
            This will take approximately{" "}
            {Math.floor((audioDuration * 0.3) / 60) || 1} minutes to process.
          </Typography>
        )}
      </div>
    );
  } else if (status.status === "error") {
    document.body.style = "background: white;";
    return (
      <div>
        <h1>Error</h1>
        <p>{status.error}</p>
      </div>
    );
  } else {
    document.body.style = "background: white;";
    return (
      <div className="page">
        <div className="page-head">
          <img
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            className="image-container"
            src={logo}
            alt="logo"
          ></img>
        </div>
        <ResultComponent status={status} />
      </div>
    );
  }
};

export default Result;
