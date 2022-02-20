import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getStatus } from "../helpers/endpoints";
import Chapters from "../components/Chapters";
import Keywords from "../components/Keywords";
import Transcript from "../components/Transcript";

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
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (status.status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>{status.error}</p>
      </div>
    );
  } else {
    return (
      <Box display="flex" justifyContent="space-around">
        <Grid
          container
          spacing={2}
          justifyContent="space-around"
          maxWidth={1400}
        >
          <Grid item xs={12} md={6}>
            <Transcript
              words={status.words}
              onTimestampClick={(start, end) => console.log({ start, end })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Chapters
              chapters={status.chapters}
              onTimestampClick={(start, end) => {
                console.log({ start, end });
              }}
            />

            {status.auto_highlights_result.status === "success" ? (
              <Keywords
                keywords={status.auto_highlights_result.results}
                onKeywordClick={(index) => console.log(index)}
              />
            ) : (
              <p>No keywords detected</p>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default Result;
