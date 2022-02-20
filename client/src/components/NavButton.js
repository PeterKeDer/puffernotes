import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUpload } from "../helpers/endpoints";

const NavButton = (props) => {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const canUpload = !uploading;
  
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
    <Button 
      variant="contained" 
      component="label" 
      color={props.buttonColor} 
      disabled={!canUpload}
      onClick={handleUpload}>
        Upload File
        <UploadIcon></UploadIcon>
        <input 
          type="file" 
          accept=".mp3, audio/mpeg3" 
          onChange={(e) => setFile(e.target.files[0])} 
          hidden/>
    </Button>
  );
}

export default NavButton;