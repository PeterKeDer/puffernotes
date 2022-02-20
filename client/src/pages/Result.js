import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <ResultComponent status={status} />
    );
  }
};

export default Result;
