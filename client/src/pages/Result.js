import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStatus } from "../helpers/endpoints";

import Chapters from "../components/Chapters";
import Keywords from "../components/Keywords";

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
      <div>
        <h1>Result</h1>
        <Chapters
          chapters={status.chapters}
          onClickTimestamp={(start, end) => {
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
      </div>
    );
  }
};

export default Result;
