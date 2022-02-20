import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UploadBox = () => {
  return (
    <Box component="span" sx={{ 
      p: 2, 
      border: '8px dashed #38369A' 
      }}
    >
      <Button variant="disabled" component="label">
        Upload File
        <input type="file" hidden></input>
      </Button>
    </Box>
  );
}

export default UploadBox;