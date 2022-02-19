import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUpload } from "../helpers/endpoints";

const Upload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const canUpload = !uploading && file !== null;

  const handleUpload = async () => {
    if (!canUpload) return;

    try {
      setUploading(true);
      const response = await postUpload(file);
      console.log(response);

      // Redirect to result page
      navigate(`/result/${response.id}`);
    } catch (e) {
      console.log(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Test Upload</h1>
      <input
        type="file"
        accept=".mp3, audio/mpeg3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        disabled={!canUpload}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;