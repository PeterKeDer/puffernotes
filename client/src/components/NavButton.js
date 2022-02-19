import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

const NavButton = (props) => {
  return (
    <Button variant="contained" color={props.buttonColor}>
        Upload File
        
    </Button>
  );
}

export default NavButton;