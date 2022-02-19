import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Upload = () => {
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      <input>Upload File Here</input>
    </Box>
  );
}

export default Upload;