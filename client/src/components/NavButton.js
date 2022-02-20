import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postUpload } from "../helpers/endpoints";

const NavButton = (props) => {

  const inputFile = useRef(null);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const canUpload = !uploading;
  
  const uploadButtonClicked = () => {
    if (!canUpload) return;
    // inputFile.current.click();
  };

  const handleFile = async (file) => {
    console.log(file);
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
  }

  return (
    <Button 
      variant="contained" 
      component="label" 
      color={props.buttonColor} 
      disabled={!canUpload}
      onClick={uploadButtonClicked}>
        Upload File
        <UploadIcon></UploadIcon>
        <input 
          type="file" 
          accept=".mp3, audio/mpeg3" 
          onChange={(e) => handleFile(e.target.files[0])} 
          ref={inputFile}
          style={{display: 'none'}}/>
    </Button>
  );
}

export default NavButton;